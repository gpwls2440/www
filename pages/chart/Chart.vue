<template>
  <div id="left_section">
    <!-- left_section -->
    <div class="live_graph">
      <!-- live_graph -->
      <div id="CoinInfoCtrl" class="chart_top">
        <div style="float: left">
          <span style="margin-left: 20px" class="wc_area_btn"> <span class="st1 white">{/ coinName /}</span> <span class="st2">{/ simbol /}/{/ market /} </span> </span>
        </div>
        <div class="topInfo">
          <span class="topSpan">
            <span class="white" ng-class="{'red' :  coinInfo.updnSign == '1', 'blue' :  coinInfo.updnSign == '-1'}">{/ coinInfo.lastPrice | toFix:this /}</span> <span>{/ market /}</span>
            <span v-if="market != 'KRW'">
              (<span class="white" ng-class="{'red' :  coinInfo.updnSign == '1', 'blue' :  coinInfo.updnSign == '-1'}"> {/ basicPrice | calcPrice:coinInfo.lastPrice /}</span> <span>KRW</span>)
            </span>
          </span>
          <span class="topSpan minWidth1">
            <span class="sec2 white" ng-class="{'red' :  coinInfo.updnSign == '1', 'blue' :  coinInfo.updnSign == '-1'}">{/ coinInfo.updnPrice | toFix:this /}</span>
            (<span class="sec2 white" ng-class="{'red' :  coinInfo.updnSign == '1', 'blue' :  coinInfo.updnSign == '-1'}">{/ coinInfo.updnRate | toFixPer /}% </span>)
          </span>
          <span class="topSpan minWidth">
            <span class="sec1">{{ $t('high') }}</span> <span class="sec2 red">{/ coinInfo.highPrice | toFix:this /} </span> <span class="sec1">{{ $t('low') }}</span>
            <span class="sec2 blue">{/ coinInfo.lowPrice | toFix:this /} </span>
          </span>
          <span class="topSpan">
            <span class="sec3">{{ $t('volume') }}</span>
            <span class="sec4 white"> {/ coinInfo.totalVol /} </span>
            <span class="n1">{/ coinInfo.simbol | cutSimbol /}</span>
          </span>
        </div>
        <div class="wc_area mCustomScrollbar">
          <ul>
            <li v-for="coin in coinInfoList" :key="coin" class="isCoinSelectBtn" @click="loadData(coin.simbol, coin.market)">
              {/coin.coinName/}
              <span>({/ coin.simbol | cutSimbol /}/{/ coin.market /})</span>
            </li>
          </ul>
        </div>
      </div>
      <div id="chart" style="height: 912px">
        <span style="color: #fff; font-size: 30px">차트</span>
      </div>
    </div>
    <!-- // live_graph -->
  </div>
  <!-- // left_section -->
</template>

<script>
export default {
  name: 'Chart',
  data() {
    return {}
  }
}
</script>
