<template>
  <highcharts :constructor-type="'mapChart'" :options="mapOptions" class="map"></highcharts>
</template>

<script>
import worldMap from '@highcharts/map-collection/custom/world.geo.json'

export default {
  name: 'MapChart',
  data() {
    return {
      mapOptions: {
        chart: {
          map: worldMap
        },
        title: {
          text: '[감자] 주요국 수입금액: 14,020(만달러($)/비중%) 2015.01~2020.09'
        },
        subtitle: {
          text: 'Source map'
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: 'spacingBox'
          }
        },
        colorAxis: {
          min: 0
        },
        series: [
          {
            name: '감자 = 수입',
            states: {
              hover: {
                color: '#BADA55'
              }
            },
            dataLabels: {
              // enabled: true,
              // format: '{point.name}'
            },
            // allAreas: false,
            data: [
              ['fo', 163],
              ['um', 1],
              ['us', 2],
              ['jp', 51626],
              ['sc', 4],
              ['in', 5]
            ]
          }
        ]
      }
    }
  }
}
</script>
<style scoped>
.map {
  min-height: 500px;
}
</style>
