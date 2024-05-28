<template>
  <div id="olMap" ref="olMap" style="width: 100%; height: 100%">
    <el-select
      class="mapSelect"
      v-model="mapName"
      placeholder="切换地图底图"
      @change="changeBaseMap(mapName)"
    >
      <el-option-group
        v-for="group in mapLabels"
        :key="group.label"
        :label="group.label"
      >
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-option-group>
    </el-select>
  </div>
</template>
<!--ref命名冲突，map-->
<script setup lang="ts">
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { onMounted, ref } from 'vue'
import { transform } from 'ol/proj'
import { defaults as defaultControls } from 'ol/control'

import { mapList, mapLabels } from '@/views/map/mapList'
//target、layers、view=>map
//创建n种layer，根据下拉框选择切换layer
// 初始化layers,初始化map对象
//更换地图，移除layers,添加layers，视图更新
const projection = 'EPSG:4326' //定义wgs84地图坐标系
const projection_m = 'EPSG:3857' //定义墨卡托地图坐标系

let mapName = ref('amapSat')
let sources = mapList.amapSat // new XYZ({})
let layers = []
for (let value of sources) {
  layers.push(
    new TileLayer({
      source: value,
      projection,
    }),
  )
}
let map
onMounted(() => {
  //切换地图时更改对应Layer的source
  map = new Map({
    target: 'olMap',
    projection,
    layers,
    view: new View({
      center: transform([101.46912, 36.24274], projection, projection_m),
      zoom: 5,
    }),
    controls: defaultControls({
      zoom: false,
      rotate: false,
      attribution: false,
    }),
  })
})
// 操作图层来驱动视图的更新
const changeBaseMap = function (mapName) {
  for (let i = 0; i < layers.length - 1; i++) {
    map.removeLayer(layers[i])
  }
  console.log(mapName)
  // 将每个图层从地图中移除
  for (let key in mapList) {
    if (key === mapName) {
      sources = mapList[key]
    }
  }
  //清空layers数组
  layers.length = 0
  //更新layers
  for (let value of sources) {
    layers.push(
      new TileLayer({
        source: value,
      }),
    )
  }
  //添加layers
  for (let i = 0; i < layers.length; i++) {
    map.addLayer(layers[i])
  }
}
</script>

<style scoped>
#olMap {
  position: relative;
  z-index: 1;
}
.mapSelect {
  position: absolute;
  width: 140px;
  top: 3%;
  right: 2%;
  z-index: 2;
}
</style>
