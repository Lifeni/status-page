/// <reference types="next" />
/// <reference types="next/types/global" />

interface IMonitor {
  id: number
  url: string
  friendly_name: string
  type: number
  status: number
  up_rate: number
  timeline: Array<Array<string | IMonitorBlock>>
}

interface IData {
  id: number
  friendly_name: string
  url: string
  type: number
  sub_type: string
  keyword_type: null | number
  keyword_value: string
  http_username: string
  http_password: string
  port: string
  interval: number
  status: number
  create_datetime: number
  logs: Array<IMonitorLog>
  lastLogTypeBeforeStartDate: {}
}

interface IMonitorLog {
  datetime: number
  duration: number
  id: number
  reason: {
    code: string
    detail: string
  }
  type: number
}

interface IMonitorBlock {
  type: number
  detail: string
  startTime: number
  duration: number
}

interface ILoadedConfig {
  key: string
  theme: string
  title: string
  description: string
  favicon: string
  showHeaderTitle: boolean
  showHeaderDescription: boolean
  showHeaderLogo: boolean
  headerTitle: string
  headerDescription: string
  headerLogo: string
  showHeader: boolean
  showGlobalStatus: boolean
  showFooter: boolean
  footerLinks: Array<IFooterLink>
}

interface IFooterLink {
  name: string
  url: string
}
