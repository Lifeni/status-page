import { Card, Col, Grid, Row, Spacer } from '@geist-ui/react'
import i18n from 'i18next'
import { GetServerSideProps } from 'next'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Monitor from '../components/Monitor'
import Status from '../components/Status'
import config from '../config'
import '../i18n/config'

export const getServerSideProps: GetServerSideProps = async ctx => {
  i18n.changeLanguage(ctx.locale)

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
      status =
        data.stat === 'ok' &&
        data.monitors.every(
          (monitor: { status: number }) => monitor.status === 2
        )
      monitors = data.monitors.sort(
        (a: { friendly_name: number }, b: { friendly_name: number }) => {
          return a.friendly_name - b.friendly_name
        }
      )
    })

  return { props: { status, monitors } }
}

export default function Home(props: { status: boolean; monitors: any }) {
  const { status, monitors } = props

  return (
    <>
      <Grid.Container justify="center">
        <Grid xs={24}>
          <Header />
        </Grid>
        <Grid xs={24} sm={24} md={20} lg={16} xl={12}>
          <Status status={status ? 'true' : 'false'} />
        </Grid>
        <Grid xs={24} sm={24} md={20} lg={16} xl={12}>
          <Spacer y={1} />
          <Grid.Container gap={2} justify="flex-start">
            {monitors.length === 0
              ? 'Loading ...'
              : monitors.map((monitor: IMonitor) => (
                  <Grid xs={24} sm={12} key={monitor.id}>
                    <Card>
                      <Card.Content>
                        <Monitor data={monitor} />
                      </Card.Content>
                    </Card>
                  </Grid>
                ))}
          </Grid.Container>
        </Grid>
        <Grid xs={24}>
          <Footer />
        </Grid>
      </Grid.Container>
    </>
  )
}
