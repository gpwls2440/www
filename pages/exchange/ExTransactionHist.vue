<template>
  <div class="exchange2_Left_bottom">
    <!-- exchange2_Left_bottom -->
    <div id="tab_btn3" class="ex_tab3">
      <!-- tab_btn3 -->
      <ul>
        <li :class="{ active: tab == '1' }">
          <a @click="tabChange('1')">{{ $t('depthChart') }}</a>
        </li>
        <li :class="{ active: tab == '2' }">
          <a @click="tabChange('2')">{{ $t('tradehistory') }}</a>
        </li>
        <li :class="{ active: tab == '3' }">
          <a @click="tabChange('3')">{{ $t('openorders') }}</a>
        </li>
      </ul>
      <a href="javascript://" class="slideup_btn2"><img src="~/assets/images/ex_btn_off.gif" alt="" /></a>
    </div>
    <!-- // tab_btn3 -->

    <div v-show="tab === '1'" id="con7" class="tab_con3 ex_con3">
      <div id="depth_chart" style="width: 100%; height: 100%"></div>
    </div>

    <div v-show="tab === '2'" id="MatchingList" class="tab_con3 ex_con3">
      <!-- con8 -->
      <div v-show="getSessionId == ''" style="text-align: center; padding: 20px; font-size: 16px">
        <p class="st1">
          <a href="/auth/login"
            ><span class="pointColor">{{ $t('login') }}</span></a
          >
          {{ $t('or') }}
          <a href="javascript:go_join();"
            ><span class="pointColor">{{ $t('signup') }}</span></a
          >
          {{ $t('isrequired') }}
        </p>
      </div>
      <div v-show="getUserLevel > 1" class="ex_table_type3 mCustomScrollbar">
        <!-- ex_table_type1 mCustomScrollbar -->
        <table>
          <colgroup>
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
          </colgroup>
          <tbody>
            <tr>
              <th class="tl">
                <span style="padding-left: 10px">{{ $t('coinname') }}/{{ $t('date') }}</span>
              </th>
              <th class="tr">{{ $t('tradeamount') }}</th>
              <th class="tr">{{ $t('tradeprice') }}</th>
              <th class="tr">{{ $t('asktotal') }}</th>
            </tr>
            <tr v-for="(ml, index) in matchingList" :key="index">
              <td class="st1 tl">
                <span class="wColor">{{ ml.instCd }} / {{ ml.instCd }}</span>
                <span :class="{ red: ml.byslTp == 'B', blue: ml.byslTp == 'S' }">{{ ml.byslTp }}</span
                ><br />
                <p class="gray">{{ ml.mtchTime }}</p>
              </td>
              <td>
                <span :class="{ red: ml.byslTp == 'B', blue: ml.byslTp == 'S' }">{{ ml.mtchQty }}</span> {{ ml.instCd }}
              </td>
              <td>
                <span :class="{ red: ml.byslTp == 'B', blue: ml.byslTp == 'S' }">{{ ml.mtchPrc }}</span> {{ market }}
              </td>
              <td>
                <span :class="{ red: ml.byslTp == 'B', blue: ml.byslTp == 'S' }">{{ ml.mtchQty }}</span> {{ market }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- // ex_table_type1 mCustomScrollbar -->
    </div>
    <!-- // con8 -->
    <div v-show="tab === '3'" id="MatchingReady" class="tab_con3 ex_con3">
      <!-- con9 -->
      <div v-show="getSessionId == ''" style="text-align: center; padding: 20px; font-size: 16px">
        <p class="st1">
          <a href="/auth/login"
            ><span class="pointColor">{{ $t('login') }}</span></a
          >
          {{ $t('or') }}
          <a href="javascript:go_join();"
            ><span class="pointColor">{{ $t('signup') }}</span></a
          >
          {{ $t('isrequired') }}
        </p>
      </div>
      <form id="frmOrderCancle">
        <input type="hidden" name="oriOrderNo" />
        <input type="hidden" name="cancleOrderQty" />
        <input type="hidden" name="simbol" :value="oriSimbol" />
        <input type="hidden" name="waysType" value="W" />
      </form>
      <div v-show="getUserLevel > 1" class="ex_table_type3 mCustomScrollbar">
        <!-- ex_table_type1 mCustomScrollbar -->
        <table>
          <colgroup>
            <col style="width: * %" />
            <col style="width: 11%" />
            <col style="width: 20%" />
            <col style="width: 16%" />
            <col style="width: 16%" />
            <col style="width: 13%" />
          </colgroup>
          <tbody>
            <tr>
              <th>{{ $t('orderdate') }}</th>
              <th>{{ $t('type') }}</th>
              <th class="tr">{{ $t('orderprice') }}</th>
              <th class="tr">{{ $t('orderamount') }}</th>
              <th class="tr">{{ $t('unfinishedamount') }}</th>
              <th>{{ $t('cancel') }}</th>
            </tr>
            <tr v-for="(mr, index) in matchingReady" :key="index">
              <td class="tc">
                <span class="st1">{{ mr.ordrTime }}</span>
              </td>
              <td class="tc" :class="{ red: mr.byslTp == 'B', blue: mr.byslTp == 'S' }">{{ mr.byslTp }}</td>
              <td>
                {{ mr.ordrPrc }}
                <p v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></p>
              </td>
              <td>{{ mr.ordrQty }}</td>
              <td>{{ mr.remnQty }}</td>
              <td class="tc">
                <a style="cursor: pointer" class="ex_table_btn1" @click="orderCancle(mr.ordrNo, mr.remnQty)">{{ $t('cancel') }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- // ex_table_type1 mCustomScrollbar -->
    </div>
    <!-- // con9 -->
  </div>
  <!-- // exchange2_Left_bottom -->
</template>
<script>
import { mapGetters } from 'vuex'
import { coinInfo } from '~/api/coin'
import { repUnComma, repComma } from '~/plugins/util'
export default {
  name: 'TransactionHist',
  data() {
    return {
      tab: '1',
      market: 'KRW',
      matchingList: [
        {
          instCd: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getSessionId', 'getUserLevel', 'getSymbolMarket'])
  },
  created() {
    this.getCoinInfo()
  },
  mounted() {
    if (this.tab === '1') {
      const { am4core, am4charts } = this.$am4core()
      const chart = am4core.create('depth_chart', am4charts.XYChart)
      chart.dataSource.url = 'http://localhost:8080/exchange/coinInfo'
      chart.dataSource.reloadFrequency = 30000
      chart.dataSource.adapter.add('parsedData', function (data) {
        // Function to process (sort and calculate cummulative volume)
        function processData(list, type, desc) {
          const inputData = []
          // Convert to data points
          for (let i = 0; i < list.length; i++) {
            inputData[i] = {
              price: Number(repUnComma(list[i].price)),
              qty: Number(repUnComma(list[i].qty))
            }
          }

          // Sort list just in case
          inputData.sort(function (a, b) {
            if (!desc) {
              if (a.price > b.price && b.price === 0) {
                return -1
              }
              if (a.price < b.price && a.price === 0) {
                return 1
              }
            }
            if (a.price > b.price) {
              return 1
            } else if (a.price < b.price) {
              return -1
            } else {
              return 0
            }
          })

          // Calculate cummulative volume
          if (desc) {
            for (let i = inputData.length - 1; i >= 0; i--) {
              if (i < inputData.length - 1) {
                inputData[i].totalvolume = inputData[i + 1].totalvolume + inputData[i].qty
              } else {
                inputData[i].totalvolume = inputData[i].qty
              }
              const dp = {}
              dp.value = repComma(inputData[i].price)
              dp[type + 'volume'] = inputData[i].qty
              dp[type + 'totalvolume'] = inputData[i].totalvolume
              chartData.unshift(dp)
            }
          } else {
            for (let i = 0; i < inputData.length; i++) {
              if (i > 0) {
                inputData[i].totalvolume = inputData[i - 1].totalvolume + inputData[i].qty
              } else {
                inputData[i].totalvolume = inputData[i].qty
              }
              const dp = {}
              dp.value = repComma(inputData[i].price)
              dp[type + 'volume'] = inputData[i].qty
              dp[type + 'totalvolume'] = inputData[i].totalvolume
              chartData.push(dp)
            }
          }
        }

        // Init
        const chartData = []
        processData(data.coinInfo.bidInfoList, 'bids', true)
        processData(data.coinInfo.askInfoList, 'asks', false)

        return chartData
      })

      // Set up precision for numbers
      chart.numberFormatter.numberFormat = '#,###.####'

      // Create axes
      const xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      xAxis.dataFields.category = 'value'
      // xAxis.renderer.grid.template.location = 0;
      xAxis.renderer.minGridDistance = 50
      xAxis.title.text = 'Price'

      const yAxis = chart.yAxes.push(new am4charts.ValueAxis())
      yAxis.title.text = 'Volume'

      // Create series
      const series = chart.series.push(new am4charts.StepLineSeries())
      series.dataFields.categoryX = 'value'
      series.dataFields.valueY = 'bidstotalvolume'
      series.strokeWidth = 2
      series.stroke = am4core.color('#0f0')
      series.fill = series.stroke
      series.fillOpacity = 0.1
      series.tooltipText = '매수: [bold]{categoryX}[/]\n수량: [bold]{valueY}[/]\n누적량: [bold]{bidsvolume}[/]'

      const series2 = chart.series.push(new am4charts.StepLineSeries())
      series2.dataFields.categoryX = 'value'
      series2.dataFields.valueY = 'askstotalvolume'
      series2.strokeWidth = 2
      series2.stroke = am4core.color('#f00')
      series2.fill = series2.stroke
      series2.fillOpacity = 0.1
      series2.tooltipText = '매도: [bold]{categoryX}[/]\n수량: [bold]{valueY}[/]\n누적량: [bold]{asksvolume}[/]'

      const series3 = chart.series.push(new am4charts.ColumnSeries())
      series3.dataFields.categoryX = 'value'
      series3.dataFields.valueY = 'bidsvolume'
      series3.strokeWidth = 0
      series3.fill = am4core.color('#000')
      series3.fillOpacity = 0.2

      const series4 = chart.series.push(new am4charts.ColumnSeries())
      series4.dataFields.categoryX = 'value'
      series4.dataFields.valueY = 'asksvolume'
      series4.strokeWidth = 0
      series4.fill = am4core.color('#000')
      series4.fillOpacity = 0.2

      // Add cursor
      chart.cursor = new am4charts.XYCursor()
    }
  },
  methods: {
    tabChange(tab) {
      const vm = this
      vm.tab = tab
    },
    getCoinInfo() {
      const vm = this
      coinInfo(vm.getSymbolMarket).then(res => {
        vm.coinInfo = res.data.coinInfo
        vm.askInfoList = vm.coinInfo.askInfoList
        vm.bidInfoList = vm.coinInfo.bidInfoList
      })
    }
  }
}
</script>
