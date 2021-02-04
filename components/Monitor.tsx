import { Col, Link, Row, Spacer, Text, Tooltip } from '@geist-ui/react'
import {
  CheckInCircleFill,
  ExternalLink,
  XCircleFill,
} from '@geist-ui/react-icons'
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

export default function Monitor(props: { data: Monitor }) {
  const { data } = props

  return (
    <>
      <Row>
        <Col span={16}>
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
        <Col span={8}>
          <Row align="middle" justify="end">
            {data.status === 2 ? (
              <CheckInCircleFill
                color={monitorColor[data.status] || '#000000'}
              />
            ) : (
              <XCircleFill color={monitorColor[data.status] || '#000000'} />
            )}
            <Spacer x={0.5} />
            <Text
              h4
              style={{
                margin: 0,
                whiteSpace: 'nowrap',
                color: monitorColor[data.status] || '#000000',
              }}
            >
              {monitorStatus[data.status]}
            </Text>
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
