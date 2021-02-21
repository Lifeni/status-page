import { Description, Tooltip, useTheme } from '@geist-ui/react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'
import styled from 'styled-components'

dayjs.extend(duration)
dayjs.extend(isSameOrBefore)
dayjs.extend(relativeTime)

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

export default function Logs(props: {
  timeline: Array<Array<string | IMonitorBlock>>
}) {
  const { timeline } = props
  const { palette } = useTheme()

  const monitorColor = {
    down: palette.error,
    up: palette.success,
    paused: palette.warning,
    started: palette.foreground,
  }

  return (
    <Container>
      {timeline.map(([day, data]) => (
        <StatusBlockWrapper key={day as string}>
          {data === 'No Data' ? (
            <Tooltip text="No Data">
              <StatusBlock color={palette.accents_1} />
            </Tooltip>
          ) : (
            <Tooltip
              text={
                <Description
                  title={<p>{day as string}</p>}
                  content={
                    <>
                      <p>
                        <strong>{(data as IMonitorBlock).detail}</strong>
                      </p>
                      {(data as IMonitorBlock).type !== 2 && (
                        <p style={{ textTransform: 'capitalize' }}>
                          ⏱{' '}
                          {dayjs
                            .duration((data as IMonitorBlock).duration, 's')
                            .humanize()}
                          <small style={{ textTransform: 'none' }}>
                            &nbsp;({(data as IMonitorBlock).duration} s)
                          </small>
                        </p>
                      )}
                    </>
                  }
                />
              }
            >
              <StatusBlock
                color={
                  monitorColor[monitorStatus[(data as IMonitorBlock).type]]
                }
              />
            </Tooltip>
          )}
        </StatusBlockWrapper>
      ))}
    </Container>
  )
}
