<template>
  <div id="chartdiv"></div>
</template>

<script>
export default {
  name: 'BubbleChart',
  data() {
    return {}
  },
  mounted() {
    const { am4core, am4charts } = this.$am4core()
    const chart = am4core.create('chartdiv', am4charts.XYChart)

    const valueAxisX = chart.xAxes.push(new am4charts.ValueAxis())
    valueAxisX.renderer.ticks.template.disabled = true
    valueAxisX.renderer.axisFills.template.disabled = true

    const valueAxisY = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxisY.renderer.ticks.template.disabled = true
    valueAxisY.renderer.axisFills.template.disabled = true

    const series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.valueX = 'x'
    series.dataFields.valueY = 'y'
    series.dataFields.value = 'value'
    series.strokeOpacity = 0
    series.sequencedInterpolation = true
    series.tooltip.pointerOrientation = 'vertical'

    const bullet = series.bullets.push(new am4core.Circle())
    bullet.fill = am4core.color('#ff0000')
    bullet.propertyFields.fill = 'color'
    bullet.strokeOpacity = 0
    bullet.strokeWidth = 2
    bullet.fillOpacity = 0.5
    bullet.stroke = am4core.color('#ffffff')
    bullet.hiddenState.properties.opacity = 0
    bullet.tooltipText = '[bold]{title}:[/]\n거래량: {valueX.value}\n기준가격:{valueY.value}\n거래대금: {value.value}'

    const outline = chart.plotContainer.createChild(am4core.Circle)
    outline.fillOpacity = 0
    outline.strokeOpacity = 0.8
    outline.stroke = am4core.color('#ff0000')
    outline.strokeWidth = 2
    outline.hide(0)

    const blurFilter = new am4core.BlurFilter()
    outline.filters.push(blurFilter)

    bullet.events.on('over', function (event) {
      // const target = event.target
      // outline.radius = target.pixelRadius + 2
      // outline.x = target.pixelX
      // outline.y = target.pixelY
      // outline.show()
    })

    bullet.events.on('out', function (event) {
      outline.hide()
    })

    const hoverState = bullet.states.create('hover')
    hoverState.properties.fillOpacity = 1
    hoverState.properties.strokeOpacity = 1

    series.heatRules.push({ target: bullet, min: 2, max: 60, property: 'radius' })

    bullet.adapter.add('tooltipY', function (tooltipY, target) {
      return -target.radius
    })

    chart.cursor = new am4charts.XYCursor()
    chart.cursor.behavior = 'zoomXY'
    chart.cursor.snapToSeries = series

    chart.scrollbarX = new am4core.Scrollbar()
    chart.scrollbarY = new am4core.Scrollbar()

    chart.data = [
      {
        title: '경상북도',
        color: '#eea638',
        x: 962.8,
        y: 2633,
        value: 253531
      },
      {
        title: '경북안동시',
        color: '#eea638',
        x: 741.1,
        y: 2594,
        value: 192314
      },
      {
        title: '경북 청송군',
        color: '#eea638',
        x: 641,
        y: 2411,
        value: 156608
      },
      {
        title: '경북 영주시',
        color: '#eea638',
        x: 544,
        y: 2877,
        value: 183531
      },
      {
        title: '충북 충주시',
        color: '#eea638',
        x: 711.1,
        y: 2494,
        value: 182314
      },
      {
        title: '경북 의성군',
        color: '#eea638',
        x: 441,
        y: 3011,
        value: 176608
      },
      {
        title: '경상북도',
        color: '#eea638',
        x: 450.8,
        y: 223.3,
        value: 173531
      },
      {
        title: '전북 장수군',
        color: '#eea638',
        x: 401.1,
        y: 2594,
        value: 142314
      },
      {
        title: '전북 무주군',
        color: '#eea638',
        x: 250,
        y: 2011,
        value: 136608
      },
      {
        title: '충북 영동군',
        color: '#eea638',
        x: 362.8,
        y: 2133,
        value: 133531
      },
      {
        title: '전북 안성시',
        color: '#eea638',
        x: 241.1,
        y: 1994,
        value: 112314
      }
    ]
  }
}
</script>
