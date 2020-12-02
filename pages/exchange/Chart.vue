<template>
  <div class="exchange_Right">
    <!-- exchange_Right -->

    <div class="top_area">
      <p class="tit">
        <span class="b1"><img ng-src="/assets/img/coin/{/ simbol /}.png" alt="{/ simbol /}" style="width: 32px" /></span>
        <a href="javascript://" class="w_area_btn">
          <span class="st1">{/ coinName /}</span> <span class="st2">{/ simbol /}/{/ market /} </span>
          <span class="b2"><img src="/assets/img/arr_btn.png" alt="" /></span>
        </a>
      </p>
      <div class="w_area mCustomScrollbar">
        <ul>
          <li class="isCoinSelectBtn" ng-repeat="coin in coinInfoList | orderBy : ['order']">
            <!--<li class="isCoinSelectBtn" ng-repeat="coin in coinInfoList | orderBy : ['market', 'order'] |  filter:notKrwList">-->
            <!--<li class="isCoinSelectBtn" ng-repeat="coin in coinInfoList | orderBy : ['order'] | filter:notKDAList ">-->
            <a ng-click="loadData(coin.simbol,coin.market)" title="{/ coin.coinName /}"
              >{/coin.coinName/}
              <span>({/ coin.simbol | cutSimbol /}/{/ coin.market /})</span>
            </a>
          </li>
        </ul>
      </div>
      <a href="javascript://" class="slideup_btn1"><img src="/assets/img/ex_btn_off.gif" alt="" /></a>
    </div>
    <div class="top_value">
      <!-- top_value -->
      <p id="openPrice" class="st1" ng-class="{'red' :  coinInfo.updnSign == '1', 'blue' :  coinInfo.updnSign == '-1'}">
        {/ coinInfo.lastPrice | toFix:this /} <span>{/ market /}</span>
        <span class="won_price" ng-if="market != 'KRW'">{/ basicPrice | calcPrice:coinInfo.lastPrice /}<span>KRW</span></span>
      </p>
      <p class="st2">
        <span class="sec1">{{ $t('24hrchange') }}</span>
        <span class="sec2" ng-class="{'red' :  coinInfo.updnSign == '1', 'blue' :  coinInfo.updnSign == '-1'}">{/ coinInfo.updnRate | toFixPer /}% &nbsp; </span>
        <span class="sec2" ng-class="{'red' :  coinInfo.updnSign == '1', 'blue' :  coinInfo.updnSign == '-1'}"
          ><font ng-if="coinInfo.updnSign == '1'" color="red">▲&nbsp;</font><font ng-if="coinInfo.updnSign == '-1'" color="blue">▼&nbsp;</font>{/ coinInfo.updnPrice | toFix:this /}</span
        >
        <span class="sec2 won_price1" ng-if="market != 'KRW'" ng-class="{'red' :  coinInfo.updnSign == '1', 'blue' :  coinInfo.updnSign == '-1'}"
          ><font ng-if="coinInfo.updnSign == '1'" color="red">▲&nbsp;</font><font ng-if="coinInfo.updnSign == '-1'" color="blue">▼&nbsp;</font>{/ coinInfo.updnPrice | calcPrice:basicPrice /}
          <span>KRW</span></span
        >
      </p>

      <div class="top_right">
        <!-- top_right -->
        <ul>
          <li style="float: left">
            <span class="sec1">{{ $t('high') }}</span> <span class="sec2 red">{/ coinInfo.highPrice | toFix:this /} </span>
            <span class="won_price" ng-if="market != 'KRW'">{/ basicPrice | calcPrice:coinInfo.highPrice /}<span>KRW</span></span>
          </li>
          <li style="float: right">
            <span class="sec3" style="width: 160px">{{ $t('volume') }}({{ $t('lately24h') }})</span>
            <span class="sec4">{/ coinInfo.totalVol /} <span class="n1">{/ coinInfo.simbol | cutSimbol /}</span></span>
          </li>
        </ul>
        <ul>
          <li style="float: left">
            <span class="sec1">{{ $t('low') }}</span> <span class="sec2 blue">{/ coinInfo.lowPrice | toFix:this /} </span>
            <span class="won_price" ng-if="market != 'KRW'">{/ basicPrice | calcPrice:coinInfo.lowPrice /}<span>KRW</span></span>
          </li>
          <li style="float: right">
            <span class="sec3" style="width: 160px">{{ $t('total') }}</span> <span class="sec4">{/ coinInfo.totalAmount | toFix:this /} <span class="n1">{/ market /}</span></span>
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
  </div>
  <!-- exchange_Right -->
</template>
<script>
export default {
  name: 'CoinList',
  data() {
    return {}
  }
}
</script>
