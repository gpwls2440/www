import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import StockInit from 'highcharts/modules/stock'
import Maps from 'highcharts/modules/map'

StockInit(Highcharts)
Maps(Highcharts)

Vue.use(HighchartsVue)
