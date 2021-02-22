import { Card, Grid, Spacer } from '@geist-ui/react'
import dayjs from 'dayjs'
import i18n from 'i18next'
import { GetServerSideProps } from 'next'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Monitor from '../components/Monitor'
import Status from '../components/Status'
import config from '../config'
import '../i18n/config'

const blockSize = 36

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
      monitors = data.monitors
        .sort((a: { friendly_name: number }, b: { friendly_name: number }) => {
          return a.friendly_name - b.friendly_name
        })
        .map((monitor: IData) => {
          let upTime = 0
          let totalTime = 0
          monitor.logs.forEach((log: IMonitorLog) => {
            if (log.type === 2) {
              upTime += log.duration
            }

            if (log.type === 1 || log.type === 2) {
              totalTime += log.duration
            }
          })

          let timeline = new Map()
          monitor.logs
            .sort((a: IMonitorLog, b: IMonitorLog) => {
              return a.datetime - b.datetime
            })
            .map((log: IMonitorLog) => {
              const start = dayjs.unix(log.datetime)
              const end = dayjs.unix(log.datetime + log.duration)
              const startDay = start.format('YYYY-MM-DD')

              if (timeline.get(startDay)?.type !== 1) {
                timeline.set(startDay, {
                  type: log.type,
                  detail: log.reason.detail,
                  startTime: log.datetime,
                  duration: log.duration,
                })
              }

              let current = start
              let currentDay = startDay

              while (
                current.add(dayjs.duration(1, 'days')).isSameOrBefore(end)
              ) {
                current = current.add(dayjs.duration(1, 'days'))
                currentDay = current.format('YYYY-MM-DD')
                if (timeline.get(currentDay)?.type !== 1) {
                  timeline.set(currentDay, {
                    type: log.type,
                    detail: log.reason.detail,
                    startTime: log.datetime,
                    duration: log.duration,
                  })
                }
              }
            })

          const array = Array.from(timeline).slice(-blockSize).reverse()

          if (timeline.size < blockSize) {
            const total = blockSize - timeline.size
            for (let i = 0; i < total; i++) {
              array.push([i.toString(), 'No Data'])
            }
          }

          return {
            id: monitor.id,
            url: monitor.url,
            friendly_name: monitor.friendly_name,
            type: monitor.type,
            status: monitor.status,
            up_rate: upTime / totalTime,
            timeline: array,
          }
        })
    })

  return { props: { status, monitors } }
}

export default function Home(props: { status: boolean; monitors: any }) {
  const { status, monitors } = props

  return (
    <>
      <Grid.Container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: 'calc(100vh - 48px)' }}
      >
        {config?.page?.header?.enabled ? (
          <Grid xs={24}>
            <Header />
          </Grid>
        ) : (
          <Spacer y={3} />
        )}

        {config?.page?.global_status?.enabled ? (
          <>
            <Grid
              xs={24}
              sm={24}
              md={20}
              lg={14}
              xl={12}
              style={{ width: '100%', maxWidth: '900px' }}
            >
              <Status status={status ? 'true' : 'false'} />
            </Grid>

            <Spacer y={1} />
          </>
        ) : (
          <Spacer y={1} />
        )}

        <Grid
          xs={24}
          sm={24}
          md={20}
          lg={14}
          xl={12}
          style={{ width: '100%', maxWidth: '900px', overflow: 'hidden' }}
        >
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

        {config?.page?.footer?.enabled ? (
          <Grid xs={24}>
            <Footer />
          </Grid>
        ) : (
          <Spacer y={3} />
        )}
      </Grid.Container>
    </>
  )
}
