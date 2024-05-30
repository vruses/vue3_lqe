import { Feature } from '@/interfaces/map/features'

export interface GeoJson {
  name: string
  degree: string
  region: string
  criteria: string
  feature: Feature
}
