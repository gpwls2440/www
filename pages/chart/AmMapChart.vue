<template>
  <div id="chartdiv"></div>
</template>

<script>
export default {
  name: 'AmMapChart',
  data() {
    return {}
  },
  mounted() {
    const { am4core, am4maps, am4geodataWorldLow } = this.$am4core()

    // Create map instance
    const chart = am4core.create('chartdiv', am4maps.MapChart)

    const title = chart.titles.create()
    title.text = '감자 주요국 수입금액: 14,020(만달러($)/비중%) 2015.01~2020.09'
    title.fontSize = 15
    title.marginBottom = 30

    // Set map definition
    chart.geodata = am4geodataWorldLow

    // Set projection
    chart.projection = new am4maps.projections.Miller()

    // Create map polygon series
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.tooltipText = '{name}' + ': ' + '{value}'
    // polygonTemplate.fill = am4core.color('#74B266')

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover')
    hs.properties.fill = am4core.color('#BADA55')

    // Remove Antarctica
    polygonSeries.exclude = ['AQ']

    // Add heat rule
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#ffffff'),
      max: am4core.color('#333399')
    })

    // Add heat legend
    const heatLegend = chart.createChild(am4maps.HeatLegend)
    heatLegend.series = polygonSeries
    heatLegend.width = am4core.percent(25)
    heatLegend.valign = 'bottom'
    heatLegend.align = 'center'
    heatLegend.minValue = 0

    polygonSeries.mapPolygons.template.events.on('over', function (ev) {
      if (!isNaN(ev.target.dataItem.value)) {
        heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
      } else {
        heatLegend.valueAxis.hideTooltip()
      }
    })

    polygonSeries.mapPolygons.template.events.on('out', function (ev) {
      heatLegend.valueAxis.hideTooltip()
    })

    // Add some data
    polygonSeries.data = [
      {
        id: 'US',
        name: 'United States',
        value: 6832.3 + '만($)',
        fill: am4core.color('#333399')
      },
      {
        id: 'FR',
        name: 'France',
        value: 863.2 + '만($)',
        fill: am4core.color('#333399')
      }
    ]

    // Bind "fill" property to "fill" key in data
    polygonTemplate.propertyFields.fill = 'fill'
  }
}
</script>
