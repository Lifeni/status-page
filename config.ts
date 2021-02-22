export default {
  key: {
    uptimerobot: 'ur1047124-c17f135f8eab023bb4b6987b',
  },
  page: {
    title: 'Status Page',
    description: 'A status page based on the UptimeRobot API.',
    theme: 'dark', // light or dark
    header: {
      enabled: true,
      text: {
        show: true,
        content: 'Status Page',
      },
      logo: {
        show: true,
        url: '/logo.svg',
      },
    },
    global_status: {
      enabled: true,
    },
    footer: {
      enabled: true,
      links: [
        {
          name: 'GitHub',
          url: 'https://github.com/Lifeni/status-page',
        },
        {
          name: 'UptimeRobot',
          url: 'https://uptimerobot.com/',
        },
      ],
    },
  },
}
