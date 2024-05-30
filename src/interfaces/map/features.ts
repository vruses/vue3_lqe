export type Features = Feature[]
//几何类型
export interface Feature {
  type: string
  geometry: {
    gid: string
    type: string
    coordinates: Coordinate[][]
  }
}
//坐标系
type Coordinate = [number, number]
