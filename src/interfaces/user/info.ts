import type { Response } from '@/interfaces/user/response'

export interface Info extends Response {
  data: {
    name: string
    avatar: string
    roles: [string]
    buttons: [string]
    routes: [string]
  }
}
export type UserInfo = () => Info
