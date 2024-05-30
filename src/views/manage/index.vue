<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="name" prop="name" />
    <el-table-column label="degree" prop="degree" />
    <el-table-column label="region" prop="region" />
    <el-table-column label="criteria" prop="criteria" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button
          size="small"
          @click="handleSubmit(scope.$index, scope.row)"
          type="primary"
        >
          submit
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import useMapStore from '@/store/type/map'
import { GeoJson } from '@/interfaces/map/geoJson'

const search = ref('')
const filterTableData = computed(() =>
  geoData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()),
  ),
)
const handleSubmit = (index: number, row: GeoJson) => {
  console.log(index, row)
  useMapStore().geoJsons.splice(index, 1)
}
const handleDelete = (index: number, row: GeoJson) => {
  console.log(index, row)
  useMapStore().geoJsons.splice(index, 1)
}

const geoData = useMapStore().geoJsons
</script>
