<template>
  <div class="left_area">
    <!-- left_area -->
    <div class="left_top" @click="onBlock('')">
      <p class="st1">{{ $t('totalassets') }}</p>
      <p class="st2">
        ￦<span>{{ totalQty.dpoAmt }}</span>
      </p>
      <p v-show="totalQty.dpoPdngAmt != 0" class="st3" :class="{ red: totalQty.dpoPdngAmt > 0, blue: totalQty.dpoPdngAmt < 0 }">
        (<span>{{ totalQty.dpoPdngAmt }}</span
        >)
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
            v-for="coins in walletList | orderBy:['order','symbol'] | filter:viewItem "
            :class="{ active: coins.symbol == curSymbol.symbol, token: coins.coinType == '2' }"
          >
          -->
          <li v-for="(coins, index) in walletList" v-show="tokenViewFlag || coins.coinType != '2'" :key="index" :class="{ active: coins.symbol == curSymbol.symbol, token: coins.coinType == '2' }">
            <a href="javascript:void(0);" @click="onBlock(coins.symbol, coins.coinType)">
              <span class="st1">
                <img :src="`/assets/images/coin/${coins.symbol}.png`" :alt="`${coins.symbol}`" />
                <span class="ml5">{{ coins.symbolName }}</span
                ><span class="gray">({{ coins.symbol }})</span>
              </span>
              <span class="st2">
                <span class="ml5" decimals="8">{{ coins.dpoQty }}</span>
              </span>
              <span v-show="coins.symbol != 'KRW'" class="st2 won_price">
                <span>{{ coins.dpoQty }}</span>
                <span>KRW</span>
              </span>
            </a>
            <a v-if="coins.symbol == 'ETH' && tokenCount > 0 && tokenViewFlag" href="javascript:void(0);" @click="onTokenView()">
              <span :title="$t('tokenclose')" class="tokenView"><img src="~/assets/images/btn_on.png" /></span
            ></a>
            <a v-if="coins.symbol == 'ETH' && tokenCount > 0 && !tokenViewFlag" href="javascript:void(0);" @click="onTokenView()">
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
        dpoPdngAmt: '1000',
        dpoAmt: '1,000'
      },
      viewMode: '0',
      tokenViewFlag: '1',
      walletList: [
        {
          coinType: '2',
          symbol: 'KRW',
          symbolName: '원화',
          dpoQty: '0.00'
        },
        {
          coinType: '2',
          symbol: 'BTC',
          symbolName: '비트코인',
          dpoQty: '0'
        },
        {
          coinType: '2',
          symbol: 'ETH',
          symbolName: '이더리움',
          dpoQty: '0'
        },
        {
          coinType: '2',
          symbol: 'LTC',
          symbolName: '라이트코인',
          dpoQty: '0'
        }
      ],
      curSymbol: {
        symbol: '',
        name: '',
        dpoQty: 0,
        ableQty: 0,
        dpoPdngQty: 0,
        dpoAmt: 0,
        shortMnthQty: 0,
        lastPrice: 0,
        color: '',
        addr: '',
        point: 0,
        tokenType: 1,
        KDAblockQty: 0,
        KdaPointQty: 0
      },
      tokenCount: ''
    }
  },
  methods: {
    setMode() {
      this.viewMode = '1'
    }
  }
}
</script>
