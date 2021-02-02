import { Card, Col, Divider, Grid, Row, Spacer } from '@geist-ui/react'
import { GetServerSideProps } from 'next'

import styled from 'styled-components'

import Footer from '../components/Footer'
import Header from '../components/Header'
import Monitor from '../components/Monitor'

import config from '../config'

export const getServerSideProps: GetServerSideProps = async context => {
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
      monitors = data.monitors
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
          <Spacer x={0.5} />
          <Col span={24}>
            <StyledCard>
              {monitors.length === 0
                ? 'Loading ...'
                : monitors.map((monitor, index) => (
                    <div key={monitor.id}>
                      <Card.Content>
                        <Monitor data={monitor} />
                      </Card.Content>
                      {index !== monitors.length - 1 ? <Divider y={1} /> : null}
                    </div>
                  ))}
            </StyledCard>
          </Col>
          <Spacer x={0.5} />
        </Row>
      </Grid>
      <Grid xs={24}>
        <Footer />
      </Grid>
    </Grid.Container>
  )
}
