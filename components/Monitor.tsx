import { Badge, Col, Link, Row, Spacer, Text } from '@geist-ui/react'
import { CheckInCircleFill, XCircleFill } from '@geist-ui/react-icons'
import config from '../config'
import Logs from './Logs'

const monitorType = {
  1: 'HTTP(s)',
  2: 'Keyword',
  3: 'Ping',
  4: 'Port',
  5: 'Heartbeat',
}

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
  2: '#3bd671',
  8: '#FFC107',
  9: '#f44336',
}

export default function Monitor(props: { data: Monitor }) {
  const { data } = props

  return (
    <>
      <Row>
        <Col span={16}>
          <Row align="middle">
            <Text h4 style={{ margin: 0, whiteSpace: 'nowrap' }}>
              {data.friendly_name}
            </Text>
            {config?.style?.components?.monitor_type ? (
              <>
                <Spacer x={0.5} />
                <Badge size="mini">{monitorType[data.type]}</Badge>
              </>
            ) : null}
          </Row>
          {config?.style?.components?.monitor_link ? (
            <>
              <Spacer y={0.25} />
              <Link
                href={data.url}
                target="_blank"
                icon
                color
                style={{ fontSize: '14px' }}
              >
                {data.url}
              </Link>
            </>
          ) : null}
        </Col>
        <Col span={8}>
          <Row align="middle" justify="end">
            {data.status === 2 ? (
              <>
                <CheckInCircleFill
                  color={monitorColor[data.status] || '#000000'}
                />
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
              </>
            ) : (
              <>
                <XCircleFill color={monitorColor[data.status] || '#000000'} />
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
              </>
            )}
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
