import { Col, Row, Tooltip, Description } from '@geist-ui/react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { ReactElement, useEffect, useState } from 'react'

dayjs.extend(duration)
dayjs.extend(isSameOrBefore)

interface StatusProps {
  status: string
}

const StatusBlock = styled.div<StatusProps>`
  width: 100%;
  height: 36px;
  background-color: ${props => monitorColor[props.status] || '#EEEEEE'};
`

const StatusBlockWrapper = styled.div`
  position: relative;
  width: auto;
  height: 36px;
  margin: 0 2px;
  flex-grow: 1;
  border-radius: 2px;
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

const monitorColor = {
  down: '#f44336',
  up: '#3bd671',
  paused: '#FFC107',
  started: '#EEEEEE',
}

export default function Logs(props: { logs: Array<MonitorLog> }) {
  const { logs } = props
  const blockSize = 50
  const [timeline, setTimeline] = useState<Map<string, MonitorBlock>>(new Map())
  const [timeblock, setTimeblock] = useState<Array<ReactElement>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    logs
      .sort((a: MonitorLog, b: MonitorLog) => {
        return a.datetime - b.datetime
      })
      .map((log: MonitorLog) => {
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
          <Tooltip
            text={<Description title={day} content={data.detail} />}
            style={{ width: '100%' }}
          >
            <StatusBlock status={monitorStatus[data.type]} />
          </Tooltip>
        </StatusBlockWrapper>
      ))
    if (timeline.size < blockSize) {
      const total = blockSize - timeline.size
      for (let i = 0; i < total; i++) {
        array.push(
          <StatusBlockWrapper key={i}>
            <Tooltip text="No Data" style={{ width: '100%' }}>
              <StatusBlock status={'null'} />
            </Tooltip>
          </StatusBlockWrapper>
        )
      }
    }

    setTimeblock(array)
  }, [])

  return <Container>{loading ? 'Loading' : timeblock}</Container>
}
