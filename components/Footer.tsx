import { Row, Spacer, Button, Link } from '@geist-ui/react'
import { Github, Activity } from '@geist-ui/react-icons'
import config from '../config'

export default function Footer() {
  return (
    <footer>
      <Spacer y={2} />
      <Row justify="center">
        <Spacer x={0.5} />
        {config?.page?.footer?.github ? (
          <>
            <Button icon={<Github />} auto>
              <Link href={config?.page?.footer?.github}>GitHub</Link>
            </Button>
            <Spacer x={0.5} />
          </>
        ) : null}

        {config?.page?.footer?.uptimerobot ? (
          <>
            <Button icon={<Activity />} auto>
              <Link href={config?.page?.footer?.uptimerobot}>UptimeRobot</Link>
            </Button>
            <Spacer x={0.5} />
          </>
        ) : null}
      </Row>
      <Spacer y={2} />
    </footer>
  )
}
