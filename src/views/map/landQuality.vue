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
      id="ol-map"
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 100%"
    >
      <ol-view ref="view" :center="transformCenter" :zoom="zoom" />
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
import { transform } from 'ol/proj'

const zoom = ref(4)
const center = ref([116, 39])
const projection_m = ref('EPSG:3857')
const projection = ref('EPSG:4326')
//将经纬度转为投影坐标
const transformCenter = transform(
  center.value,
  projection.value,
  projection_m.value,
)
const layerOpacity = ref(0.4)
const layerVisible = ref(true)
</script>

<style lang="scss" scoped>
#ol-map {
  box-shadow: 1px 1px 12px 0 #7eaaa5;
}
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
