import { Card, Col, Divider, Grid, Row, Spacer } from '@geist-ui/react'
import { GetServerSideProps } from 'next'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Monitor from '../components/Monitor'
import Status from '../components/Status'
import config from '../config'

export const getServerSideProps: GetServerSideProps = async () => {
  let status = 'unknown'
  let monitors = null
  await fetch('https://api.uptimerobot.com/v2/getMonitors', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: `api_key=${
      process.env.NEXT_PUBLIC_KEY || config.key.uptimerobot
    }&format=json&logs=1`,
  })
    .then(res => res.json())
    .then(data => {
      status = data.stat
      monitors = data.monitors.sort(
        (a: { friendly_name: number }, b: { friendly_name: number }) => {
          return a.friendly_name - b.friendly_name
        }
      )
    })

  return { props: { status, monitors } }
}

const StyledCard = styled(Card)`
  @media (max-width: 425px) {
    .content {
      padding: 8pt;
    }
  }
`

export default function Home(props: { status: any; monitors: any }) {
  const { status, monitors } = props

  return (
    <Grid.Container justify="center">
      <Grid xs={24}>
        <Header />
      </Grid>
      <Grid xs={24} sm={22} md={20} lg={14} xl={12}>
        <Row>
          <Spacer x={1} />
          <Col span={24}>
            <Status status={status} />
          </Col>
          <Spacer x={1} />
        </Row>
        <Spacer y={1} />

        <Row>
          <Spacer x={1} />
          <Col span={24}>
            <StyledCard>
              {monitors.length === 0
                ? 'Loading ...'
                : monitors.map((monitor: Monitor, index: number) => (
                    <div key={monitor.id}>
                      <Card.Content>
                        <Monitor data={monitor} />
                      </Card.Content>
                      {index !== monitors.length - 1 ? <Divider y={1} /> : null}
                    </div>
                  ))}
            </StyledCard>
          </Col>
          <Spacer x={1} />
        </Row>
      </Grid>
      <Grid xs={24}>
        <Footer />
      </Grid>
    </Grid.Container>
  )
}
