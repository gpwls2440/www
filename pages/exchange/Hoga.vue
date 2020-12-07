<template>
  <div id="OrderListCtrl" class="exchange2_Right">
    <!-- exchange2_Right -->
    <div class="exchange2_Right_top">
      {{ $t('orders') }}
      <a href="javascript://" class="slideup_btn3"><img src="/assets/img/ex_btn_off.gif" alt="" /></a>
    </div>

    <div class="slideup_con3">
      <div class="ex_table_type5">
        <!-- ex_table_type1 mCustomScrollbar -->

        <table style="border-collapse: separate">
          <colgroup>
            <col style="width: 21%" />
            <col style="width: 22%" />
            <col style="width: 18%" />
            <col style="width: * %" />
          </colgroup>
          <tbody>
            <tr v-for="ask in coinInfo.askInfoList" :key="ask">
              <td class="tr pricetd" @click="setPrice(ask.price)">
                <span class="price"><span ng-show="ask.myOrder > 0">({/ ask.myOrder /}) </span> {/ ask.qty /}</span>
                <span class="gauge"><span class="num" ng-style="{'width':'{/ ask.percent /}%'}"></span></span>
              </td>
              <td class="bg1" :class="{ line2: market != 'KRW', border_l: ask.price == coinInfo.lastPrice }" @click="setPrice(ask.price)">
                <span :class="{ red: ask.pricePer > 0, blue: ask.pricePer < 0 }">{/ ask.price | toFix:this /}</span>
                <p v-if="market != 'KRW'" class="won_price small">{/ basicPrice | calcPrice:ask.price /}<span>KRW</span></p>
              </td>
              <td class="bg1" :class="{ border_r: ask.price == coinInfo.lastPrice }" @click="setPrice(ask.price)">
                <span :class="{ red: ask.pricePer > 0, blue: ask.pricePer < 0 }">{/ ask.pricePer | toFixPer /}%</span>
              </td>
              <td rowspan="{/coinInfo.askInfoList.length/}" data-ng-show="$first">
                <div class="row_pop" style="top: 5px">
                  <!-- row_pop -->
                  <div class="row_l">
                    <div class="left">{{ $t('volume') }}</div>
                    <div class="right">{/ coinInfo.totalVol /} {/ coinInfo.simbol | cutSymbol /}</div>
                    <div class="left">{{ $t('total') }}</div>
                    <div class="right">
                      {/ coinInfo.totalAmount | toFix:this /} {/ market /}
                      <p class="gray">({{ $t('lately24h') }})</p>
                    </div>
                  </div>

                  <div class="row_l">
                    <div class="left">{{ $t('52whigh') }}</div>
                    <div class="right">
                      <span class="red">{/ coinInfo.highestPrice | toFix:this /}</span>
                      <p v-if="market != 'KRW'" class="won_price">{/ basicPrice | calcPrice:coinInfo.highestPrice /}<span>KRW</span></p>
                      <p class="gray">({/ coinInfo.highestDate | dateText /})</p>
                    </div>
                  </div>
                  <div class="row_l">
                    <div class="left">{{ $t('52wlow') }}</div>
                    <div class="right">
                      <span class="blue">{/ coinInfo.lowestPrice | toFix:this /}</span>
                      <p v-if="market != 'KRW'" class="won_price">{/ basicPrice | calcPrice:coinInfo.lowestPrice /}<span>KRW</span></p>
                      <p class="gray">({/ coinInfo.lowestDate | dateText /})</p>
                    </div>
                  </div>

                  <div class="row_l">
                    <div class="left">{{ $t('closingprice') }}</div>
                    <div class="right">
                      <span class="black">{/ coinInfo.openPrice | toFix:this /}</span>
                      <p v-if="market != 'KRW'" class="won_price">{/ basicPrice | calcPrice:coinInfo.openPrice /}<span>KRW</span></p>
                    </div>
                  </div>
                  <div class="row_l">
                    <div class="left">{{ $t('todayhigh') }}</div>
                    <div class="right">
                      <span class="red">{/ coinInfo.highPrice | toFix:this /}</span>
                      <p v-if="market != 'KRW'" class="won_price">{/ basicPrice | calcPrice:coinInfo.highPrice /}<span>KRW</span></p>
                      <p class="red">{/ coinInfo.highPricePer | toFixPer /}%</p>
                    </div>
                  </div>
                  <div class="row_l" style="border-bottom: 0">
                    <div class="left">{{ $t('todaylow') }}</div>
                    <div class="right">
                      <span class="blue">{/ coinInfo.lowPrice | toFix:this /}</span>
                      <p v-if="market != 'KRW'" class="won_price">{/ basicPrice | calcPrice:coinInfo.lowPrice /}<span>KRW</span></p>
                      <p class="blue">{/ coinInfo.lowPricePer | toFixPer /}%</p>
                    </div>
                  </div>
                </div>
                <!-- // row_pop -->
              </td>
            </tr>

            <tr v-for="bid in coinInfo.bidInfoList" :key="bid">
              <td class="empty"></td>
              <td class="bg2" :class="{ line2: market != 'KRW', border_l: bid.price == coinInfo.lastPrice }" @click="setPrice(bid.price)">
                <span :class="{ red: bid.pricePer > 0, blue: bid.pricePer < 0 }">{/ bid.price | toFix:this /}</span>
                <p v-if="market != 'KRW'" class="won_price small">{/ basicPrice | calcPrice:bid.price /}<span>KRW</span></p>
              </td>
              <td class="bg2" :class="{ border_r: bid.price == coinInfo.lastPrice }" @click="setPrice(bid.price)">
                <span :class="{ red: bid.pricePer > 0, blue: bid.pricePer < 0 }">{/ bid.pricePer | toFixPer /}%</span>
              </td>
              <td class="tl pricetd" @click="setPrice(bid.price)">
                <span class="price">{/ bid.qty /}<span ng-show="bid.myOrder > 0"> ({/ bid.myOrder /})</span></span>
                <span class="gauge"><span class="num2" ng-style="{'width':'{/ bid.percent /}%'}"></span></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- exchange2_Right -->
</template>
<script>
export default {
  name: 'TransacionHist',
  data() {
    return {
      coinInfo: {
        askInfoList: []
      }
    }
  }
}
</script>
