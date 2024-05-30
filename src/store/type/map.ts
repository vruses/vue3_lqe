import { defineStore } from 'pinia'
import type { Feature, Features } from '@/interfaces/map/features'
import { GeoJson } from '@/interfaces/map/geoJson'

const useMapStore = defineStore('Map', {
  state: () => ({
    geoJsons: [] as GeoJson[],
  }),
  getters: {},
  actions: {
    setGeoJsons(geoJsons: GeoJson[]) {
      this.geoJsons = geoJsons
    },
    toGeoJson(geoJsonsLike: Omit<GeoJson, 'feature'> & { features: Features }) {
      // {name,degree,region,criteria,[{type,{gid,type,coords}},]}
      // =>{name,degree,region,criteria,{type,{gid,type,coords}}}
      const geoJsons: GeoJson[] = []
      console.log(geoJsonsLike)
      const { name, degree, region, criteria } = geoJsonsLike
      //存入geoJson
      for (let feature of geoJsonsLike.features) {
        console.log('setFeature')
        // this.setFeature(feature)
        geoJsons.push({ name, degree, region, criteria, feature })
      }
      this.setGeoJsons(geoJsons)
    },
    getFeature() {
      let features: Features = []
      for (let g of this.geoJsons) {
        features.push(g.feature)
      }
      return features
    },
  },
  persist: {
    key: 'map',
    storage: localStorage,
  },
})
export default useMapStore
