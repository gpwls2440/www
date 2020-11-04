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

    const chart = am4core.create('chartdiv', am4charts.XYChart)
    chart.colors.step = 2

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0

    const yAxis = chart.yAxes.push(new am4charts.ValueAxis())
    yAxis.min = 0

    function createSeries(value, name) {
      const series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = value
      series.dataFields.categoryX = 'category'
      series.name = name

      series.events.on('hidden', arrangeColumns)
      series.events.on('shown', arrangeColumns)

      const bullet = series.bullets.push(new am4charts.LabelBullet())
      bullet.interactionsEnabled = false
      bullet.dy = 30
      bullet.label.text = '{valueY}'
      bullet.label.fill = am4core.color('#ffffff')

      return series
    }

    chart.data = [
      {
        category: 'Place #1',
        first: 40,
        second: 55,
        third: 60
      },
      {
        category: 'Place #2',
        first: 30,
        second: 78,
        third: 69
      },
      {
        category: 'Place #3',
        first: 27,
        second: 40,
        third: 45
      },
      {
        category: 'Place #4',
        first: 50,
        second: 33,
        third: 22
      }
    ]

    createSeries('first', 'The First')
    createSeries('second', 'The Second')
    createSeries('third', 'The Third')

    function arrangeColumns() {
      const series = chart.series.getIndex(0)

      const w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation)
      if (series.dataItems.length > 1) {
        const x0 = xAxis.getX(series.dataItems.getIndex(0), 'categoryX')
        const x1 = xAxis.getX(series.dataItems.getIndex(1), 'categoryX')
        const delta = ((x1 - x0) / chart.series.length) * w
        if (am4core.isNumber(delta)) {
          const middle = chart.series.length / 2

          let newIndex = 0
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex
              newIndex++
            } else {
              series.dummyData = chart.series.indexOf(series)
            }
          })
          const visibleCount = newIndex
          const newMiddle = visibleCount / 2

          chart.series.each(function (series) {
            const trueIndex = chart.series.indexOf(series)
            const newIndex = series.dummyData

            const dx = (newIndex - trueIndex + middle - newMiddle) * delta

            series.animate({ property: 'dx', to: dx }, series.interpolationDuration, series.interpolationEasing)
            series.bulletsContainer.animate({ property: 'dx', to: dx }, series.interpolationDuration, series.interpolationEasing)
          })
        }
      }
    }
  }
}
</script>
