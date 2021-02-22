import { Image, Row, Spacer, Text } from '@geist-ui/react'
import styled from 'styled-components'

const StyledText = styled(Text)`
  margin: 0;
`

export default function Header(props: { loadedConfig: any }) {
  const { loadedConfig } = props

  return (
    <header>
      <Spacer y={5} />

      {loadedConfig.showHeaderText ? null : <Spacer y={1} />}

      {loadedConfig.showHeaderLogo && (
        <Row justify="center">
          <Image
            width={loadedConfig.showHeaderText ? 120 : 150}
            height={loadedConfig.showHeaderText ? 120 : 150}
            src={loadedConfig.headerLogo || '/logo.svg'}
            disableSkeleton={true}
            alt="Page Logo"
          />
        </Row>
      )}

      {loadedConfig.showHeaderLogo && loadedConfig.showHeaderText && (
        <Spacer y={1.5} />
      )}

      {loadedConfig.showHeaderText ? (
        <Row justify="center">
          <StyledText h1 size="2rem">
            {loadedConfig.headerText}
          </StyledText>
        </Row>
      ) : (
        <Spacer y={1} />
      )}

      <Spacer y={5} />
    </header>
  )
}
