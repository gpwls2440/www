<template>
  <div id="tab_btn2" class="ex_tab2">
    <ul id="tab_btn2_ul">
      <li :class="{ active: tab == '1' }">
        <a @click="tabChange('1')">{{ $t('designatedamount') }}</a>
      </li>
      <li :class="{ active: tab == '2' }">
        <a @click="notworking()">{{ $t('marketprice') }}</a>
      </li>
      <li :class="{ active: tab == '3' }">
        <a @click="tabChange('3')">{{ $t('tradehistory') }}</a>
      </li>
      <li :class="{ active: tab == '4' }">
        <a @click="tabChange('4')">{{ $t('openorders') }}</a>
      </li>
    </ul>
    <div v-if="tab == '1'" id="con5" class="tab_con2 ex_con2" style="height: 325px; padding-left: 5px">
      <!-- con5 -->
      <input type="hidden" name="symbol" :value="oriSimbol" />
      <input type="hidden" name="orderType" value="B" />
      <input type="hidden" name="priceType" value="2" />
      <input type="hidden" name="waysType" value="W" />
      <input type="hidden" name="orderPrice" value="" />
      <input type="hidden" name="orderQty" value="" />
      <ul v-if="getUserLevel > 1" class="ex_price1">
        <li class="left" style="width: 48%; text-align: left">
          <p v-if="market == 'KRW'" class="st1">
            {{ $t('assets') }} : <span class="blue">{{ amountInfo.amount | toFixed | commaFilter }}</span>
            {{ market }}
            <br />
            {{ $t('availableamount') }} : <span class="blue">{{ amountInfo.ordrAbleAmount | toFixed | commaFilter }}</span>
            {{ market }}
          </p>
          <p v-if="market != 'KRW'" class="st1" :title="`보유수량 : {{ walletAmountInfo.openQty }} {{ market  }}`">
            {{ $t('quantityretained') }} : <span class="blue"> {{ walletAmountInfo.openQty | toFixed8 | commaFilter }}</span>
            {{ market }}
            <br />
            {{ $t('availableamount') }} :
            <span class="blue"> {{ walletAmountInfo.ableQty | toFixed8 | commaFilter }}</span>
            {{ market }}
            <br />
            <!--
            {{ $t('transferfee') }} :
            <span class="pointColor" :class="{ blue: walletAmountInfo.ableQty > buyFee, red: walletAmountInfo.ableQty < buyFee }"> {{ buyFee }}</span>
            {{ market }}
            -->
          </p>
        </li>
        <li class="right" style="width: 48%; text-align: left">
          <p class="st1" :title="`보유수량 : {{ walletInfo.openQty }} {{ market  }}`">
            {{ $t('quantityretained') }} : <span class="blue"> {{ walletInfo.openQty | toFixed8 | commaFilter }}</span>
            {{ symbol }}
            <br />
            {{ $t('maxaskamount') }} :
            <span class="blue"> {{ walletInfo.ableQty | toFixed8 | commaFilter }}</span>
            {{ symbol }}
            <br />
            <!--
            {{ $t('transferfee') }} :
            <span
              v-if="
                symbol != 'KDA' &&
                symbol != 'METAC' &&
                symbol != 'AGO' &&
                symbol != '520' &&
                symbol != 'SLT' &&
                symbol != 'COOP' &&
                symbol != 'MCVW' &&
                symbol != 'BTR' &&
                symbol != 'VVC' &&
                symbol != 'MPC' &&
                symbol != 'CSC' &&
                symbol != 'EDIEN' &&
                symbol != 'KOC' &&
                symbol != 'STC'
              "
            >
              <span class="pointColor" :class="{ blue: walletInfo.ableQty > sellFee, red: walletInfo.ableQty < sellFee }"> {{ sellFee }}</span>
              {{ symbol }}
            </span>
            <span
              v-if="
                symbol == 'KDA' ||
                symbol == 'METAC' ||
                symbol == 'AGO' ||
                symbol == '520' ||
                symbol == 'SLT' ||
                symbol == 'COOP' ||
                symbol == 'MCVW' ||
                symbol == 'BTR' ||
                symbol == 'VVC' ||
                symbol == 'MPC' ||
                symbol == 'CSC' ||
                symbol == 'EDIEN' ||
                symbol == 'KOC' ||
                symbol == 'STC'
              "
            >
              <span class="pointColor" :class="{ blue: walletInfoETH.ableQty > sellFee, red: walletInfoETH.ableQty < sellFee }"> {{ sellFee }}</span>
              ETH <span class="warning"></span>
            </span>
            -->
          </p>
        </li>
      </ul>
      <ul v-if="getSessionId == ''" class="ex_price1">
        <li class="left" style="width: 48%">
          <p class="st1">
            <a href="/auth/login" style="background: #3b3b4b; width: 30%; display: inline"
              ><span class="blue">{{ $t('login') }}</span></a
            >
            {{ $t('or') }}
            <a href="javascript:go_join();" style="background: #3b3b4b; width: 30%; display: inline"
              ><span class="blue">{{ $t('signup') }}</span></a
            >
          </p>
        </li>
        <li class="right" style="width: 48%">
          <p class="st1">
            <a href="/auth/login" style="background: #3b3b4b; width: 30%; display: inline"
              ><span class="blue">{{ $t('login') }}</span></a
            >
            {{ $t('or') }}
            <a href="javascript:go_join();" style="background: #3b3b4b; width: 30%; display: inline"
              ><span class="blue">{{ $t('signup') }}</span></a
            >
          </p>
        </li>
      </ul>
      <ul class="ex_price1 line">
        <li class="left" style="width: 48%">
          <p class="st2">
            {{ $t('bidprice') }}
            <span v-if="priceType == '2'" class="miniBtn_area">
              <input type="button" class="miniBtn1 plus" value="+" @click="plusBuy()" />
              <input type="button" class="miniBtn1 minus" value="&ndash;" @click="minusBuy()" />
            </span>
          </p>
          <div v-show="priceType == '2'" class="price_w1">
            <input v-model="buyPrice" type="text" name="orderPriceBuy" valid-number @change="calcBuy()" @blur="focusOut('buy')" />
            <span>{{ market }}</span>
            <div id="modiInfoBuy"></div>
          </div>
          <div v-show="priceType == '1'" class="price_w1">
            <input type="text" :value="$t('orderMarketPrice')" style="width: 80%; padding: 0px 10% 0px 10%" readonly />
          </div>
          <p class="st2 mt10">
            {{ $t('purchasequantity') }}
            <span class="miniBtn_area">
              <input type="button" class="miniBtn min" :value="$t('min')" @click="calcQty('0', 'B')" />
              <input type="button" class="miniBtn half" value="25%" @click="calcQty('25', 'B')" />
              <input type="button" class="miniBtn max" value="50%" @click="calcQty('50', 'B')" />
              <input type="button" class="miniBtn max" value="100%" @click="calcQty('100', 'B')" />
            </span>
          </p>

          <div class="price_w1">
            <input v-model="buyQty" type="text" name="orderQtyBuy" valid-qty @change="calcBuy()" />
            <span>{{ symbol }}</span>
          </div>
          <div v-if="priceType == '2'" class="st3 mt15" style="float: left">{{ $t('ordertotal') }}</div>
          <div class="st3" style="float: right; text-align: right">
            <span class="blue">{{ buyAmount }}</span> <span class="gray">{{ market }}</span>
            <p v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></p>
          </div>
        </li>

        <li class="right" style="width: 48%">
          <p class="st2">
            {{ $t('askprice') }}
            <span v-if="priceType == '2'" class="miniBtn_area">
              <input type="button" class="miniBtn1 plus" value="+" @click="plusSell()" />
              <input type="button" class="miniBtn1 minus" value="&ndash;" @click="minusSell()" />
            </span>
          </p>
          <div v-show="priceType == '2'" class="price_w1">
            <input v-model="sellPrice" type="text" name="orderPriceSell" valid-number @change="calcSell()" @blur="focusOut('sell')" />
            <span>{{ market }}</span>
            <div id="modiInfoSell"></div>
          </div>
          <div v-show="priceType == '1'" class="price_w1">
            <input type="text" :value="$t('orderMarketPrice')" style="width: 80%; padding: 0px 10% 0px 10%" readonly />
          </div>
          <p class="st2 mt10">
            {{ $t('salesvolume') }}
            <span class="miniBtn_area">
              <input type="button" class="miniBtn min" :value="$t('min')" @click="calcQty('0', 'S')" />
              <input type="button" class="miniBtn half" value="25%" @click="calcQty('25', 'S')" />
              <input type="button" class="miniBtn max" value="50%" @click="calcQty('50', 'S')" />
              <input type="button" class="miniBtn max" value="100%" @click="calcQty('100', 'S')" />
            </span>
          </p>
          <div class="price_w1">
            <input v-model="sellQty" type="text" name="orderQtySell" valid-qty @change="calcSell()" />
            <span>{{ symbol }}</span>
          </div>
          <div class="st3" style="float: right; text-align: right">
            <span class="blue">{{ sellAmount }}</span> <span class="gray">{{ market }}</span>
            <p v-if="market != 'KRW'" class="won_price">{{ basicPrice | calcPrice:sellAmount  }}<span>KRW</span></p>
          </div>
        </li>
      </ul>
      <div class="ex_price2">
        <p v-if="getUserLevel > 1" class="gray st1" style="text-align: right">
          {{ $t('minamount') }} <span class="white fw300"> {{ minPrice }} </span> {{ market }}<span class="wm">/</span>
          <span v-show="market == 'KRW'">
            {{ $t('PriceUnit') }}
            <span class="white fw300">{{ tickSize | toFixed }}</span> KRW
            <span class="wm">/</span>
          </span>
          {{ $t('fee') }}
          <span class="white fw300"> {{ feeRate }} </span>
          %
          <!--({{$t( 'betaOpenPeriod' )}} : <span class="red">0</span>%)-->
        </p>
      </div>
      <div class="ex_price3">
        <p class="left"><input type="button" style="border: 0" class="btn_c2" :value="$t('bid')" @click="goOrder('B', priceType)" /></p>
        <p class="right"><input type="button" style="border: 0" class="btn_c1" :value="$t('ask')" @click="goOrder('S', priceType)" /></p>
      </div>
    </div>
    <!-- // con5 -->
    <div v-if="tab == '3'" id="con7" class="tab_table_con table_con1 tab_con2 mCustomScrollbar">
      <div v-show="getSessionId == ''" style="text-align: center; padding: 20px; font-size: 16px; color: #fff">
        <p class="st1">
          <a href="/auth/login"
            ><span class="blue">{{ $t('login') }}</span></a
          >
          {{ $t('or') }}
          <a href="javascript:go_join();"
            ><span class="blue">{{ $t('signup') }}</span></a
          >
          {{ $t('isrequired') }}
        </p>
      </div>
      <input type="hidden" name="oriOrderNo" />
      <input type="hidden" name="cancleOrderQty" />
      <input type="hidden" name="symbol" :value="oriSymbol" />
      <input type="hidden" name="waysType" value="W" />
      <table v-show="getUserLevel > 1" class="table_type_h1">
        <colgroup>
          <col style="width: * %" />
          <col style="width: 11%" />
          <col style="width: 20%" />
          <col style="width: 16%" />
          <col style="width: 16%" />
          <col style="width: 13%" />
        </colgroup>
        <thead>
          <tr>
            <th>{{ $t('orderdate') }}</th>
            <th>{{ $t('type') }}</th>
            <th class="tr">{{ $t('orderprice') }}</th>
            <th class="tr">{{ $t('orderamount') }}</th>
            <th class="tr">{{ $t('unfinishedamount') }}</th>
            <th>{{ $t('cancel') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mr, index) in matchingList" :key="index">
            <td class="tc">
              <span class="st1">{{ mr.ordrTime }}</span>
            </td>
            <td class="tc" :class="{ red: mr.byslTp == 'B', blue: mr.byslTp == 'S' }">{{ mr.byslTp | buySellType }}</td>
            <td>
              {{ mr.ordrPrc }}
              <p v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></p>
            </td>
            <td>{{ mr.ordrQty }}</td>
            <td>{{ mr.remnQty }}</td>
            <td class="tc"><a style="cursor: pointer" class="ex_table_btn1" @click="orderCancle(mr.ordrNo, mr.remnQty)">취소</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="tab == '4'" id="con8" class="tab_table_con table_con2 tab_con2 mCustomScrollbar">
      <div v-show="getSessionId == ''" style="text-align: center; padding: 20px; font-size: 16px; color: #fff">
        <p class="st1">
          <a href="/auth/login"
            ><span class="blue">{{ $t('login') }}</span></a
          >
          {{ $t('or') }}
          <a href="javascript:go_join();"
            ><span class="blue">{{ $t('signup') }}</span></a
          >
          {{ $t('isrequired') }}
        </p>
      </div>
      <table v-show="getUserLevel > 1" class="table_type_h1">
        <colgroup>
          <col style="width: * %" />
          <col style="width: 15%" />
          <col style="width: 21%" />
          <col style="width: 21%" />
          <col style="width: 30%" />
        </colgroup>
        <thead>
          <tr>
            <th>{{ $t('market') }}</th>
            <th class="tr">{{ $t('classification') }}</th>
            <th class="tr">{{ $t('matchingprice') }}</th>
            <th class="tr">{{ $t('matchingamount') }}</th>
            <th class="tr">{{ $t('matchingtime') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mcL, index) in matchingReady" :key="index">
            <th>{{ mcL.instCd }} / {{ mcL.instCd }}</th>
            <td style="text-align: center" :class="{ red: mcL.byslTp == 'B', blue: mcL.byslTp == 'S' }">{{ mcL.byslTp | buySellType }}</td>
            <td>{{ mcL.mtchPrc }}</td>
            <td>{{ mcL.mtchQty }}</td>
            <td>{{ mcL.mtchTime | dateAndTimeFilter }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <p slot="body">{{ text }}</p>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { coinInfo } from '~/api/coin'
import { orderAsset, sendFee } from '~/api/balance'
import { exTransactionList, nonTransactionList } from '~/api/exchange'
import { getMarket, getSymbol } from '~/plugins/util'
import Modal from '~/components/Modal'
export default {
  name: 'Order',
  components: {
    Modal
  },
  data() {
    return {
      tab: '1',
      market: 'KRW',
      amountInfo: {},
      buyFee: '',
      sellFee: '',
      walletInfo: {
        openQty: '',
        ableQty: ''
      },
      priceType: '2',
      buyAmount: '0',
      sellAmount: '0',
      symbol: 'BTC',
      sellQty: '',
      sellPrice: '',
      buyQty: '',
      buyPrice: '',
      oriSimbol: '',
      minPrice: '',
      tickSize: '',
      feeRate: '',
      matchingList: [],
      oriSymbol: 'BTC',
      basicPrice: '',
      showModal: false,
      text: '',
      matchingReady: []
    }
  },
  computed: {
    ...mapGetters(['getUserLevel', 'getSessionId', 'getUid', 'getSymbolMarket'])
  },
  watch: {
    tab() {
      if (this.tab === '3') {
        this.getExTransactionList()
      } else if (this.tab === '4') {
        this.getNonTransactionList()
      }
    }
  },
  mounted() {
    this.getCoinInfo()
    this.getOrderAsset()
  },
  methods: {
    tabChange(tab) {
      const vm = this
      vm.tab = tab
    },
    notworking() {
      this.showModal = true
      this.text = '서비스 준비중입니다.'
    },
    getCoinInfo() {
      const vm = this
      coinInfo(vm.getSymbolMarket).then(res => {
        vm.buyPrice = res.data.coinInfo.lastPrice
        vm.sellPrice = res.data.coinInfo.lastPrice
        vm.tickSize = res.data.coinInfo.tickSize
      })
    },
    goOrder(orderType, priceType) {
      if (this.getSessionId === '') {
        this.showModal = true
        this.text = '로그인 후 거래가 가능합니다.'
      }
    },
    getOrderAsset() {
      const vm = this
      orderAsset(vm.getSessionId, vm.getUid, vm.getSymbolMarket).then(res => {
        vm.amountInfo = res.data.amountInfo
        vm.orderMaxBuy = vm.amountInfo.ordrAbleAmount
        vm.minPrice = vm.amountInfo.minPrice
        vm.walletAmountInfo = res.data.walletAmountInfo
        vm.walletInfo = res.data.walletInfo
        vm.market = res.data.market
        vm.feeRate = vm.walletInfo.feeRate
      })
    },
    getSendFee() {
      const vm = this
      const symbol = getSymbol(vm.getSymbolMarket)
      const market = getMarket(vm.getSymbolMarket)
      if (market !== 'KRW') {
        sendFee(symbol, vm.procType, vm.calcType, vm.gasLimit, vm.gwei).then(res => {
          vm.buyFee = res.data.fee
        })
      }
      sendFee(symbol, vm.procType, vm.calcType, vm.gasLimit, vm.gwei).then(res => {
        vm.sellFee = res.data.fee
      })
    },
    getExTransactionList() {
      const vm = this
      const symbol = getSymbol(vm.getSymbolMarket)
      exTransactionList(vm.getSessionId, vm.getUid, symbol).then(res => {
        vm.matchingList = res.data
      })
    },
    getNonTransactionList() {
      const vm = this
      // const symbol = getSymbol(vm.getSymbolMarket)
      nonTransactionList(vm.getSessionId, vm.getUid, 'LTC').then(res => {
        vm.matchingReady = res.data
      })
    }
  }
}
</script>
