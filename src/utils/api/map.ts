import http from '../http'
import { GetFeatures, PostFeatures } from '@/interfaces/map/geoJson'
import { Response } from '@/interfaces/map/response'

export const postFeatures: PostFeatures = function (geoJson) {
  return http.post('', geoJson) as Response
}
export const getFeatures: GetFeatures = function () {
  return http.get('') as Response
}
