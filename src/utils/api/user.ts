import http from '../http'
import type { LoginRequest } from '@/interfaces/user/loginReq'
import type { UserInfo } from '@/interfaces/user/info'
import type { UserLogin } from '@/interfaces/user/loginReq'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}
export const login: UserLogin = function () {
  // return http.post(API.LOGIN_URL, req)
  return { code: 200, token: 'Admin token', msg: 'ok' }
}
export const getInfo: UserInfo = function () {
  // return http.get(API.USERINFO_URL)
  return {
    code: 0,
    data: {
      name: 'admin',
      avatar:
        'https://profile-avatar.csdnimg.cn/f7a1f7a6ee2447728165ead801f69525_qq_54530633.jpg',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
    },
    token: 'Admin Token',
    msg: 'ok',
  }
}
