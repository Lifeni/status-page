import { Button, Link, Row, Spacer, ButtonGroup } from '@geist-ui/react'
import { BarChart2, Github, Link as LinkIcon } from '@geist-ui/react-icons'
import config from '../config'

export default function Footer() {
  return (
    <footer>
      <Spacer y={1} />
      <Row justify="center">
        <Spacer x={0.5} />
        <ButtonGroup>
          {config?.page?.footer?.map(link => (
            <>
              <Button
                icon={
                  link.name === 'GitHub' ? (
                    <Github />
                  ) : link.name === 'UptimeRobot' ? (
                    <BarChart2 />
                  ) : (
                    <LinkIcon />
                  )
                }
                auto
              >
                <Link href={link.url}>{link.name}</Link>
              </Button>
              <Spacer x={0.5} />
            </>
          ))}
        </ButtonGroup>
      </Row>
      <Spacer y={1} />
    </footer>
  )
}
