<template>
  <div style="width: 100%; height: 100%">
    <form>
      <fieldset style="display: flex; align-items: center">
        <el-select
          v-model="drawType"
          placeholder="Select"
          size="default"
          style="width: 100px"
        >
          <el-option
            v-for="item in geometryType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!--       <label for="checkbox">绘画模式</label>-->
        <!--       <input type="checkbox" id="checkbox" v-model="drawEnable" />-->
        <el-checkbox-button v-model="drawEnabled">
          <span>绘画模式</span>
        </el-checkbox-button>
        <el-button type="primary" @click="saveGeometry">保存标记</el-button>
      </fieldset>
    </form>

    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 100%"
    >
      <ol-view
        ref="view"
        :center="center"
        :zoom="zoom"
        :projection="projection"
      />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>

      <ol-vector-layer>
        <ol-source-vector :features="zones">
          <ol-interaction-modify
            v-if="modifyEnabled"
            :features="selectedFeatures"
          >
            <ol-style>
              <ol-style-circle :radius="5">
                <ol-style-fill color="#00dd11" />
                <ol-style-stroke color="blue" :width="2" />
              </ol-style-circle>
            </ol-style>
          </ol-interaction-modify>
          <ol-interaction-draw
            v-if="drawEnabled"
            :type="drawType"
            @drawend="drawEnd"
            :stopClick="true"
          />

          <ol-interaction-snap v-if="modifyEnabled || drawEnabled" />
          <ol-style>
            <ol-style-stroke color="blue" :width="3"></ol-style-stroke>
            <ol-style-fill color="rgba(0, 255, 0, 0.3)"></ol-style-fill>
          </ol-style>
        </ol-source-vector>
      </ol-vector-layer>
      <ol-interaction-select
        @select="featureSelected"
        :condition="selectCondition"
        :features="selectedFeatures"
      >
        <ol-style>
          <ol-style-stroke color="red" :width="2"></ol-style-stroke>
          <ol-style-fill color="rgba(255, 0, 0, 0.3)"></ol-style-fill>
        </ol-style>
      </ol-interaction-select>
      <ol-interaction-dragrotate />
    </ol-map>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { Collection } from 'ol'
import { GeoJSON } from 'ol/format'
import useMapStore from '@/store/type/map.ts'

const center = ref([112, 28])
const projection = ref('EPSG:4326')
//将中心坐标由经纬度投影转为墨卡托投影
/*const transformCenter = transform(
  center.value,
  projection.value,
  projection_m.value,
)*/
const zoom = ref(10)

const geometryType = [
  /*{value:"Point",label:"点"},*/ { value: 'LineString', label: '线' },
  { value: 'Polygon', label: '多边形' },
  { value: 'Circle', label: '圆' },
]
const drawEnabled = ref(true)
const drawType = ref('Polygon')
const modifyEnabled = ref(false)

const geoJsonObject = {
  type: 'FeatureCollection',
  crs: {
    type: 'name',
    properties: {
      name: 'EPSG:4326',
    },
  },
  // features: useMapStore().features,
  features: [],
}

const zones = ref([])
const selectedFeatures = ref(new Collection())

zones.value = new GeoJSON().readFeatures(geoJsonObject)
console.log(zones.value)
const selectConditions = inject('ol-selectconditions')
const selectCondition = selectConditions.click

function featureSelected(event) {
  modifyEnabled.value = event.selected.length > 0
  selectedFeatures.value = event.target.getFeatures()
}

const drawEnd = (event) => {
  zones.value.push(event.feature)
  selectedFeatures.value.push(event.feature)

  modifyEnabled.value = true
  drawEnabled.value = false
}

const saveGeometry = () => {
  console.log('save')
  //  拿到zones里的坐标和图形type，保存到mapStore
  //  弹窗输入name(确保标记唯一),程度，地区，评判标准
  let type = 'Feature'
  for (let v of zones.value) {
    //将feature存入mapStore
    let type: string = v.getGeometry().constructor.name.split('_').join('')
    let coordinates: [number, number][][] = [
      flattenToPairs(v.getGeometry().flatCoordinates),
    ]
    useMapStore().setFeature({ type, coordinates })
  }
}
//还原扁平化的coordinates
function flattenToPairs(flatArray) {
  // 首先检查输入数组是否为空或者长度不为偶数，如果是，则无法构成二元对数组，返回空数组或提示错误
  if (!flatArray || flatArray.length % 2 !== 0) {
    console.error('输入数组长度应为偶数，以构成二元对。')
    return []
  }
  // 使用Array.from和映射函数生成新的二维数组
  // 步长为2，意味着每次跳过一个元素来创建新的子数组（即二元对）
  return Array.from({ length: flatArray.length / 2 }, (_, i) => [
    flatArray[i * 2],
    flatArray[i * 2 + 1],
  ])
}
</script>

<style lang="scss" scoped>
.ol-map {
  position: relative;
}
.ol-map-loading:after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  margin-top: -40px;
  margin-left: -40px;
  border-radius: 50%;
  border: 5px solid rgba(180, 180, 180, 0.6);
  border-top-color: #20d2ff;
  animation: spinner 0.6s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
