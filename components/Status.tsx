import { Card, Row, Spacer, Text } from '@geist-ui/react'
import { Check, X } from '@geist-ui/react-icons'
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
      props.status === 'ok' ? '#28a745' : '#FF9800'};
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

export default function Status(props: { status: string }) {
  const { status } = props
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
            <Text h3>All Systems Operational</Text>
          </>
        ) : (
          <>
            <X size={36} />
            <Spacer x={0.75} />
            <Text h3>Something is Wrong</Text>
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
