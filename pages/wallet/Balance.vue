<template>
  <div class="left_area" ng-controller="WalletListCtrl">
    <!-- left_area -->
    <div class="left_top" @click="onBlock('')">
      <p class="st1">{{ $t('totalassets') }}</p>
      <p class="st2">￦<span count-up start-val="0" decimals="0" end-val="totalQty.dpoAmt"></span></p>
      <p v-show="totalQty.dpoPdngAmt != 0" class="st3" :class="{ red: totalQty.dpoPdngAmt > 0, blue: totalQty.dpoPdngAmt < 0 }">
        (<span count-up start-val="0" decimals="0" end-val="totalQty.dpoPdngAmt"></span>)
      </p>
    </div>
    <span class="small_btn ableCoin" :class="{ on: viewMode == 1 }" @click="setMode()">
      {{ $t('retainedcoin') }}
    </span>
    <div style="height: 560px; overflow: auto">
      <div class="bk_list">
        <!-- bk_list -->
        <ul class="">
          <!--
          <li
            v-show="tokenViewFlag || coins.coinType != '2'"
            v-for="coins in walletList | orderBy:['order','simbol'] | filter:viewItem "
            :class="{ active: coins.simbol == curSymbol.symbol, token: coins.coinType == '2' }"
          >
          -->
          <li v-for="coins in walletList" v-show="tokenViewFlag || coins.coinType != '2'" :key="coins" :class="{ active: coins.simbol == curSymbol.symbol, token: coins.coinType == '2' }">
            <a href="javascript:void(0);" @click="onBlock(coins.simbol, coins.coinType)">
              <span class="st1">
                <img ng-src="~/assets/images/coin/{/ coins.simbol /}.png" alt="{/ coins.simbol /}" />
                <span class="ml5">{/ coins.simbolName /}</span><span class="gray">({/ coins.simbol /})</span>
              </span>
              <span class="st2">
                <span
                  v-show="coins.simbol != 'KRW' && coins.simbol != 'KDP' && coins.simbol != 'KDMP' && coins.dpoQty != 0"
                  class="ml5"
                  count-up
                  start-val="0"
                  decimals="8"
                  end-val="coins.dpoQty"
                ></span>
                <span
                  v-show="coins.simbol != 'KRW' && coins.simbol != 'KDP' && coins.simbol != 'KDMP' && coins.dpoQty == 0"
                  class="ml5"
                  count-up
                  start-val="0"
                  decimals="0"
                  end-val="coins.dpoQty"
                ></span>
                ></span
              >
              <span v-show="coins.simbol == 'KRW' || coins.simbol == 'KDP'" count-up start-val="0" decimals="2" end-val="coins.dpoQty"></span>

              <span v-show="coins.simbol == 'KDMP'" count-up start-val="0" decimals="0" end-val="coins.dpoQty"></span>
              <span v-show="coins.dpoPdngQty != 0 && coins.coinType != '2'" :class="{ red: coins.dpoPdngQty > 0, blue: coins.dpoPdngQty < 0 }">
                (<span v-show="coins.simbol != 'KRW' && coins.simbol != 'KDP'" count-up start-val="0" decimals="8" end-val="coins.dpoPdngQty"></span>)
              </span>
              <span v-show="coins.simbol != 'KRW' && coins.simbol != 'KDMP' && coins.coinType != '2'" class="st2 won_price">
                <!--span count-upprice decimals="0" start-val="0" end-val="coins.dpoQty" filter-val="coins.lastPrice"></span-->
                <span>{/ coins.dpoQty | calcPrice:coins.lastPrice /}</span>
                <span>KRW</span>
              </span>
            </a>
            <a v-if="coins.simbol == 'ETH' && tokenCount > 0 && tokenViewFlag" href="javascript:void(0);" @click="onTokenView()">
              <span :title="$t('tokenclose')" class="tokenView"><img src="~/assets/images/btn_on.png" /></span
            ></a>
            <a v-if="coins.simbol == 'ETH' && tokenCount > 0 && !tokenViewFlag" href="javascript:void(0);" @click="onTokenView()">
              <span :title="$t('tokenopen')" class="tokenView"><img src="~/assets/images/btn_off.png" /></span>
            </a>
          </li>
        </ul>
      </div>
      <!-- // bk_list -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'Balance',
  data() {
    return {
      totalQty: {
        dpoPdngAmt: ''
      }
    }
  }
}
</script>
