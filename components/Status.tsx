import { Card, Row, Spacer, Text } from '@geist-ui/react'
import { Check, X } from '@geist-ui/react-icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface StatusProps {
  status: string
}

const StyledCard = styled(Card)<StatusProps>`
  overflow: hidden;

  svg {
    color: #ffffff;
  }

  .content {
    color: #ffffff;
    background-color: ${props =>
      props.status === 'ok' ? '#37d07b' : '#FF9800'};
  }

  @media (max-width: 425px) {
    .content {
      padding: 8pt;
    }
  }
`

const StyledRow = styled(Row)`
  h3 {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  svg {
    stroke-width: 2.5;
  }

  @media (max-width: 425px) {
    h3 {
      font-size: 1.25rem;
    }

    svg {
      width: 28px;
    }
  }
`

const Status = (props: { status: string }) => {
  const { status } = props
  const { t } = useTranslation()

  return (
    <StyledCard status={status}>
      <Row>
        <Spacer y={0.25} />
      </Row>
      <StyledRow align="middle">
        <Spacer x={1} />
        {status === 'ok' ? (
          <>
            <Check size={36} />
            <Spacer x={0.75} />
            <Text h3>{t('global-status-ok')}</Text>
          </>
        ) : (
          <>
            <X size={36} />
            <Spacer x={0.75} />
            <Text h3>{t('global-status-error')}</Text>
          </>
        )}
        <Spacer x={1} />
      </StyledRow>
      <Row>
        <Spacer y={0.25} />
      </Row>
    </StyledCard>
  )
}

export default Status
