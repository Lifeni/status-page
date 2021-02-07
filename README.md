<p align="center">
  <img width="150px" alt="Logo" src="public/logo.svg" />
</p>

<h1 align="center">Status Page</h1>
<p align="center">A uptime status page based on the UptimeRobot API</p>
<p align="center">English | <a href="README.zh-CN.md">中文</a></p>

## Demo

See [https://status-page.dev.lifeni.life](https://status-page.dev.lifeni.life) .

## Deployment

### Vercel

Click the button below to deploy.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FLifeni%2Fstatus-page&env=NEXT_PUBLIC_KEY&envDescription=UptimeRobot%20API%20Key&envLink=https%3A%2F%2Fuptimerobot.com%2Fdashboard.php%23mySettings&demo-title=Status%20Page&demo-description=A%20demo%20site%20for%20Status%20Page.&demo-url=https%3A%2F%2Fstatus-page.dev.lifeni.life&demo-image=https%3A%2F%2Ffile.lifeni.life%2Fstatus%2Fexample.jpg)

You need to configure [the Key of UptimeRobot](https://uptimerobot.com/dashboard.php#mySettings) in environment variables.

### Manual Deployment

1. Fork this Repo
2. Modify the `config.ts` file in the project root directory, Don't forget to replace [the Key of UptimeRobot](https://uptimerobot.com/dashboard.php#mySettings)
3. Commit and push your changes
4. Deploy to Vercel or other platforms

## License

MIT License
