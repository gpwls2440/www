<template>
  <div id="OrderAddCtrl" class="exchange2_Left_top">
    <!-- exchange2_Left_top -->
    <form id="frmOrder" class="ex2FormArea" name="frmOrder">
      <input type="hidden" name="simbol" value="{/ oriSimbol /}" />
      <input type="hidden" name="orderType" value="B" />
      <input type="hidden" name="priceType" value="2" />
      <input type="hidden" name="waysType" value="W" />
      <input type="hidden" name="orderPrice" value="" />
      <input type="hidden" name="orderQty" value="" />
      <div id="tab_btn2" class="ex_tab2">
        <ul id="tab_btn2_ul">
          <li :class="{ active: priceType == '2' }">
            <a href="#con5" @click="typeChange('2')">{{ $t('designatedamount') }}</a>
          </li>
          <li :class="{ '': priceType == '2' }">
            <a href="#con5" @click="notworking()">{{ $t('marketprice') }}</a>
          </li>
        </ul>
      </div>

      <div id="con5" class="tab_con2 ex_con2">
        <!-- con5 -->
        <ul v-if="userLevel > 1" class="ex_price1">
          <li class="left">
            <p v-if="market == 'KRW'" class="st1">
              {{ $t('assets') }} : <span class="pointColor">{/ amountInfo.amount.length > 0 && amountInfo.amount || '0' | toFix:this /}</span>
              {/ market /}
              <br />
              {{ $t('availableamount') }} : <span class="pointColor">{/ amountInfo.ordrAbleAmount.length > 0 && amountInfo.ordrAbleAmount || '0' | toFix:this /}</span>
              {/ market /}
            </p>
            <p v-if="market != 'KRW'" class="st1">
              {{ $t('quantityretained') }} : <span class="pointColor"> {/ walletAmountInfo.openQty | toFix:this /}</span>
              {/ market /}
              <br />
              {{ $t('availableamount') }} :
              <span class="pointColor"> {/ walletAmountInfo.ableQty | toFix:this /}</span>
              {/ market /}
              <br />
              {{ $t('transferfee') }} :
              <span class="pointColor" :class="{ blue: walletAmountInfo.ableQty > buyFee, red: walletAmountInfo.ableQty < buyFee }"> {/ buyFee | toFix:this /}</span>
              {/ market /}
            </p>
          </li>
          <li class="right">
            <p class="st1">
              {{ $t('quantityretained') }} : <span class="pointColor"> {/ walletInfo.openQty | toFixMarket:simbol:this /}</span>
              {/ simbol /}
              <br />
              {{ $t('maxaskamount') }} :
              <span class="pointColor"> {/ walletInfo.ableQty | toFixMarket:simbol:this /}</span>
              {/ simbol /}
              <br />
              {{ $t('transferfee') }} :
              <span
                v-if="
                  simbol != 'KDA' &&
                  simbol != 'DPN' &&
                  simbol != 'METAC' &&
                  simbol != 'AGO' &&
                  simbol != '520' &&
                  simbol != 'MCVW' &&
                  simbol != 'BTR' &&
                  simbol != 'SLT' &&
                  simbol != 'COOP' &&
                  simbol != 'VVC' &&
                  simbol != 'MPC' &&
                  simbol != 'CSC' &&
                  simbol != 'EDIEN' &&
                  simbol != 'KOC' &&
                  simbol != 'STC'
                "
              >
                <span class="pointColor" :class="{ blue: walletInfo.ableQty > sellFee, red: walletInfo.ableQty < sellFee }"> {/ sellFee | toFixMarket:simbol:this /}</span>
                {/ simbol /}
              </span>
              <span
                v-if="
                  simbol == 'KDA' ||
                  simbol == 'DPN' ||
                  simbol == 'METAC' ||
                  simbol == 'AGO' ||
                  simbol == '520' ||
                  simbol == 'MCVW' ||
                  simbol == 'BTR' ||
                  simbol == 'SLT' ||
                  simbol == 'COOP' ||
                  simbol == 'VVC' ||
                  simbol == 'MPC' ||
                  simbol == 'CSC' ||
                  simbol == 'EDIEN' ||
                  simbol == 'KOC' ||
                  simbol == 'STC'
                "
              >
                <span class="pointColor" :class="{ blue: walletInfoETH.ableQty > sellFee, red: walletInfoETH.ableQty < sellFee }"> {/ sellFee | toFixMarket:simbol:this /}</span>
                ETH
                <!--
                <span class="warning" data-tooltip-text="{{i18n 'ERC-20TokensTransmissionFeeETH'}} : {/ walletInfoETH.ableQty | toFixMarket:simbol:this  /}ETH"></span>
                -->
              </span>
            </p>
          </li>
        </ul>
        <ul v-if="userLevel == 0" class="ex_price1">
          <li class="left">
            <p class="st1">
              <a href="/auth/login" target="_self"
                ><span class="pointColor">{{ $t('login') }}</span></a
              >
              {{ $t('or') }}
              <a href="javascript:go_join();"
                ><span class="pointColor"> {{ $t('signup') }}</span></a
              >
            </p>
          </li>
          <li class="right">
            <p class="st1">
              <a href="/auth/login" target="_self"
                ><span class="pointColor">{{ $t('login') }}</span></a
              >
              {{ $t('or') }}
              <a href="javascript:go_join();"
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
              <input id="buyPrice" v-model="buyPrice" type="text" name="orderPriceBuy" valid-number @change="calcBuy()" @blur="focusOut('buy')" />
              <span>{/ market /}</span>
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
              <input v-model="buyQty" type="text" valid-qty name="orderQtyBuy" @change="calcBuy()" />
              <span>{/ simbol /}</span>
            </div>
            <div v-if="priceType == '2'" class="st3 mt15" style="float: left">{{ $t('ordertotal') }}</div>
            <div class="st3 mt15" style="float: right; text-align: right">
              <span class="blue">{/ buyAmount /}</span> <span class="gray">{/ market /}</span>
              <p v-if="market != 'KRW'" class="won_price">{/ basicPrice | calcPrice:buyAmount /}<span>KRW</span></p>
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
              <input v-model="sellPrice" type="text" name="orderPriceSell" valid-number @change="calcSell()" @blur="focusOut('sell')" />
              <span>{/ market /}</span>
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
              <input v-model="sellQty" type="text" name="orderQtySell" valid-qty @change="calcSell()" />
              <span>{/ simbol /}</span>
            </div>
            <div class="st3 mt15" style="float: right; text-align: right">
              <span class="blue">{/ sellAmount /}</span> <span class="gray">{/ market /}</span>
              <p v-if="market != 'KRW'" class="won_price">{/ basicPrice | calcPrice:sellAmount /}<span>KRW</span></p>
            </div>
          </li>
        </ul>
        <div class="ex_price2">
          <p v-if="userLevel > 1" class="gray st1">
            {{ $t('minamount') }}
            <span class="black fw300">{/ minPrice /}</span>
            {/ market /}<span class="wm">/</span>
            <span v-show="market == 'KRW'">
              {{ $t('PriceUnit') }}
              <span class="black fw300">{/ tickSize | toFix:this /}</span> KRW
              <span class="wm">/</span>
            </span>
            {{ $t('fee') }}
            <span class="black fw300">{/ feeRate /}</span>
            %
          </p>
        </div>
        <!--
        <div v-show="priceType == '1'" class="ex_price3">
          <p class="left"><input type="button" style="border: 0" class="btn_c2" :value="$t('bid')`{/ simbol /}`" @click="notworking()" /></p>
          <p class="right"><input type="button" style="border: 0" :value="$t('ask')`{/ simbol /}`" class="btn_c1" @click="notworking()" /></p>
        </div>
        <div v-show="priceType == '2'" class="ex_price3">
          <p class="left"><input type="button" class="btn_c2" style="border: 0" :value="$t('bid')`{/ simbol /}`" @click="goOrder('B', priceType)" /></p>
          <p class="right"><input type="button" style="border: 0" :value="$t('ask')`{/ simbol /}`" class="btn_c1" @click="goOrder('S', priceType)" /></p>
        </div>
        -->
      </div>
      <!-- // con5 -->
    </form>
  </div>
  <!-- // exchange2_Left_top -->
</template>
<script>
export default {
  name: 'Order',
  data() {
    return {}
  }
}
</script>
