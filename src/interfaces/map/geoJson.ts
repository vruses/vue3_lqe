import { Features } from '@/interfaces/map/features'

export interface GeoJson {
  degree: string
  region: string
  criteria: string
  features: Features
}
