import config from '../config'

const loadedConfig: ILoadedConfig = {
  // UptimeRobot API Key
  key: process.env.KEY || config?.key?.uptimerobot,

  // Website Settings
  title: process.env.PAGE_TITLE || config?.page?.title,
  description: process.env.PAGE_DESC || config?.page?.description,
  favicon: process.env.FAVICON || config?.page?.favicon,

  // Custom Settings
  theme: process.env.THEME
    ? process.env.THEME === 'dark'
      ? 'dark'
      : 'light'
    : config?.page?.theme === 'dark'
    ? 'dark'
    : 'light',

  //// Page Header
  showHeader: process.env.SHOW_HEADER
    ? process.env.SHOW_HEADER === 'true'
    : !!config?.page?.header?.enabled,

  showHeaderTitle: process.env.SHOW_HEADER_TITLE
    ? process.env.SHOW_HEADER_TITLE === 'true'
    : !!config?.page?.header?.title?.show,
  showHeaderDescription: process.env.SHOW_HEADER_DESC
    ? process.env.SHOW_HEADER_DESC === 'true'
    : !!config?.page?.header?.description?.show,
  showHeaderLogo: process.env.SHOW_HEADER_LOGO
    ? process.env.SHOW_HEADER_LOGO === 'true'
    : !!config?.page?.header?.logo?.show,

  headerTitle: process.env.HEADER_TITLE || config?.page?.header?.title.content,
  headerDescription:
    process.env.HEADER_DESC || config?.page?.header?.description.content,
  headerLogo: process.env.HEADER_LOGO || config?.page?.header?.logo.url,

  //// Page Status
  showGlobalStatus: process.env.SHOW_GLOBAL_STATUS
    ? process.env.SHOW_GLOBAL_STATUS === 'true'
    : !!config?.page?.global_status?.enabled,

  //// Page Footer
  showFooter: process.env.SHOW_FOOTER
    ? process.env.SHOW_FOOTER === 'true'
    : !!config?.page?.footer?.enabled,

  footerLinks: config?.page?.footer?.links || [],
}

export { loadedConfig as config }
