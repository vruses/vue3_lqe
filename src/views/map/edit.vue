<template>
 <div style="width: 100%;height: 100%;">
   <form>
     <fieldset style="display: flex;align-items: center">
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
     </fieldset>
   </form>

   <ol-map
       :loadTilesWhileAnimating="true"
       :loadTilesWhileInteracting="true"
       style="height: 100%"
   >
     <ol-view
         ref="view"
         :center="transformCenter"
         :zoom="zoom"
         :projection="projection_m"
     />

     <ol-tile-layer>
       <ol-source-osm />
     </ol-tile-layer>

     <ol-vector-layer>
       <ol-source-vector :projection="projection_m" :feature="zones">
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
             @drawstart="drawStart"
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

<script setup>
import { inject, ref} from "vue";
import {Collection} from "ol";
import {GeoJSON} from "ol/format";
import { transform } from 'ol/proj'

const center = ref([116, 39]);
const projection_m = ref("EPSG:3857");
const projection = ref("EPSG:4326")
//将经纬度转为投影坐标
const transformCenter = transform(center.value,projection.value,projection_m.value)
const zoom = ref(8);

const geometryType = [/*{value:"Point",label:"点"},*/{value:"LineString",label:"线"},{value:"Polygon",label:"多边形"},{value:"Circle",label:"圆"}]
const drawEnabled = ref(true);
const drawType = ref("Polygon");
const modifyEnabled = ref(false);


const drawStart = (event) => {
  console.log(event);
};

const geojsonObject = {
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "EPSG:4326",
    },
  },
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-103.86923852630616, 43.45599322423934],
            [-103.90891107984544, 39.34240191087722],
            [-98.76630637117387, 39.558687199211114],
            [-98.89435771175386, 43.945405844902986],
            [-103.86923852630616, 43.45599322423934],
          ],
        ],
      },
    },
  ],
};

const zones = ref([]);
const selectedFeatures = ref(new Collection());

const drawEnd = (event) => {
  zones.value.push(event.feature);
  selectedFeatures.value.push(event.feature);

  modifyEnabled.value = true;
  drawEnabled.value = false;
};

zones.value = new GeoJSON().readFeatures(geojsonObject);
const selectConditions = inject("ol-selectconditions");
const selectCondition = selectConditions.click;

function featureSelected(event) {
  modifyEnabled.value = event.selected.length > 0;
  selectedFeatures.value = event.target.getFeatures();
}
</script>

<style lang="scss" scoped>
.ol-map {
  position: relative;
}
.ol-map-loading:after {
  content: "";
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