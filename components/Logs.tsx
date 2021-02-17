import { Description, Tooltip, useTheme } from '@geist-ui/react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'

dayjs.extend(duration)
dayjs.extend(isSameOrBefore)

interface StatusProps {
  color: string
}

const StatusBlock = styled.div<StatusProps>`
  width: 100%;
  height: 36px;
  background-color: ${props => props.color};
`

const StatusBlockWrapper = styled.div`
  position: relative;
  width: auto;
  height: 36px;
  margin: 0 2px;
  flex-grow: 1;
  border-radius: 2px;
  overflow: hidden;

  .tooltip {
    width: 100%;
  }
`

const Container = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`

const monitorStatus = {
  0: 'null',
  1: 'down',
  2: 'up',
  99: 'paused',
  98: 'started',
}

export default function Logs(props: { logs: Array<IMonitorLog> }) {
  const { logs } = props
  const [timeline, setTimeline] = useState<Map<string, IMonitorBlock>>(
    new Map()
  )
  const [timeblock, setTimeblock] = useState<Array<ReactElement>>([])
  const [loading, setLoading] = useState(true)

  const { palette } = useTheme()

  const monitorColor = {
    down: palette.error,
    up: palette.success,
    paused: palette.warning,
    started: palette.foreground,
  }

  const blockSize = 36
  const placeholder = []
  for (let i = 0; i < blockSize; i++) {
    placeholder.push(
      <StatusBlockWrapper key={i}>
        <Tooltip text="No Data">
          <StatusBlock color={palette.foreground} />
        </Tooltip>
      </StatusBlockWrapper>
    )
  }

  useEffect(() => {
    logs
      .sort((a: IMonitorLog, b: IMonitorLog) => {
        return a.datetime - b.datetime
      })
      .map((log: IMonitorLog) => {
        const start = dayjs.unix(log.datetime)
        const end = dayjs.unix(log.datetime + log.duration)
        const startDay = start.format('YYYY-MM-DD')

        if (timeline.get(startDay)?.type !== 1) {
          setTimeline(
            timeline.set(startDay, {
              type: log.type,
              detail: log.reason.detail,
              startTime: log.datetime,
              duration: log.duration,
            })
          )
        }

        let current = start
        let currentDay = startDay

        while (current.add(dayjs.duration(1, 'days')).isSameOrBefore(end)) {
          current = current.add(dayjs.duration(1, 'days'))
          currentDay = current.format('YYYY-MM-DD')
          if (timeline.get(currentDay)?.type !== 1) {
            setTimeline(
              timeline.set(currentDay, {
                type: log.type,
                detail: log.reason.detail,
                startTime: log.datetime,
                duration: log.duration,
              })
            )
          }
        }
      })

    setLoading(false)
    const array = Array.from(timeline)
      .slice(-blockSize)
      .reverse()
      .map(([day, data]) => (
        <StatusBlockWrapper key={day}>
          <Tooltip text={<Description title={day} content={data.detail} />}>
            <StatusBlock color={monitorColor[monitorStatus[data.type]]} />
          </Tooltip>
        </StatusBlockWrapper>
      ))

    if (timeline.size < blockSize) {
      const total = blockSize - timeline.size
      for (let i = 0; i < total; i++) {
        array.push(
          <StatusBlockWrapper key={i}>
            <Tooltip text="No Data">
              <StatusBlock color={palette.foreground} />
            </Tooltip>
          </StatusBlockWrapper>
        )
      }
    }

    setTimeblock(array)
  }, [])

  return <Container>{loading ? placeholder : timeblock}</Container>
}
