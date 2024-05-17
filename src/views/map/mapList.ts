import XYZ from 'ol/source/XYZ'

//********************加载在线百度地图*************************//
let source_baidu = new XYZ({
  tileUrlFunction: function (tileCoordinate) {
    if (tileCoordinate) {
      let z = tileCoordinate[0]
      let x = tileCoordinate[1]
      let y = -tileCoordinate[2] - 1
      let zoom = z - 1
      let offsetX = parseInt(String(Math.pow(2, zoom)))
      let offsetY = offsetX - 1
      let numX = x - offsetX,
        numY = -y + offsetY
      let num = Math.abs(((y + x) % 8) + 1)
      return (
        'http://online' +
        num +
        '.map.bdimg.com/tile/?qt=tile&x=' +
        numX +
        '&y=' +
        numY +
        '&z=' +
        z +
        '&styles=pl&scaler=1'
      )
    } else {
      return ''
    }
  },
})

//********************加载在线百度卫星影像地图*************************//
let source_baiduSat = new XYZ({
  tileUrlFunction: function (tileCoordinate) {
    console.log(tileCoordinate)
    if (tileCoordinate) {
      let z = tileCoordinate[0]
      let x = tileCoordinate[1]
      let y = -tileCoordinate[2] - 1
      let zoom = z - 1
      let offsetX = parseInt(String(Math.pow(2, zoom)))
      let offsetY = offsetX - 1
      let numX = x - offsetX,
        numY = -y + offsetY
      let num = ((y + x) % 8) + 1
      return (
        'http://shangetu' +
        num +
        '.map.bdimg.com/it/u=x=' +
        numX +
        ';y=' +
        numY +
        ';z=' +
        z +
        ';v=009;type=sate&fm=46'
      )
    } else {
      return ''
    }
  },
})

let source_baiduSatLabel = new XYZ({
  tileUrlFunction: function (tileCoordinate) {
    console.log(tileCoordinate)
    if (tileCoordinate) {
      let z = tileCoordinate[0]
      let x = tileCoordinate[1]
      let y = -tileCoordinate[2] - 1
      let zoom = z - 1
      let offsetX = parseInt(String(Math.pow(2, zoom)))
      let offsetY = offsetX - 1
      let numX = x - offsetX,
        numY = -y + offsetY
      let num = ((y + x) % 8) + 1
      return (
        'http://online' +
        num +
        '.map.bdimg.com/tile/?qt=tile&x=' +
        numX +
        '&y=' +
        numY +
        '&z=' +
        z +
        '&styles=sl'
      )
    } else {
      return ''
    }
  },
})

//********************加载在线高德地图*************************//
let source_amap = new XYZ({
  url: 'https://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
})

//********************加载在线高德卫星影像地图*************************//
let source_amapSat = new XYZ({
  url: 'https://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}',
})

let source_amapSatLabel = new XYZ({
  url: 'https://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
})

//********************geoQ智图在线地图服务*************************//
let source_geoQ_ChinaOnlineCommunity = new XYZ({
  url: 'https://map.geoQ.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
})
let source_geoQ_ChinaOnlineStreetGray = new XYZ({
  url: 'https://map.geoQ.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
})
let source_geoQ_ChinaOnlineStreetWarm = new XYZ({
  url: 'https://map.geoQ.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
})
let source_geoQ_ChinaOnlineStreetPurplishBlue = new XYZ({
  url: 'https://map.geoQ.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
})

export const mapLabels = [
  {
    label: '在线百度地图',
    options: [
      {
        value: 'baidu',
        label: '百度电子地图',
      },
      {
        value: 'baiduSat',
        label: '百度卫星图',
      },
    ],
  },
  {
    label: '在线高德地图',
    options: [
      {
        value: 'amap',
        label: '高德电子地图',
      },
      {
        value: 'amapSat',
        label: '高德卫星图',
      },
    ],
  },
  {
    label: '智图在线地图（ArcGIS REST）',
    options: [
      {
        value: 'geoQcs',
        label: '彩色地图',
      },
      {
        value: 'geoQns',
        label: '暖色地图',
      },
      {
        value: 'geoQhs',
        label: '灰色地图',
      },
      {
        value: 'geoQlh',
        label: '蓝黑地图',
      },
    ],
  },
]
export const mapList = {
  baidu: [source_baidu],
  baiduSat: [source_baiduSat, source_baiduSatLabel],
  amap: [source_amap],
  amapSat: [source_amapSat, source_amapSatLabel],
  geoQcs: [source_geoQ_ChinaOnlineCommunity],
  geoQns: [source_geoQ_ChinaOnlineStreetWarm],
  geoQhs: [source_geoQ_ChinaOnlineStreetGray],
  geoQlh: [source_geoQ_ChinaOnlineStreetPurplishBlue],
}
