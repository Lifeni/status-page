import { Button, Link, Row, Spacer, ButtonGroup } from '@geist-ui/react'
import { BarChart2, Github, Link as LinkIcon } from '@geist-ui/react-icons'
import config from '../config'

export default function Footer() {
  return (
    <footer>
      <Spacer y={2} />
      <Row justify="center">
        <Spacer x={1} />
        <ButtonGroup size="medium">
          {config?.page?.footer?.map(link => (
            <Button
              key={link.name}
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
              <Link href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </Link>
            </Button>
          ))}
        </ButtonGroup>
        <Spacer x={1} />
      </Row>
      <Spacer y={2} />
    </footer>
  )
}
