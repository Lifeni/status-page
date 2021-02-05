import { Link, Row, Spacer, Text, Tooltip } from '@geist-ui/react'
import {
  CheckInCircleFill,
  ExternalLink,
  XCircleFill,
} from '@geist-ui/react-icons'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logs from './Logs'

import { useTranslation } from 'react-i18next'

const monitorColor = {
  0: '#FFC107',
  1: '#e0e0e0',
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

  @media (max-width: 425px) {
    font-size: 1.125rem;
  }

  @media (max-width: 380px) {
    &.small {
      display: none;
    }
  }
`

export default function Monitor(props: { data: Monitor }) {
  const { data } = props
  const [upRate, setUpRate] = useState(0)

  const { t } = useTranslation()

  useEffect(() => {
    let upTime = 0
    let totalTime = 0
    data.logs.forEach(log => {
      if (log.type === 2) {
        upTime += log.duration
      }

      if (log.type === 1 || log.type === 2) {
        totalTime += log.duration
      }
    })
    setUpRate(upTime / totalTime)
  }, [])

  return (
    <>
      <Row justify="space-between">
        <StyledRow align="middle">
          <Tooltip text={data.url}>
            <Link
              href={data.type === 3 ? `http://${data.url}` : data.url}
              target="_blank"
              block
              aria-label={data.url}
            >
              <ExternalLink size="18" />
            </Link>
          </Tooltip>
          <Spacer x={0.25} />
          <StyledText h4>{data.friendly_name}</StyledText>
        </StyledRow>

        <Row align="middle" justify="end">
          <StyledText h4 className="small" style={{ color: '#e0e0e0' }}>
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
            {t(`status-${data.status}`)}
          </StyledText>
        </Row>
      </Row>
      <Spacer y={0.75} />
      <Row justify="end">
        <Logs logs={data.logs} />
      </Row>
    </>
  )
}
