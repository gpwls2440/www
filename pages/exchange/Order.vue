<template>
  <div id="OrderAddCtrl" class="exchange2_Left_top">
    <!-- exchange2_Left_top -->
    <input type="hidden" name="symbol" value="oriSimbol" />
    <input type="hidden" name="orderType" value="B" />
    <input type="hidden" name="priceType" value="2" />
    <input type="hidden" name="waysType" value="W" />
    <input type="hidden" name="orderPrice" value="" />
    <input type="hidden" name="orderQty" value="" />
    <div id="tab_btn2" class="ex_tab2">
      <ul id="tab_btn2_ul">
        <li class="active">
          <a href="#con5" @click="typeChange('2')">{{ $t('designatedamount') }}</a>
        </li>
        <li>
          <a href="#con5" @click="notworking()">{{ $t('marketprice') }}</a>
        </li>
      </ul>
    </div>

    <div id="con5" class="tab_con2 ex_con2">
      <!-- con5 -->
      <ul v-if="getUserLevel > 1" class="ex_price1">
        <li class="left">
          <p v-if="market == 'KRW'" class="st1">
            {{ $t('assets') }} : <span class="pointColor">{{ amountInfo.amount == null ? '0' : amountInfo.amount }}</span>
            {{ market }}
            <br />
            {{ $t('availableamount') }} : <span class="pointColor">{{ amountInfo.ordrAbleAmount == null ? '0' : amountInfo.orderAbleAmount }}</span>
            {{ market }}
          </p>
          <p v-if="market != 'KRW'" class="st1">
            {{ $t('quantityretained') }} : <span class="pointColor"> {{ walletAmountInfo.openQty == null ? '0' : walletAmountInfo.openQty }}</span>
            {{ market }}
            <br />
            {{ $t('availableamount') }} :
            <span class="pointColor"> {{ walletAmountInfo.ableQty == null ? '0' : walletAmountInfo.ableQty }}</span>
            {{ market }}
            <br />
            {{ $t('transferfee') }} :
            <span class="pointColor" :class="{ blue: walletAmountInfo.ableQty > buyFee, red: walletAmountInfo.ableQty < buyFee }"> {{ buyFee }}</span>
            {{ market }}
          </p>
        </li>
        <li class="right">
          <p class="st1">
            {{ $t('quantityretained') }} : <span class="pointColor"> {{ walletInfo.openQty == null ? '0' : walletInfo.openQty }}</span>
            {{ symbol }}
            <br />
            {{ $t('maxaskamount') }} :
            <span class="pointColor"> {{ walletInfo.ableQty == null ? '0' : walletInfo.ableQty }}</span>
            {{ symbol }}
            <br />
            {{ $t('transferfee') }} :
            <span
              v-if="
                symbol != 'KDA' &&
                symbol != 'DPN' &&
                symbol != 'METAC' &&
                symbol != 'AGO' &&
                symbol != '520' &&
                symbol != 'MCVW' &&
                symbol != 'BTR' &&
                symbol != 'SLT' &&
                symbol != 'COOP' &&
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
                symbol == 'DPN' ||
                symbol == 'METAC' ||
                symbol == 'AGO' ||
                symbol == '520' ||
                symbol == 'MCVW' ||
                symbol == 'BTR' ||
                symbol == 'SLT' ||
                symbol == 'COOP' ||
                symbol == 'VVC' ||
                symbol == 'MPC' ||
                symbol == 'CSC' ||
                symbol == 'EDIEN' ||
                symbol == 'KOC' ||
                symbol == 'STC'
              "
            >
              <span class="pointColor" :class="{ blue: walletInfoETH.ableQty > sellFee, red: walletInfoETH.ableQty < sellFee }"> {{ sellFee }}</span>
              ETH
            </span>
          </p>
        </li>
      </ul>
      <ul v-if="getSessionId == ''" class="ex_price1">
        <li class="left">
          <p class="st1">
            <a href="/auth/login"
              ><span class="pointColor">{{ $t('login') }}</span></a
            >
            {{ $t('or') }}
            <a href="/auth/signup"
              ><span class="pointColor"> {{ $t('signup') }}</span></a
            >
          </p>
        </li>
        <li class="right">
          <p class="st1">
            <a href="/auth/login"
              ><span class="pointColor">{{ $t('login') }}</span></a
            >
            {{ $t('or') }}
            <a href="/auth/signup"
              ><span class="pointColor"> {{ $t('signup') }}</span></a
            >
          </p>
        </li>
      </ul>
      <ul class="ex_price1 line">
        <li class="left">
          <p class="st2">
            {{ $t('bidprice') }}
            <span v-if="priceType == '2'" class="miniBtn_area">
              <input type="button" class="miniBtn1 plus" value="+" @click="plusBuy()" />
              <input type="button" class="miniBtn1 minus" value="&ndash;" @click="minusBuy()" />
            </span>
          </p>
          <div v-show="priceType == '2'" class="price_w1">
            <input id="buyPrice" v-model="buyPrice" type="text" name="orderPriceBuy" />
            <span>{{ market }}</span>
            <div id="modiInfoBuy"></div>
          </div>
          <div v-show="priceType == '1'" class="price_w1">
            <input type="text" :value="$t('orderMarketPrice')" style="width: 80%; padding: 16px 10% 16px 10%" readonly />
          </div>
          <p class="st2 mt10">
            {{ $t('purchasequantity') }}
            <span class="miniBtn_area">
              <input type="button" class="miniBtn" :value="$t('min')" @click="calcQty('0', 'B')" />
              <input type="button" class="miniBtn" value="25%" @click="calcQty('25', 'B')" />
              <input type="button" class="miniBtn" value="50%" @click="calcQty('50', 'B')" />
              <input type="button" class="miniBtn" value="100%" @click="calcQty('100', 'B')" />
            </span>
          </p>
          <div class="price_w1">
            <input v-model="buyQty" type="text" name="orderQtyBuy" />
            <span>{{ symbol }}</span>
          </div>
          <div v-if="priceType == '2'" class="st3 mt15" style="float: left">{{ $t('ordertotal') }}</div>
          <div class="st3 mt15" style="float: right; text-align: right">
            <span class="blue">{{ buyAmount }}</span> <span class="gray">{{ market }}</span>
            <p v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></p>
          </div>
        </li>

        <li class="right">
          <p class="st2">
            {{ $t('askprice') }}
            <span v-if="priceType == '2'" class="miniBtn_area">
              <input type="button" class="miniBtn1 plus" value="+" @click="plusSell()" />
              <input type="button" class="miniBtn1 minus" value="&ndash;" @click="minusSell()" />
            </span>
          </p>
          <div v-show="priceType == '2'" class="price_w1">
            <input v-model="sellPrice" type="text" name="orderPriceSell" />
            <span>{{ market }}</span>
            <div id="modiInfoSell"></div>
          </div>
          <div v-show="priceType == '1'" class="price_w1">
            <input type="text" :value="$t('orderMarketPrice')" style="width: 80%; padding: 16px 10% 16px 10%" readonly />
          </div>
          <p class="st2 mt10">
            {{ $t('salesvolume') }}
            <span class="miniBtn_area">
              <input type="button" class="miniBtn" :value="$t('min')" @click="calcQty('0', 'S')" />
              <input type="button" class="miniBtn" value="25%" @click="calcQty('25', 'S')" />
              <input type="button" class="miniBtn" value="50%" @click="calcQty('50', 'S')" />
              <input type="button" class="miniBtn" value="100%" @click="calcQty('100', 'S')" />
            </span>
          </p>
          <div class="price_w1">
            <input v-model="sellQty" type="text" name="orderQtySell" />
            <span>{{ symbol }}</span>
          </div>
          <div class="st3 mt15" style="float: right; text-align: right">
            <span class="blue">{{ sellAmount }}</span> <span class="gray">{{ market }}</span>
            <p v-if="market != 'KRW'" class="won_price">{{ basicPrice }}<span>KRW</span></p>
          </div>
        </li>
      </ul>
      <div class="ex_price2">
        <p v-if="getUserLevel > 1" class="gray st1">
          {{ $t('minamount') }}
          <span class="black fw300">{{ minPrice }}</span>
          {{ market }}<span class="wm">/</span>
          <span v-show="market == 'KRW'">
            {{ $t('PriceUnit') }}
            <span class="black fw300">{{ tickSize }}</span> KRW
            <span class="wm">/</span>
          </span>
          {{ $t('fee') }}
          <span class="black fw300">{{ feeRate }}</span>
          %
        </p>
      </div>
      <div v-show="priceType == '1'" class="ex_price3">
        <p class="left"><input type="button" style="border: 0" class="btn_c2" @click="notworking()" /></p>
        <p class="right"><input type="button" style="border: 0" class="btn_c1" @click="notworking()" /></p>
      </div>
      <div v-show="priceType == '2'" class="ex_price3">
        <p class="left"><input type="button" class="btn_c2" style="border: 0" :value="$t('bid')" @click="goOrder('B', priceType)" /></p>
        <p class="right"><input type="button" style="border: 0" class="btn_c1" :value="$t('ask')" @click="goOrder('S', priceType)" /></p>
      </div>
    </div>
    <!-- // con5 -->
    <modal v-if="showModal" @close="showModal = false">
      <p slot="body">{{ text }}</p>
    </modal>
  </div>
  <!-- // exchange2_Left_top -->
</template>
<script>
import { mapGetters } from 'vuex'
import Modal from '~/components/Modal'
import { orderAsset } from '~/api/balance'
import { repComma } from '~/plugins/util'

export default {
  name: 'Order',
  components: {
    Modal
  },
  data() {
    return {
      market: '',
      amountInfo: {},
      buyFee: '',
      sellFee: '',
      walletInfo: {},
      priceType: '2',
      buyAmount: 0,
      sellAmount: '0',
      symbol: 'BTC',
      sellQty: '',
      sellPrice: '',
      buyQty: '',
      buyPrice: '',
      oriSimbol: '',
      minPrice: '10,000',
      tickSize: '1,000',
      feeRate: '0.1',
      walletAmountInfo: {},
      basicPrice: '',
      showModal: false,
      text: ''
    }
  },
  computed: {
    ...mapGetters(['getSymbolMarket', 'getUserLevel', 'getSessionId', 'getUid'])
  },
  watch: {
    buyPrice() {
      if (this.buyQty !== '') {
        this.buyAmount = Number(this.buyPrice) * Number(this.buyQty)
      }
      return (this.buyPrice = repComma(this.buyPrice.replace(/[^0-9]/g, '')))
    },
    sellPrice() {
      return (this.sellPrice = repComma(this.sellPrice.replace(/[^0-9]/g, '')))
    },
    buyQty() {
      if (this.buyPrice !== '') {
        this.buyAmount = Number(this.buyPrice) * Number(this.buyQty)
      }
      return (this.buyQty = repComma(this.buyQty.replace(/[^0-9]/g, '')))
    },
    sellQty() {
      return (this.sellQty = repComma(this.sellQty.replace(/[^0-9]/g, '')))
    },
    getSymbolMarket() {
      this.getOrderAsset()
    }
  },
  mounted() {
    this.getOrderAsset()
  },
  methods: {
    getOrderAsset() {
      const vm = this
      orderAsset(vm.getSessionId, vm.getUid, vm.getSymbolMarket).then(res => {
        vm.amountInfo = res.data.amountInfo
        vm.walletAmountInfo = res.data.walletAmountInfo
        vm.walletInfo = res.data.walletInfo
        vm.market = res.data.market
      })
    },
    notworking() {
      this.showModal = true
      this.text = '서비스 준비중입니다.'
    },
    goOrder(orderType, priceType) {
      if (this.getSessionId === '') {
        this.showModal = true
        this.text = '로그인 후 거래가 가능합니다.'
      }
    }
  }
}
</script>
