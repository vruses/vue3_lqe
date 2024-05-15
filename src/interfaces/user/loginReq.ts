import { Response } from '@/interfaces/user/response'

export interface LoginRequest {
  username: string
  password: string
}
export type UserLogin = (req: LoginRequest) => Response
