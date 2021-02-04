import { Col, Link, Row, Spacer, Text, Tooltip } from '@geist-ui/react'
import {
  CheckInCircleFill,
  ExternalLink,
  XCircleFill,
} from '@geist-ui/react-icons'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logs from './Logs'

const monitorStatus = {
  0: 'Paused',
  1: 'Not checked yet',
  2: 'Up',
  8: 'Seems down',
  9: 'Down',
}

const monitorColor = {
  0: '#FFC107',
  1: '#000000',
  2: '#28a745',
  8: '#FFC107',
  9: '#FF9800',
}

const StyledRow = styled(Row)`
  h4 {
    margin: 0;
    white-space: nowrap;
  }

  .tooltip {
    display: inline-flex;
    align-items: center;
  }
`

const StyledText = styled(Text)`
  margin: 0;
  white-space: nowrap;
`

export default function Monitor(props: { data: Monitor }) {
  const { data } = props
  const [upRate, setUpRate] = useState(0)

  useEffect(() => {
    let upTime = 0
    let totalTime = 0
    data.logs.forEach(log => {
      if (log.type === 2) {
        upTime += log.duration
      }
      totalTime += log.duration
    })
    setUpRate(upTime / totalTime)
  }, [])

  return (
    <>
      <Row>
        <Col>
          <StyledRow align="middle">
            <Text h4>{data.friendly_name}</Text>
            <Spacer x={0.25} />

            <Tooltip text={data.url}>
              <Link href={data.url} target="_blank" block aria-label={data.url}>
                <ExternalLink size="18" />
              </Link>
            </Tooltip>
          </StyledRow>
        </Col>
        <Col>
          <Row align="middle" justify="end">
            <StyledText h4 style={{ color: monitorColor[data.status] }}>
              {Math.round(upRate * 10000) / 100 + '%'}
            </StyledText>
            <Spacer x={0.5} />

            {data.status === 2 ? (
              <CheckInCircleFill color={monitorColor[data.status]} />
            ) : (
              <XCircleFill color={monitorColor[data.status]} />
            )}

            <Spacer x={0.5} />
            <StyledText h4 style={{ color: monitorColor[data.status] }}>
              {monitorStatus[data.status]}
            </StyledText>
          </Row>
        </Col>
      </Row>
      <Spacer y={0.75} />
      <Row justify="end">
        <Logs logs={data.logs} />
      </Row>
    </>
  )
}
