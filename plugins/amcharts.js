import Vue from 'vue'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4pluginsWordCloud from '@amcharts/amcharts4/plugins/wordCloud'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

Vue.prototype.$am4core = () => {
  return {
    am4core,
    am4charts,
    am4pluginsWordCloud,
    am4themesAnimated
  }
}
