import { Image, Row, Spacer, Text } from '@geist-ui/react'
import config from '../config'
import styled from 'styled-components'

const StyledText = styled(Text)`
  margin: 0;
`

export default function Header() {
  return (
    <header>
      <Spacer y={4} />
      {config?.page?.header?.logo ? (
        <>
          <Row justify="center">
            <Image width={96} height={96} src={config?.page?.header?.logo} />
          </Row>
          <Spacer y={1} />
        </>
      ) : null}
      <Row justify="center">
        <StyledText h1 size="2rem">
          {config?.page?.header?.text}
        </StyledText>
      </Row>
      <Spacer y={3.5} />
    </header>
  )
}
