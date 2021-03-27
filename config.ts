export default {
  key: {
    uptimerobot: 'ur1047124-c17f135f8eab023bb4b6987b',
  },
  page: {
    favicon: '/favicon.ico',
    title: 'Status Page',
    description: 'A status page based on UptimeRobot API.',
    theme: 'light', // light or dark
    header: {
      enabled: true,
      title: {
        show: true,
        content: 'Status Page',
      },
      description: {
        show: true,
        content: 'This is a demo site, and here is the description',
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
