<template>
  <div id="chartdiv2"></div>
</template>

<script>
export default {
  name: 'AmPieChart2',
  data() {
    return {}
  },
  mounted() {
    const { am4core, am4charts } = this.$am4core()
    // Create chart instance
    const chart = am4core.create('chartdiv2', am4charts.PieChart3D)
    // chart.hiddenState.properties.opacity = 0 // this creates initial fade-in

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'right'
    chart.legend.fontSize = 12

    chart.radius = am4core.percent(80)

    chart.fontSize = 12

    chart.data = [
      {
        country: '미국',
        litres: 501.9
      },
      {
        country: '호주',
        litres: 301.9
      },
      {
        country: '중국',
        litres: 201.1
      },
      {
        country: '베트남',
        litres: 165.8
      },
      {
        country: '벨기에',
        litres: 139.9
      },
      {
        country: 'Others',
        litres: 128.3
      }
    ]

    const series = chart.series.push(new am4charts.PieSeries3D())
    series.dataFields.value = 'litres'
    series.dataFields.category = 'country'

    series.ticks.template.disabled = true
    series.alignLabels = false
    series.labels.template.text = `{value.percent.formatNumber('#.0')}%`
    series.labels.template.radius = am4core.percent(-40)
    // series.labels.template.relativeRotation = 90
    series.labels.template.fill = am4core.color('white')
  }
}
</script>
