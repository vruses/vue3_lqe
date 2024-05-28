<template>
  <div style="width: 100%; height: 100%">
    <form>
      <fieldset>
        <div>
          <label for="opacity-slider">图层可见度：</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            v-model.number="layerOpacity"
          />
          <span class="description">{{ layerOpacity }}</span>
        </div>
        <!--       <div>-->
        <!--         <el-checkbox v-model="layerVisible"  size="small" border/>-->
        <!--         <span> {{ layerVisible ? "显示" : "隐藏" }}</span>-->
        <!--       </div>-->
        <el-checkbox-button v-model="layerVisible">
          {{ layerVisible ? '显示' : '隐藏' }}
        </el-checkbox-button>
      </fieldset>
    </form>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 100%"
    >
      <ol-view ref="view" :center="center" :zoom="zoom" />
      <ol-zoom-control />

      <ol-tile-layer :zIndex="1000">
        <ol-source-osm />
      </ol-tile-layer>

      <ol-image-layer
        :zIndex="1001"
        :opacity="layerOpacity"
        :visible="layerVisible"
      >
        <ol-source-image-wms
          url="https://mrdata.usgs.gov/services/gscworld?SERVICE=WMS"
          :extent="[-13884991, 2870341, -7455066, 6338219]"
          layers="geology"
          serverType="geoserver"
        />
      </ol-image-layer>
    </ol-map>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const zoom = ref(4)
const center = ref([10000000, 5000000])
const layerOpacity = ref(0.4)
const layerVisible = ref(true)
</script>

<style lang="scss" scoped>
fieldset {
  width: 350px;
  display: flex;
  align-items: center;
  div:first-child {
    display: flex;
    align-items: center;
    flex-basis: 280px;
  }
}
</style>
