import { Feature } from '@/interfaces/map/features'
import { Response } from '@/interfaces/map/response'

export interface GeoJson {
  name: string
  degree: string
  region: string
  criteria: string
  feature: Feature
}
export type PostFeatures = (geoJson: GeoJson) => Response
export type GetFeatures = () => Response
