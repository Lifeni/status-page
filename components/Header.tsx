import { Image, Row, Spacer, Text } from '@geist-ui/react'
import styled from 'styled-components'

const Title = styled(Text)`
  margin: 1.5rem 0 0 0;
  text-align: center;
`

const Description = styled(Text)`
  padding: 0 1rem;
  font-size: 1.25rem;
  text-align: center;
`

const Logo = styled(Image)`
  width: auto;
  max-height: ${props => props.height}px;
`

export default function Header(props: { loadedConfig: ILoadedConfig }) {
  const { loadedConfig } = props

  return (
    <header>
      <Spacer y={4} />

      {loadedConfig.showHeaderTitle ||
      loadedConfig.showHeaderDescription ? null : (
        <Spacer y={2} />
      )}

      {loadedConfig.showHeaderLogo && (
        <Row justify="center">
          <Logo
            height={
              loadedConfig.showHeaderTitle || loadedConfig.showHeaderDescription
                ? 135
                : 150
            }
            src={loadedConfig.headerLogo || '/logo.svg'}
            disableSkeleton={true}
            alt="Page Logo"
          />
        </Row>
      )}

      {loadedConfig.showHeaderLogo &&
        loadedConfig.showHeaderTitle &&
        loadedConfig.showHeaderDescription && <Spacer y={0.5} />}

      {loadedConfig.showHeaderTitle ? (
        <Row justify="center">
          <Title h1 size="2rem">
            {loadedConfig.headerTitle}
          </Title>
        </Row>
      ) : null}

      {loadedConfig.showHeaderDescription ? (
        <Row justify="center">
          <Description p>{loadedConfig.headerDescription}</Description>
        </Row>
      ) : null}

      {loadedConfig.showHeaderTitle ||
      loadedConfig.showHeaderDescription ? null : (
        <Spacer y={2} />
      )}

      <Spacer y={4} />
    </header>
  )
}
