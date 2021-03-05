import { Button, Link, Row, Spacer } from '@geist-ui/react'
import { BarChart2, Github, Link as LinkIcon } from '@geist-ui/react-icons'
import config from '../config'

export default function Footer() {
  return (
    <footer>
      <Spacer y={2} />
      <Row justify="center">
        <Spacer x={1} />
        {config?.page?.footer?.links?.map(link => (
          <Row key={link.name}>
            <Spacer x={0.5} />
            <Link href={link.url} target="_blank" rel="noopener noreferrer">
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
                {link.name}
              </Button>
            </Link>
            <Spacer x={0.5} />
          </Row>
        ))}
        <Spacer x={1} />
      </Row>
      <Spacer y={1} />
    </footer>
  )
}
