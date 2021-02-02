import { Image, Row, Spacer, Text } from '@geist-ui/react'
import config from '../config'

export default function Header() {
  return (
    <header>
      <Spacer y={3} />
      {config?.page?.header?.logo ? (
        <>
          <Row justify="center">
            <Image width={72} height={72} src={config?.page?.header?.logo} />
          </Row>
          <Spacer y={1} />
        </>
      ) : null}
      <Row justify="center">
        <Text h1 size="1.75rem">
          {config?.page?.header?.text}
        </Text>
      </Row>
      <Spacer y={3} />
    </header>
  )
}
