<template>
  <div id="PriceEditCtrl" class="pop_layer">
    <div class="pop_size">
      <div class="pop_div" style="width: 740px; left: 20%">
        <!-- pop_div -->
        <div class="layer_top">
          <!-- layer_top -->
          {{ $t('averagepurchaseprice') }} {{ $t('modify') }}
        </div>
        <!-- // layer_top -->

        <div id="sendPopup" class="layer_con">
          <!-- layer_con -->
          <div class="deposit_area5" style="padding: 20px 0 20px 0; border-bottom: 0">
            <!-- deposit_area5 -->
            <!--
            <p class="st1"><img v-if="curSymbol.symbol != ''" :src="require(`~/assets/images/coin/${curSymbol.symbol}.png`)" alt="" /></p>
            -->
            <p class="st2">{{ $t('lastprice') }}</p>
            <p class="st3">￦ {{ curSymbol.lastPrice | toFixed | commaFilter }}</p>
          </div>
          <!-- // deposit_area5 -->
          <div class="inputBox">
            <table>
              <colgroup>
                <col style="width: 15%" />
                <col style="width: 35%" />
                <col style="width: 15%" />
                <col style="width: 35%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>{{ $t('quantityretained') }}</th>
                  <td>
                    <span class="qty">{{ curSymbol.openQty | toFixed8 | commaFilter }}</span>
                    <span class="symbol">{{ curSymbol.symbol }}</span>
                  </td>
                  <th>{{ $t('averagepurchaseprice') }}</th>
                  <td>
                    <span class="qty">
                      <input v-model="curSymbol.argPrice" type="text" />
                    </span>
                    <span class="symbol">KRW</span>
                  </td>
                </tr>
                <tr>
                  <th>{{ $t('evaluationamount') }}</th>
                  <td>
                    <span class="qty">{{ curSymbol.evalAmt | toFixed | commaFilter }}</span>
                    <span class="symbol">KRW</span>
                  </td>
                  <th>{{ $t('PurchasePrice') }}</th>
                  <td>
                    <span class="qty">{{ curSymbol.openAmt | toFixed | commaFilter }}</span>
                    <span class="symbol">KRW</span>
                  </td>
                </tr>
                <tr>
                  <th>{{ $t('profitorloss') }}</th>
                  <td>
                    <span class="qty" :class="{ red: curSymbol.evalPl > 0, blue: curSymbol.evalPl < 0 }">{{ curSymbol.evalPl | toFixed | commaFilter }}</span>
                    <span class="symbol">KRW</span>
                  </td>
                  <th>{{ $t('profitrate') }}</th>
                  <td>
                    <span class="qty" :class="{ red: curSymbol.evalPlRt > 0, blue: curSymbol.evalPlRt < 0 }">{{ curSymbol.evalPlRt | toFixed2 }}</span>
                    <span class="symbol">%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt20 tc">
            <a v-show="curSymbol.editFlag == 1" class="ex_btn_b2" style="margin-right: 5px" @click="reset()">{{ $t('reset') }}</a>
            <a v-show="curSymbol.editFlag == 0" class="ex_btn_b2" style="margin-right: 5px" @click="$emit('close')">{{ $t('close') }}</a>
            <a v-show="!curSymbol.modiFlag" style="margin-left: 5px" class="ex_btn_b1" @click="send()">{{ $t('modify') }}</a>
            <a v-show="curSymbol.modiFlag" class="ex_btn_b1" style="margin-left: 5px">{{ $t('check') }}</a>
          </p>
          <a class="layer_close2"><img src="~/assets/images/005/layer_close.gif" @click="$emit('close')" /></a>
        </div>
        <!-- // layer_con -->
        <a class="layer_close"><img src="~/assets/images/005/layer_close.gif" @click="$emit('close')" /></a>
      </div>
      <!-- // pop_div -->
    </div>
  </div>
</template>

<script>
import { repComma } from '~/plugins/util'
export default {
  name: 'AveragePriceEdit',
  // eslint-disable-next-line vue/require-prop-types
  props: ['ini'],
  data() {
    return {
      curSymbol: {
        argPrice: ''
      }
    }
  },
  mounted() {
    this.curSymbol = this.ini
    this.curSymbol.argPrice = repComma(Number(this.curSymbol.argPrice).toFixed(0))
  }
}
</script>
