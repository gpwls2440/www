import Vue from 'vue'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4pluginsWordCloud from '@amcharts/amcharts4/plugins/wordCloud'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow'

Vue.prototype.$am4core = () => {
  return {
    am4core,
    am4charts,
    am4pluginsWordCloud,
    am4themesAnimated,
    am4maps,
    am4geodataWorldLow
  }
}
