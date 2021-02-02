/// <reference types="next" />
/// <reference types="next/types/global" />

interface Monitor {
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
  logs: Array<MonitorLog>
  lastLogTypeBeforeStartDate: {}
}

interface MonitorLog {
  datetime: number
  duration: number
  id: number
  reason: {
    code: string
    detail: string
  }
  type: number
}

interface MonitorBlock {
  type: number
  detail: string
  startTime: number
  duration: number
}
