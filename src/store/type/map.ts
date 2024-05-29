import { defineStore } from 'pinia'
import type { Feature, Features } from '@/interfaces/map/features'
const useMapStore = defineStore('Map', {
  state: () => ({
    features: [] as Features,
  }),
  getters: {},
  actions: {
    setFeature(geometry: Feature['geometry']) {
      if (geometry) {
        this.features.push({ type: 'Feature', geometry })
      } else {
        return
      }
    },
    getFeature() {
      return this.features
    },
  },
  persist: {
    key: 'map',
    storage: localStorage,
  },
})
export default useMapStore
