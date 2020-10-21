<template>
  <div id="container"></div>
</template>

<script>
import anychart from 'anychart'
export default {
  name: 'AnyChart',
  data() {
    return {}
  },
  mounted() {
    const data = [
      { x: '사과', value: 150 },
      { x: '배', value: 28 },
      { x: '밤', value: 51 },
      { x: '귤', value: 145 },
      { x: '양파', value: 60 },
      { x: '대파', value: 30 },
      { x: '고구마', value: 45 },
      { x: '감자', value: 178 },
      { x: '수박', value: 20 },
      { x: '마늘', value: 44 },
      { x: '토마토', value: 33 },
      { x: '배추', value: 36 },
      { x: '포도', value: 61 },
      { x: '시금치', value: 47 },
      { x: '생강', value: 50 },
      { x: '파인애플', value: 55 },
      { x: '오이', value: 43 },
      { x: '고수', value: 15 },
      { x: '콩', value: 30 },
      { x: '부추', value: 60 },
      { x: '메론', value: 42 },
      { x: '샤인머스켓', value: 130 },
      { x: '감', value: 25 },
      { x: '체리', value: 50 },
      { x: '호두', value: 43 },
      { x: '콩나물', value: 25 },
      { x: '딸기', value: 55 },
      { x: '곶감', value: 43 },
      { x: '복숭아', value: 65 }
    ]
    // create a chart and set the data
    const chart = anychart.tagCloud(data)

    // set the chart title
    chart.title('최근 3일간의(농산물) title 뉴스 단어 분석(2020.09.20~)')

    // configure angles
    chart.angles([0])

    // create and configure a color scale.
    const customColorScale = anychart.scales.linearColor()
    customColorScale.colors(['#ffcc00', '#00ccff'])

    // set the color scale as the color scale of the chart
    chart.colorScale(customColorScale)

    // add a color range
    chart.colorRange().enabled(true)

    // set the container id
    chart.container('container')

    // initiate drawing the chart
    chart.draw()
  }
}
</script>

<style>
#container {
  width: 100%;
  height: 350px;
}
</style>
