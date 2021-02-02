import { Row, Col, Grid, Spacer, Card, Divider } from '@geist-ui/react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Monitor from '../components/Monitor'
import Status from '../components/Status'
import { useEffect, useState } from 'react'
import config from '../config'

import { GetServerSideProps } from 'next'

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
            <Card>
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
            </Card>
          </Col>
        </Row>
      </Grid>
      <Grid xs={24}>
        <Footer />
      </Grid>
    </Grid.Container>
  )
}
