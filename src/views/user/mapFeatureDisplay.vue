<template>
  <div class="common-layout">
    <el-container>
      <el-button
        type="default"
        style="position: fixed; top: 50%; z-index: 1"
        @click="drawer = true"
        size="small"
      >
        >
      </el-button>
      <el-drawer
        v-model="drawer"
        title="I am the title"
        :with-header="false"
        :modal="false"
      >
        <span>条件筛选</span>
        <TreeFilter
          @updateRegions="handleUpdateRegions"
          @updateDegrees="handleUpdateDegrees"
          @updateCriterias="handleUpdateCriterias"
        ></TreeFilter>
      </el-drawer>
      <el-main>
        <ol-map
          :loadTilesWhileAnimating="true"
          :loadTilesWhileInteracting="true"
          style="height: 670px; width: 100%"
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

          <!--根据健康程度显示对应颜色-->
          <ol-vector-layer
            v-model="_zones"
            v-for="(zone, index) in _zones"
            :key="index"
          >
            <ol-source-vector :features="zone">
              <ol-style>
                <ol-style-stroke color="grey" :width="3"></ol-style-stroke>
                <ol-style-fill :color="getColor(index)"></ol-style-fill>
              </ol-style>
            </ol-source-vector>
          </ol-vector-layer>
          <ol-interaction-dragrotate />
        </ol-map>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue'
import { GeoJSON } from 'ol/format'
import useMapStore from '@/store/type/map.ts'
import _ from 'lodash-es'
import TreeFilter from '@/components/layout/aside/TreeFilter.vue'
const center = ref([112, 28])
const projection = ref('EPSG:4326')
const zoom = ref(10)

const drawer = ref(false)

//region,degree,criteria
const regions = reactive([])
const degrees = reactive([])
const criterias = reactive([])

const handleUpdateDegrees = (current, state) => {
  //  id,label,children
  //  id,label
  if (state) {
    if (current.children) {
      degrees.push(...current.children)
    } else {
      degrees.push(current)
    }
  } else {
    if (current.children) {
      degrees.length = 0
    } else {
      degrees.splice(
        degrees.findIndex(function (item) {
          return item.id === current.id
        }),
        1,
      )
    }
  }
}
const handleUpdateCriterias = (current, state) => {
  //为t则push，为f则splice
  if (state) {
    if (current.children) {
      criterias.push(...current.children)
    } else {
      criterias.push(current)
    }
  } else {
    if (current.children) {
      criterias.length = 0
    } else {
      criterias.splice(
        criterias.findIndex(function (item) {
          return item.id === current.id
        }),
        1,
      )
    }
  }
}
const handleUpdateRegions = (current, state) => {
  if (state) {
    if (current.children) {
      regions.push(...current.children)
    } else {
      regions.push(current)
    }
  } else {
    if (current.children) {
      regions.length = 0
    } else {
      regions.splice(
        regions.findIndex(function (item) {
          return item.id === current.id
        }),
        1,
      )
    }
  }
}

const geoJsonData = useMapStore().geoJsons

//关键词过滤
function filterObjects(objects, regions, degrees, criterias) {
  return objects.filter((obj) => {
    return (
      (regions.length === 0 || regions.includes(obj.region)) &&
      (degrees.length === 0 || degrees.includes(obj.degree)) &&
      (criterias.length === 0 || criterias.includes(obj.criteria))
    )
  })
}

const filterTableData = computed(() =>
  //过滤出每个对象的feature
  filterObjects(
    geoJsonData,
    //
    regions.map((item) => item.id),
    degrees.map((item) => item.id),
    criterias.map((item) => item.id),
  ).map((item) => {
    return { ...item.feature, color: item.degree }
  }),
)

const zones = ref([])
//将zones分片用以循环遍历
let _zones = ref([])
//
watchEffect(() => {
  const geoJsonObject = {
    type: 'FeatureCollection',
    crs: {
      type: 'name',
      properties: {
        name: 'EPSG:4326',
      },
    },
    features: filterTableData.value,
  }
  zones.value = new GeoJSON().readFeatures(geoJsonObject)
  _zones.value = _.chunk(zones.value, 1)
})
//将坐标转为对应的color
const getColor = (index) => {
  let colorIndex = filterTableData.value.map((item) => {
    return item.color
  })
  const colorMap = {
    prime: 'rgba(0, 255, 0, 0.3)', // 绿色
    good: 'rgba(128, 255, 0, 0.3)', // 渐变黄色
    average: 'rgba(255, 255, 0, 0.3)', // 黄色
    marginal: 'rgba(255, 128, 0, 0.3)', // 渐变红色
    poor: 'rgba(255, 0, 0, 0.3)', // 红色
  }
  return colorMap[colorIndex[index]] || 'rgba(255,255,255,0)' // 默认颜色
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
