<template>
  <div id="exchange4" class="exchange_Left">
    <!-- exchange_Left -->
    <div class="search">
      <input v-model="serchText" name="ex4Search" type="text" :placeholder="$t('SearchCoin')" value="" kr-input />
      <a id="goEx4Search" href="javascript://" class="search_btn"><img src="~/assets/images/search_btn.png" :alt="$t('search')" /></a>
    </div>
    <div id="tab_btn" class="ex_tab1">
      <ul>
        <li :class="{ active: curMarket == ' ' }">
          <a href="#con1" :title="$t('favorites')" @click="showMarket(' ')"> {{ $t('favorites') }}</a>
        </li>
        <li :class="{ active: curMarket == 'KRW' }"><a href="#con2" title="KRW" @click="showMarket('KRW')">KRW</a></li>
        <li :class="{ active: curMarket == 'BTC' }"><a href="#con3" :title="$t('BTC')" @click="showMarket('BTC')">BTC</a></li>
        <li :class="{ active: curMarket == 'ETH' }"><a href="#con4" :title="$t('ETH')" @click="showMarket('ETH')">ETH</a></li>
      </ul>
    </div>

    <div id="ex4Div2Tab1" class="tab_con ex_con1 on">
      <div class="ex_table_type2">
        <!-- ex_table_type2 -->
        <table>
          <colgroup>
            <col style="width: * %" />
            <col style="width: 30%" />
            <col style="width: 25%" />
          </colgroup>
          <tbody>
            <tr>
              <th class="tl" style="padding-left: 17px">
                <a class="btn_array" :class="{ on1: propertyName == 'coinName' && !reverse, on2: propertyName == 'coinName' && reverse }" @click="sortBy('coinName')">{{ $t('coinname') }}</a>
                <a class="btn_array" :class="{ on1: propertyName == 'volSort' && !reverse, on2: propertyName == 'volSort' && reverse }" style="margin-left: 7px" @click="sortBy('volSort')">{{
                  $t('volume')
                }}</a>
              </th>
              <th style="text-align: right; padding-right: 15px">
                <a class="btn_array" :class="{ on1: propertyName == 'lastPriceSort' && !reverse, on2: propertyName == 'lastPriceSort' && reverse }" @click="sortBy('lastPriceSort')">{{
                  $t('lastprice')
                }}</a>
              </th>
              <th>
                <a class="btn_array" :class="{ on1: propertyName == 'updnRate' && !reverse, on2: propertyName == 'updnRate' && reverse }" @click="sortBy('updnRate')">{{ $t('24hrchange') }}</a>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- // ex_table_type2 -->

      <div class="ex_table_type1 mCustomScrollbar">
        <!-- ex_table_type1 mCustomScrollbar -->
        <table id="ex4Div2Tab1" class="coinList">
          <colgroup>
            <col style="width: * %" />
            <col style="width: 29%" />
            <col style="width: 25%" />
          </colgroup>
          <tbody>
            <tr v-for="coin in coinInfoList" :key="coin" :class="{ active: coin.simbol == oriSimbol }" @click="loadData(coin.simbol, coin.market)">
              <td class="tl" style="padding-right: 0px">
                <p class="coinName-box">
                  <a id="fav_{/ coin.simbol /}" class="btn_onoff" :class="checkFav(coin.simbol)" title="{/ coin.coinName /}" @click="setFav(coin.simbol)">Favorite</a>
                  <span class="coinName">{/ coin.coinName /}</span>
                </p>
                <span class="f12">({/ coin.simbol | cutSymbol /}/{/ coin.market /})</span><br />
                <span class="f12">Vol {/ coin.totalVol /}</span>
              </td>
              <td class="pdw" :class="{ f_red: coin.updnSign == '1', f_blue: coin.updnSign == '-1' }">
                {/ coin.lastPrice | toFixMarket:coin.market:coin.lastPrice /}
                <p class="won_price" ng-if="coin.market != 'KRW'">{/ coin.basicPrice | calcPrice:coin.lastPrice /}<span>KRW</span></p>
              </td>
              <td :class="{ f_red: coin.updnSign == '1', f_blue: coin.updnSign == '-1' }">{/ coin.updnRate | toFixPer /} %</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- // ex_table_type1 mCustomScrollbar -->
    </div>
  </div>
  <!-- exchange_Left -->
</template>
<script>
export default {
  name: 'CoinSise',
  data() {
    return {}
  }
}
</script>
