<template>
  <el-tree-v2
    @check-change="handleCheckChange"
    style="max-width: 400px"
    :data="data"
    :height="700"
    :props="props"
    show-checkbox
    :default-checked-keys="defaultCheckedKeys"
    :default-expanded-keys="defaultExpandedKeys"
  />
</template>
<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['updateRegions', 'updateDegrees', 'updateCriterias'])
const handleCheckChange = (current, state) => {
  /*对象，选中状态*/
  //  将current传给父组件,如果state为true,加入数组，为false，删除数组
  console.log(current)
  if (current.id === 'region' || current.type === 'region')
    emit('updateRegions', current, state)
  else if (current.id === 'degree' || current.type === 'degree')
    emit('updateDegrees', current, state)
  else if (current.id === 'criteria' || current.type === 'criteria')
    emit('updateCriterias', current, state)
}
interface Tree {
  id: string
  label: string
  children?: Tree[]
}

const regions = [
  { id: 'hunan', label: '湖南', type: 'region' },
  { id: 'hubei', label: '湖北', type: 'region' },
  { id: 'jiangxi', label: '江西', type: 'region' },
]
const degrees = [
  { id: 'prime', label: '优等', type: 'degree' },
  { id: 'good', label: '良等', type: 'degree' },
  { id: 'average', label: '中等', type: 'degree' },
  { id: 'marginal', label: '低等', type: 'degree' },
  { id: 'poor', label: '劣等', type: 'degree' },
]
const criterias = [
  { id: 'climate', label: '气候', type: 'criteria' },
  { id: 'topography', label: '地貌', type: 'criteria' },
  { id: 'geology', label: '岩石', type: 'criteria' },
  { id: 'biology', label: '生物', type: 'criteria' },
  { id: 'hydrology', label: '水文', type: 'criteria' },
]

const props = {
  value: 'id',
  label: 'label',
  children: 'children',
}
const data = [
  { id: 'region', label: '地区', children: regions },
  { id: 'degree', label: '程度', children: degrees },
  { id: 'criteria', label: '标准', children: criterias },
]
const checkedKeys: string[] = []
const expanedKeys: string[] = []
for (const datum of data) {
  const children = datum.children
  if (children) {
    expanedKeys.push(datum.id)
    checkedKeys.push(children[0])
    break
  }
}

const defaultCheckedKeys = ref(checkedKeys)
const defaultExpandedKeys = ref(expanedKeys)
</script>
