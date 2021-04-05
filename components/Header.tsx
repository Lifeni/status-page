import { Image, Row, Spacer, Text } from '@geist-ui/react'
import styled from 'styled-components'
import { useMedia } from 'use-media'

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

export default function Header(props: { config: ILoadedConfig }) {
  const { config } = props
  const isMobile = useMedia({ maxWidth: '480px' })

  return (
    <header>
      {isMobile ? <Spacer y={2.5} /> : <Spacer y={4} />}

      {config.showHeaderTitle || config.showHeaderDescription ? null : (
        <Spacer y={2} />
      )}

      {config.showHeaderLogo && (
        <Row justify="center">
          <Logo
            height={
              config.showHeaderTitle || config.showHeaderDescription ? 135 : 150
            }
            src={config.headerLogo || '/logo.svg'}
            disableSkeleton={true}
            alt="Page Logo"
          />
        </Row>
      )}

      {config.showHeaderLogo &&
        config.showHeaderTitle &&
        config.showHeaderDescription && <Spacer y={0.5} />}

      {config.showHeaderTitle ? (
        <Row justify="center">
          <Title h1 size="2rem">
            {config.headerTitle}
          </Title>
        </Row>
      ) : null}

      {config.showHeaderDescription ? (
        <Row justify="center">
          <Description p>{config.headerDescription}</Description>
        </Row>
      ) : null}

      {config.showHeaderTitle || config.showHeaderDescription ? null : (
        <Spacer y={2} />
      )}

      {isMobile ? <Spacer y={2.5} /> : <Spacer y={4} />}
    </header>
  )
}
