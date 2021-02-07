import { Image, Row, Spacer, Text } from '@geist-ui/react'
import styled from 'styled-components'
import config from '../config'

const StyledText = styled(Text)`
  margin: 0;
`

export default function Header() {
  return (
    <header>
      <Spacer y={4} />
      {config?.page?.header?.logo?.show && (
        <>
          <Row justify="center">
            <Image
              width={120}
              height={120}
              src={config?.page?.header?.logo?.url || '/logo.svg'}
              disableSkeleton={true}
              alt="Page Logo"
            />
          </Row>
          <Spacer y={1.5} />
        </>
      )}
      <Row justify="center">
        <StyledText h1 size="2rem">
          {config?.page?.header?.text}
        </StyledText>
      </Row>
      <Spacer y={3.5} />
    </header>
  )
}
