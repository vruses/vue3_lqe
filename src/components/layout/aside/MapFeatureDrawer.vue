<template>
  <el-drawer
    v-model="useSettingStore().drawerFold"
    title="土地质量情况登记"
    :before-close="handleClose"
    direction="rtl"
    class="demo-drawer"
  >
    <div class="demo-drawer__content">
      <el-form :model="form" label-width="auto" label-position="left">
        <el-form-item label="标记名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="健康程度">
          <el-select v-model="form.degree" placeholder="请选择健康程度">
            <el-option
              v-for="item of landInfo.degree"
              :label="item.label"
              :key="item.key"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="评判标准">
          <el-select v-model="form.criteria" placeholder="请选择评判标准">
            <el-option
              v-for="item in landInfo.criteria"
              :label="item.label"
              :key="item.key"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="区域名">
          <el-select v-model="form.region" placeholder="请选择一个区域">
            <el-option
              v-for="item in landInfo.region"
              :label="item.label"
              :key="item.key"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取消</el-button>
        <el-button type="primary" :loading="loading" @click.prevent="onClick">
          {{ loading ? '保存中 ...' : '保存' }}
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElDrawer, ElMessageBox } from 'element-plus'
import useSettingStore from '@/store/type/settings'
import { defineProps } from 'vue'
import useMapStore from '@/store/type/map'
import { Feature, Features } from '@/interfaces/map/features'

//从featureEdit父组件拿到几何图形的相关数据
const features = defineProps(['features']) as Features
console.log('子组件')
let timer

const table = ref(false)
const loading = ref(false)

const form = reactive({
  // //不同图形的标志
  // gid:'',
  name: '',
  //健康程度
  degree: '',
  //评判标准
  criteria: '',
  //所属地
  region: '',
  //featureTYpe
  type: 'Feature',
  // //  坐标
  //   coordinates:[[[]]] as [number,number][][]
  //   geometries:[] as Feature["geometry"][]
  features: [] as Features,
})
const landInfo = reactive({
  degree: [
    { key: 'prime', label: '优等' },
    { key: 'good', label: '良等' },
    { key: 'average', label: '中等' },
    { key: 'marginal', label: '低等' },
    { key: 'poor', label: '劣等' },
  ],
  criteria: [
    { key: 'climate', label: '气候' },
    { key: 'topography', label: '地貌' },
    { key: 'geology', label: '岩石' },
    { key: 'biology', label: '生物' },
    { key: 'hydrology', label: '水文' },
  ],
  region: [
    { key: 'hunan', label: '湖南' },
    { key: 'hubei', label: '湖北' },
    { key: 'jiangxi', label: '江西' },
  ],
})

const onClick = () => {
  Object.assign(form, features)
  useMapStore().toGeoJson(form)
  loading.value = true
  loading.value = true
  setTimeout(() => {
    loading.value = false
    useSettingStore().setDrawerFoldState(false)
  }, 400)
}

const handleClose = (done) => {
  if (loading.value) {
    return
  }
  ElMessageBox.confirm('Do you want to submit?')
    .then(() => {
      timer = setTimeout(() => {
        done()
        // 动画关闭需要一定的时间
        setTimeout(() => {
          loading.value = false
        }, 400)
      }, 2000)
    })
    .catch(() => {
      // catch error
    })
}

const cancelForm = () => {
  loading.value = false
  useSettingStore().setDrawerFoldState(false)
  clearTimeout(timer)
}
const openDrawer = () => {
  useSettingStore().setDrawerFoldState(true)
}
</script>
