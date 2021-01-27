<template>
  <div class="exchange_Right">
    <!-- exchange_Right -->
    <no-ssr>
      <div class="top_area">
        <p class="tit">
          <span class="b1"><img :src="require(`~/assets/images/coin/${symbol}.png`)" :alt="symbol" style="width: 32px" /></span>
          <a class="w_area_btn" @mouseover="classActived = true">
            <span class="st1">{{ coinName }}</span> <span class="st2">{{ symbol }}/{{ market }} </span>
            <span class="b2"><img src="~/assets/images/arr_btn.png" alt="" /></span>
          </a>
        </p>
        <div class="w_area mCustomScrollbar" :class="{ active: classActived }" @mouseover="classActived = true" @mouseout="classActived = false">
          <ul>
            <li v-for="(coin, index) in coinInfoList" :key="index" class="isCoinSelectBtn">
              <a :title="coin.coinName" @click="loadData(coin.symbol, coin.market)"
                >{{ coin.coinName }}
                <span>({{ coin.symbol }}/{{ coin.market }})</span>
              </a>
            </li>
          </ul>
        </div>
        <a href="javascript://" class="slideup_btn1"><img src="~/assets/images/ex_btn_off.gif" alt="" /></a>
      </div>
      <div class="top_value">
        <!-- top_value -->
        <p id="openPrice" class="st1" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }">
          {{ coinInfo.lastPrice }} <span>{{ market }}</span>
          <span v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></span>
        </p>
        <p class="st2">
          <span class="sec1">{{ $t('24hrchange') }}</span>
          <span class="sec2" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }">{{ coinInfo.updnRate }}% &nbsp; </span>
          <span class="sec2" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }"
            ><font v-if="coinInfo.updnSign == '1'" color="red">▲&nbsp;</font><font v-if="coinInfo.updnSign == '-1'" color="blue">▼&nbsp;</font>{{ coinInfo.updnPrice }}</span
          >
          <span v-if="market != 'KRW'" class="sec2 won_price1" :class="{ red: coinInfo.updnSign == '1', blue: coinInfo.updnSign == '-1' }"
            ><font v-if="coinInfo.updnSign == '1'" color="red">▲&nbsp;</font><font v-if="coinInfo.updnSign == '-1'" color="blue">▼&nbsp;</font>{{ coinInfo.updnPrice }} <span>KRW</span></span
          >
        </p>

        <div class="top_right">
          <!-- top_right -->
          <ul>
            <li style="float: left">
              <span class="sec1">{{ $t('high') }}</span> <span class="sec2 red">{{ coinInfo.highPrice }} </span>
              <span v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></span>
            </li>
            <li style="float: right">
              <span class="sec3" style="width: 160px">{{ $t('volume') }}({{ $t('lately24h') }})</span>
              <span class="sec4"
                >{{ coinInfo.totalVol }} <span class="n1">{{ coinInfo.symbol }}</span></span
              >
            </li>
          </ul>
          <ul>
            <li style="float: left">
              <span class="sec1">{{ $t('low') }}</span> <span class="sec2 blue">{{ coinInfo.lowPrice }} </span>
              <span v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></span>
            </li>
            <li style="float: right">
              <span class="sec3" style="width: 160px">{{ $t('total') }}</span>
              <span class="sec4"
                >{{ coinInfo.totalAmount }} <span class="n1">{{ market }}</span></span
              >
            </li>
          </ul>
        </div>
        <!-- // top_right -->
      </div>
      <!-- // top_value -->
      <div class="slideup_con1">
        <!-- slideup_con -->
        <div id="chart" class="exchange_Right_graph"></div>
        <div id="chartMask" class="chartMask"></div>
      </div>
      <!-- // slideup_con -->
    </no-ssr>
  </div>
  <!-- exchange_Right -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import { widget as Widget } from '../../public/lib/tv/charting_library/charting_library.min.js'
import { coinList, coinInfo } from '~/api/coin'
// import DataFeed from '~/api/datafeed'

export default {
  name: 'Chart',
  data() {
    return {
      coinName: '',
      symbol: 'BTC',
      market: '',
      coinInfoList: [],
      coinInfo: {},
      basicPrice: '',
      datafeedUrl: {
        default: 'https://demo_feed.tradingview.com',
        type: String
      },
      tvWidget: '',
      classActived: false
    }
  },
  computed: {
    ...mapGetters(['getSymbolMarket'])
  },
  watch: {
    getSymbolMarket() {
      this.getCoinInfo()
    }
  },
  /*
  async mounted() {
    this.getCoinList()
    this.getCoinInfo()
    const { widget } = await import('../../static/lib/tv/charting_library/charting_library.min.js') // <-- Import asynchronously
    const widgetOptions = {
      fullscreen: false,
      symbol: 'BTC_KRW',
      interval: 'D',
      container_id: 'chart',
      datafeed: DataFeed,
      library_path: '/static/lib/tv/charting_library/',
      locale: 'ko',
      width: '100%',
      height: '463',
      timeframe: '1M',
      loading_screen: { backgroundColor: '#ffffff' },
      timezone: 'Asia/Seoul',
      enabled_features: [
        'volume_force_overlay',
        'header_saveload',
        'header_symbol_search',
        'left_toolbar',
        'header_compare',
        'use_localstorage_for_settings',
        'symbol_search_hot_key',
        'show_hide_button_in_legend',
        'symbol_info'
      ],
      drawings_access: {
        type: 'black',
        tools: [{ name: 'Regression Trend' }]
      },
      disabled_features: [
        'volume_force_overlay',
        'header_undo_redo',
        'header_symbol_search',
        'symbol_search_hot_key',
        'go_to_date',
        'header_compare',
        'header_screenshot',
        'header_fullscreen_button',
        'context_menus',
        'header_settings',
        'compare_symbol',
        'timeframes_toolbar',
        'left_toolbar'
      ],
      overrides: {
        'mainSeriesProperties.candleStyle': {
          upColor: '#FF0000',
          downColor: '#1155CC',
          drawWick: true,
          drawBorder: true,
          borderColor: '#378658',
          borderUpColor: '#FF0000',
          borderDownColor: '#1155CC',
          wickUpColor: '#FF0000',
          wickDownColor: '#1155CC',
          wickColor: '#737375',
          barColorsOnPrevClose: false
        },
        'mainSeriesProperties.hollowCandleStyle': {
          upColor: '#FF0000',
          downColor: '#1155CC',
          drawWick: true,
          drawBorder: true,
          borderColor: '#378658',
          borderUpColor: '#FF0000',
          borderDownColor: '#1155CC',
          wickUpColor: '#FF0000',
          wickDownColor: '#1155CC',
          wickColor: '#737375'
        },
        'study_Overlay@tv-basicstudies.style': 2,
        'study_Overlay@tv-basicstudies.lineStyle.color': '#FF0000',
        'paneProperties.background': '#FFFFFF',
        'paneProperties.vertGridProperties.color': '#dddddd',
        'paneProperties.horzGridProperties.color': '#dddddd',
        'symbolWatermarkProperties.transparency': 0,
        'scalesProperties.textColor': '#333333',
        'mainSeriesProperties.haStyle.upColor': '#FF0000',
        'mainSeriesProperties.haStyle.downColor': '#1155CC',
        'mainSeriesProperties.haStyle.drawWick': true,
        'mainSeriesProperties.haStyle.drawBorder': true,
        'mainSeriesProperties.haStyle.borderColor': '#378658',
        'mainSeriesProperties.haStyle.borderUpColor': '#FF0000',
        'mainSeriesProperties.haStyle.borderDownColor': '#1155CC',
        'mainSeriesProperties.haStyle.wickColor': '#737375',
        'mainSeriesProperties.haStyle.barColorsOnPrevClose': false,
        'mainSeriesProperties.barStyle.upColor': '#FF0000',
        'mainSeriesProperties.barStyle.downColor': '#1155CC',
        'mainSeriesProperties.barStyle.barColorsOnPrevClose': false,
        'mainSeriesProperties.barStyle.dontDrawOpen': false,
        'mainSeriesProperties.areaStyle.color1': '#FF0000',
        'mainSeriesProperties.areaStyle.color2': '#1155CC',
        'mainSeriesProperties.areaStyle.linecolor': '#0094FF',
        'mainSeriesProperties.areaStyle.linewidth': 1,
        'mainSeriesProperties.areaStyle.priceSource': 'close'
      },
      // volume 색상 설정
      studies_overrides: {
        'Moving Average.plot.color': '#bf9000',
        'volume.volume.plottype': 'columns',
        'volume.volume.color.0': '#1155CC',
        'volume.volume.color.1': '#FF0000',
        'volume.volume.transparency': 50,
        'volume.volume ma.plottype': 'line',
        'volume.volume ma.color': '#4dc94d',
        'volume.volume ma.transparency': 50,
        'volume.volume ma.linewidth': 2,
        'volume.show ma': true
      },
      custom_css_url: '/lib/tv/tradingview.css',
      debug: false,
      time_frames: [
        { text: '1y', resolution: 'W', description: '1 Years' },
        { text: '6m', resolution: 'D', description: '6 Month' },
        { text: '3m', resolution: '720', description: '3 Month' },
        { text: '1m', resolution: '360', description: '1 Month' },
        { text: '7d', resolution: '60', description: '7 Days' },
        { text: '3d', resolution: '30', description: '3 Days' },
        { text: '1d', resolution: '15', description: '1 Day' },
        { text: '6h', resolution: '5', description: '6 Hours' },
        { text: '1h', resolution: '1', description: '1 Hour' }
      ],

      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      user_id: 'A0000001' + 'white',
      load_last_chart: false
    }

    // eslint-disable-next-line new-cap
    const tvWidget = new widget(widgetOptions)
    this.tvWidget = tvWidget

    tvWidget.onChartReady(() => {
      tvWidget.chart().executeActionById('drawingToolbarAction') // hides or shows the drawing toolbar
      $('#chart_container iframe').contents().find('.js-rootresizer__contents').css('opacity', 1)
      tvWidget.chart().createStudy('Moving Average', false, false, [15], null, {
        'Plot.color': '#bf9000',
        'Plot.linewidth': 2
      })
      tvWidget.chart().createStudy('Moving Average', false, false, [60], null, {
        'Plot.color': '#45818e',
        'Plot.linewidth': 2
      })
      tvWidget
        .chart()
        .onIntervalChanged()
        .subscribe({}, function (chgInterval, obj) {
          // Datafeed.resetLastDate()
          tvWidget.chart().executeActionById('timeScaleReset')
        })
    })
  },
  */
  mounted() {
    this.getCoinList()
    this.getCoinInfo()
  },
  methods: {
    ...mapActions(['setSymbolMarketFunc']),
    getCoinList() {
      const vm = this
      coinList().then(res => {
        vm.coinInfoList = res.data
      })
    },
    getCoinInfo() {
      const vm = this
      coinInfo(vm.getSymbolMarket).then(res => {
        vm.coinInfo = res.data.coinInfo
        vm.coinName = res.data.coinName
        vm.market = res.data.market
        vm.symbol = res.data.symbol
      })
    },
    loadData(symbol, market) {
      this.setSymbolMarketFunc(symbol + '_' + market)
    }
  }
}
</script>
