export default {
  key: {
    uptimerobot: 'ur1047124-c17f135f8eab023bb4b6987b',
  },
  page: {
    favicon: '/favicon.ico',
    title: 'Status Page | 记录干杯',
    description: '一个简单的服务监控页面，基于 UptimeRobot 的接口。',
    theme: 'light', // light or dark
    header: {
      enabled: true,
      text: {
        show: false,
        content: 'Status Page',
      },
      logo: {
        show: true,
        url: 'https://file.lifeni.life/status/site.svg',
      },
    },
    global_status: {
      enabled: false,
    },
    footer: {
      enabled: false,
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
