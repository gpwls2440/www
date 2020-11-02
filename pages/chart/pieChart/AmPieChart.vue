<template>
  <div id="chartdiv"></div>
</template>

<script>
export default {
  name: 'AmPieChart',
  data() {
    return {}
  },
  mounted() {
    const { am4core, am4charts } = this.$am4core()
    const chart = am4core.create('chartdiv', am4charts.PieChart)

    chart.data = [
      {
        country: '서울가락',
        litres: 501.9,
        color: am4core.color('#64b5f6')
      },
      {
        country: '대구북부',
        litres: 301.9,
        color: am4core.color('#1976d2')
      },
      {
        country: '광주서부',
        litres: 201.1,
        color: am4core.color('#ef6c00')
      },
      {
        country: '구리도매',
        litres: 165.8,
        color: am4core.color('#ffd54f')
      },
      {
        country: '광주각화',
        litres: 161.1,
        color: am4core.color('#455a64')
      },
      {
        country: '서울강서',
        litres: 145.8,
        color: am4core.color('#96a6a6')
      }
    ]

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries())
    pieSeries.dataFields.value = 'litres'
    pieSeries.dataFields.category = 'country'
    pieSeries.slices.template.propertyFields.fill = 'color'

    // chart.legend = new am4charts.Legend()
    // chart.legend.maxWidth = 100
    // chart.legend.maxHeight = 110

    chart.fontSize = 12
    chart.radius = am4core.percent(50)
  }
}
</script>
