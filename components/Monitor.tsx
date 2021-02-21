import { Link, Row, Spacer, Text, Tooltip, useTheme } from '@geist-ui/react'
import {
  CheckInCircleFill,
  ExternalLink,
  XCircleFill,
} from '@geist-ui/react-icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Logs from './Logs'

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

export default function Monitor(props: { data: IMonitor }) {
  const { data } = props

  const { t } = useTranslation()
  const { palette } = useTheme()

  const monitorColor = {
    0: palette.warning,
    1: palette.foreground,
    2: palette.success,
    8: palette.warning,
    9: palette.error,
  }

  return (
    <>
      <Row justify="space-between">
        <StyledRow align="middle">
          <Tooltip text={data.url}>
            <Link
              href={data.type === 3 ? `http://${data.url}` : data.url}
              target="_blank"
              color
              aria-label={data.url}
              rel="noopener noreferrer"
            >
              <ExternalLink size="18" />
            </Link>
          </Tooltip>
          <Spacer x={0.5} />
          <StyledText h4 style={{ color: palette.foreground }}>
            {data.friendly_name}
          </StyledText>
        </StyledRow>

        <Row align="middle" justify="end">
          <StyledText
            h4
            className="small"
            style={{ color: palette.foreground }}
          >
            {Math.round(data.up_rate * 10000) / 100 + '%'}
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
        <Logs timeline={data.timeline} />
      </Row>
    </>
  )
}
