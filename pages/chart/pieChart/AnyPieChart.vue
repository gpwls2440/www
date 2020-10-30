<template>
  <div id="container"></div>
</template>

<script>
import anychart from 'anychart'
export default {
  name: 'AnyPieChart',
  data() {
    return {}
  },
  mounted() {
    const data = [
      { x: `미국` + `(48.8%)`, value: 6842.3 },
      { x: `호주` + `(42.3%)`, value: 5915.3 },
      { x: `중국` + `(48.8%)`, value: 863.2 },
      { x: `베트남` + `(48.8%)`, value: 281.6 },
      { x: `벨기에` + `(48.8%)`, value: 90.9 },
      { x: `Other` + `(48.8%)`, value: 5 }
    ]
    // create a chart and set the data
    const chart = anychart.pie(data)

    // set the chart title
    chart.title('감자=수입 14,020(만달러($)/비중%) 2015.01~2020.09 (AnyChart)')
    chart.title().fontSize(12)
    chart.title().fontColor('#000')

    // adjust legend
    const legend = chart.legend()
    legend.enabled(true)
    legend.position('right')
    legend.align('center')
    legend.itemsLayout('vertical')

    // chart.labels().position('outside')
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
