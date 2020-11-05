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
    polygonTemplate.tooltipText = '{name}'
    polygonTemplate.fill = am4core.color('#74B266')

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover')
    hs.properties.fill = am4core.color('#367B25')

    // Remove Antarctica
    polygonSeries.exclude = ['AQ']

    // Add some data
    polygonSeries.data = [
      {
        id: 'US',
        name: 'United States',
        value: 100,
        fill: am4core.color('#F05C5C')
      },
      {
        id: 'FR',
        name: 'France',
        value: 50,
        fill: am4core.color('#5C5CFF')
      }
    ]

    // Bind "fill" property to "fill" key in data
    polygonTemplate.propertyFields.fill = 'fill'
  }
}
</script>
