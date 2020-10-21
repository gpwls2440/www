<template>
  <div id="app">
    <div id="chartdiv"></div>
    <AnyChart></AnyChart>
  </div>
</template>

<script>
import AnyChart from './AnyChart'

export default {
  name: 'WordCloud',
  components: {
    AnyChart
  },
  data() {
    return {}
  },
  mounted() {
    const { am4core, am4pluginsWordCloud } = this.$am4core()
    const chart = am4core.create('chartdiv', am4pluginsWordCloud.WordCloud)
    const series = chart.series.push(new am4pluginsWordCloud.WordCloudSeries())
    series.text = `'딸기, 딸기, 딸기, 딸기, 바나나, 바나나, 사과, 배, 배, 배, 배, 귤, 귤, 귤, 포도, 포도, 자두, 자두, 자두, 양파, 양파, 토마토, 토마토, 토마토, 고구마, 고구마, 부추, 부추, 부추,
    오이, 오이, 오이, 수박, 수박, 감자, 감자, 감자, 감자, 콩, 콩, 콩, 마늘, 마늘, 마늘, 마늘, 복숭아, 복숭아, 메론, 메론, 파프리카, 파프리카, 대파, 대파'`

    // series.maxCount = 100
    // series.minWordLength = 2
    // 열규칙 사용
    series.heatRules.push({
      target: series.labels.template,
      property: 'fill',
      min: am4core.color('#ffaaaa'),
      max: am4core.color('#ff5555'),
      dataField: 'value'
    })

    series.labels.template.tooltipText = '{word}:\n[bold]{value}[/]' // 툴팁 활성화
    // series.randomness = 0 // 단어가 흩어진 정도
    series.rotationThreshold = 0 // 회전임계값
  }
}
</script>

<style>
#chartdiv {
  width: 100%;
  height: 350px;
}
</style>
