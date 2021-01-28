<template>
  <div id="OrderAddCtrl" class="exchange2_Left_top">
    <no-ssr>
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
                <input type="button" class="miniBtn1 plus" value="+" @click="plusBuyPrice()" />
                <input type="button" class="miniBtn1 minus" value="&ndash;" @click="minusBuyPrice(buyPrice)" />
              </span>
            </p>
            <div v-show="priceType == '2'" class="price_w1">
              <input id="buyPrice" v-model="buyPrice" type="text" name="orderPriceBuy" @blur="focusOut('buy')" />
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
                <input type="button" class="miniBtn1 plus" value="+" @click="plusPrice(sellPrice)" />
                <input type="button" class="miniBtn1 minus" value="&ndash;" @click="minusPrice(sellPrice)" />
              </span>
            </p>
            <div v-show="priceType == '2'" class="price_w1">
              <input v-model="sellPrice" type="text" name="orderPriceSell" @blur="focusOut('sell')" />
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
    </no-ssr>
  </div>
  <!-- // exchange2_Left_top -->
</template>
<script>
import { mapGetters } from 'vuex'
import Modal from '~/components/Modal'
import { orderAsset } from '~/api/balance'
import { repComma, repUnComma, toFixQty } from '~/plugins/util'
import { coinInfo } from '~/api/coin'

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
      sellQty: '0',
      sellPrice: '',
      buyQty: '0',
      buyPrice: '',
      oriSimbol: '',
      minPrice: '',
      tickSize: '',
      feeRate: '',
      walletAmountInfo: {},
      basicPrice: '',
      showModal: false,
      text: '',
      orderMaxBuy: ''
    }
  },
  computed: {
    ...mapGetters(['getSymbolMarket', 'getUserLevel', 'getSessionId', 'getUid'])
  },
  watch: {
    getSymbolMarket() {
      this.getCoinInfo()
      this.getOrderAsset()
    },
    buyPrice() {
      if (this.buyQty !== '0') {
        this.buyAmount = Number(repUnComma(this.buyPrice)) * Number(repUnComma(this.buyQty))
        this.buyAmount = repComma(this.buyAmount)
      }
      return (this.buyPrice = repComma(this.buyPrice.replace(/[^-/.0-9]/g, '').replace(/0*([0-9]+)/g, '$1')))
    },
    sellPrice() {
      if (this.sellQty !== '0') {
        this.sellAmount = Number(repUnComma(this.sellPrice)) * Number(repUnComma(this.sellQty))
        this.sellAmount = repComma(this.sellAmount)
      }
      return (this.sellPrice = repComma(this.sellPrice.replace(/[^-/.0-9]/g, '').replace(/0*([0-9]+)/g, '$1')))
    },
    buyQty() {
      if (this.buyPrice !== '0') {
        this.buyAmount = Number(repUnComma(this.buyPrice)) * Number(repUnComma(this.buyQty))
        this.buyAmount = repComma(this.buyAmount)
      }
      return (this.buyQty = repComma(this.buyQty.replace(/[^-/.0-9]/g, '').replace(/0*([0-9]+)/g, '$1')))
    },
    sellQty() {
      if (this.sellPrice !== '0') {
        this.sellAmount = Number(repUnComma(this.sellPrice)) * Number(repUnComma(this.sellQty))
        this.sellAmount = repComma(this.sellAmount)
      }
      return (this.sellQty = repComma(this.sellQty.replace(/[^-/.0-9]/g, '').replace(/0*([0-9]+)/g, '$1')))
    }
  },
  mounted() {
    this.getOrderAsset()
    this.getCoinInfo()
  },
  methods: {
    getOrderAsset() {
      const vm = this
      orderAsset(vm.getSessionId, vm.getUid, vm.getSymbolMarket).then(res => {
        vm.amountInfo = res.data.amountInfo
        vm.orderMaxBuy = vm.amountInfo.ordrAbleAmount
        vm.minPrice = vm.amountInfo.minPrice
        vm.walletAmountInfo = res.data.walletAmountInfo
        vm.walletInfo = res.data.walletInfo
        vm.market = res.data.market
        vm.feeRate = vm.walletAmountInfo.feeRate
      })
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
    plusBuyPrice() {
      const tickSize = this.tickSize.substring(0, this.tickSize.length - 9)
      this.buyPrice = Number(repUnComma(this.buyPrice)) + Number(tickSize)
      this.buyPrice = repComma(this.buyPrice)
    },
    minusBuyPrice() {
      if (Number(this.buyPrice) === 0) {
        this.showModal = true
        this.text = '주문이 불가능한 금액입니다.'
      } else {
        const tickSize = this.tickSize.substring(0, this.tickSize.length - 9)
        this.buyPrice = Number(repUnComma(this.buyPrice)) - Number(tickSize)
        this.buyPrice = repComma(this.buyPrice)
      }
    },
    focusOut(type) {
      if (type === 'buy') {
        if (Number(repUnComma(this.buyPrice)) % Number(this.tickSize) !== 0 && Number(this.tickSize) > 1) {
          this.buyPrice = Number(repUnComma(this.buyPrice)) - (Number(repUnComma(this.buyPrice)) % Number(this.tickSize))

          if (this.buyPrice === 0) {
            this.buyPrice = Number(this.tickSize)
          }
          this.buyPrice = repComma(this.buyPrice)
          $('#modiInfoBuy').html('호가단위에 맞춰 금액이 수정되었습니다.')
          $('#modiInfoBuy').show()
          setTimeout(() => {
            $('#modiInfoBuy').hide()
          }, 2000)
        }
      }
      if (type === 'sell') {
        if (Number(repUnComma(this.sellPrice)) % Number(this.tickSize) !== 0 && Number(this.tickSize) > 1) {
          this.sellPrice = Number(repUnComma(this.sellPrice)) - (Number(repUnComma(this.sellPrice)) % Number(this.tickSize))

          if (this.sellPrice === 0) {
            this.sellPrice = Number(this.tickSize)
          }
          this.sellPrice = repComma(this.sellPrice)
          $('#modiInfoSell').html('호가단위에 맞춰 금액이 수정되었습니다.')
          $('#modiInfoSell').show()
          setTimeout(() => {
            $('#modiInfoSell').hide()
          }, 2000)
        }
      }
    },
    calcQty(type, mode) {
      if (mode === 'B') {
        const ableQty = Number(repUnComma(this.orderMaxBuy))
        const buyPrice = Number(repUnComma(this.buyPrice))
        if (buyPrice === 0 || buyPrice === '') {
          this.showModal = true
          this.text = '매수가격을 입력해주세요.'
        } else {
          let qty = 0
          if (type === '0') {
            const minPrice = Number(repUnComma(this.minPrice))
            qty = minPrice / buyPrice
            qty = Math.ceil(qty * 1000)
            qty = qty / 1000
            console.log('qty: ' + qty)
          } else if (type === '100') {
            // 원화마켓의 경우 수수료 차감후 계산
            if (this.market === 'KRW') {
              qty = (ableQty * (1 - Number(this.feeRate) * 0.01)) / buyPrice
            } else {
              qty = (ableQty - this.buyFee) / buyPrice
            }
            qty = Math.floor(qty * 1000)
            qty = qty / 1000
          } else {
            qty = ableQty / buyPrice / (100 / Number(type))
          }

          this.buyQty = repComma(toFixQty(qty))
          // this.calcBuy()
        }
      } else {
        const ableQty = Number(repUnComma(this.orderMaxSell))
        const sellPrice = Number(repUnComma(this.sellPrice))
        if (sellPrice === 0) {
          this.showModal = true
          this.text = '매도가격을 입력해주세요.'
        } else {
          let qty = 0
          if (type === '0') {
            const minPrice = Number(repUnComma(this.minPrice))
            qty = minPrice / sellPrice
            qty = Math.ceil(qty * 1000)
            qty = qty / 1000
          } else if (type === '100') {
            if (
              this.simbol === 'KDA' ||
              this.simbol === 'DPN' ||
              this.simbol === 'METAC' ||
              this.simbol === 'AGO' ||
              this.simbol === '520' ||
              this.simbol === 'MCVW' ||
              this.simbol === 'BTR' ||
              this.simbol === 'COOP' ||
              this.simbol === 'VVC' ||
              this.simbol === 'MPC' ||
              this.simbol === 'CSC' ||
              this.simbol === 'EDIEN' ||
              this.simbol === 'KOC' ||
              this.simbol === 'STC'
            ) {
              qty = ableQty
            } else {
              qty = ableQty - this.sellFee
            }
            qty = Math.floor(qty * 1000)
            qty = qty / 1000
          } else {
            qty = ableQty / (100 / Number(type))
          }

          this.sellQty = repComma(toFixQty(qty))
          // this.calcSell()
        }
      }
    }
  }
}
</script>
