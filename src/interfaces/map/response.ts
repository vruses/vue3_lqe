import { GeoJson } from '@/interfaces/map/geoJson'

export interface Response {
  code: number
  data: GeoJson
  msg: string
}
