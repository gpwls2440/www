<template>
  <div class="right_area">
    <!-- right_area -->
    <div class="right_top">
      <!-- right_top -->
      <div id="tab_btn" class="ex_tab1 tab_right">
        <ul>
          <li class="active">
            <a href="#con1">{{ $t('walletManagement') }}</a>
          </li>
          <!-- <li><a href="#con2">결제내역</a></li> -->
        </ul>
        <p class="exchange_btn">
          <a v-show="curSymbol.symbol == ''" href="javascript:void(0)" class="" style="padding-top: 14px" onClick="">
            {{ $t('exchange') }} <img style="vertical-align: -2px" src="~/assets/images/005/btn_img1.gif" alt="" />
          </a>
          <a v-show="curSymbol.symbol != '' && (curSymbol.symbol == 'KDA' || curSymbol.symbol == '520')" href="javascript:void(0)" class="layer_btn1" style="padding-top: 14px" @click="exWindowOpen()">
            {{ $t('exchange') }} <img style="vertical-align: -2px" src="~/assets/images/005/btn_img1.gif" alt="" />
          </a>

          <a
            v-show="curSymbol.symbol != '' && showCoin && curSymbol.symbol != 'KDA' && curSymbol.symbol != '520'"
            href="javascript:void(0)"
            class="layer_btn1111"
            style="padding-top: 14px"
            onClick="exToken();"
          >
            {{ $t('exchange') }} <img style="vertical-align: -2px" src="~/assets/images/005/btn_img1.gif" alt="" />
          </a>

          <a
            v-show="
              curSymbol.symbol != '' &&
              curSymbol.symbol != 'KDA' &&
              curSymbol.symbol != 'DPN' &&
              curSymbol.symbol != 'METAC' &&
              curSymbol.symbol != 'MCVW' &&
              curSymbol.symbol != 'VVC' &&
              curSymbol.symbol != 'MPC' &&
              curSymbol.symbol != 'CSC' &&
              curSymbol.symbol != 'EDIEN' &&
              curSymbol.symbol != 'KOC' &&
              curSymbol.symbol != 'STC' &&
              curSymbol.symbol != 'AGO' &&
              curSymbol.symbol != 'SLT' &&
              curSymbol.symbol != 'COOP' &&
              curSymbol.symbol != 'BTR' &&
              curSymbol.symbol != '520' &&
              curSymbol.symbol != 'ETH' &&
              curSymbol.symbol != 'KDP' &&
              curSymbol.symbol != 'KRW' &&
              !showCoin
            "
            href="javascript:void(0)"
            class="layer_btn111"
            style="padding-top: 14px"
            @click="notService()"
          >
            {{ $t('exchange') }} <img style="vertical-align: -2px" src="~/assets/images/005/btn_img1.gif" alt="" />
          </a>

          <a
            v-show="
              curSymbol.symbol != '' &&
              curSymbol.symbol != 'KDA' &&
              curSymbol.symbol != 'DPN' &&
              curSymbol.symbol != 'METAC' &&
              curSymbol.symbol != 'MCVW' &&
              curSymbol.symbol != 'VVC' &&
              curSymbol.symbol != 'MPC' &&
              curSymbol.symbol != 'CSC' &&
              curSymbol.symbol != 'EDIEN' &&
              curSymbol.symbol != 'KOC' &&
              curSymbol.symbol != 'STC' &&
              curSymbol.symbol != 'AGO' &&
              curSymbol.symbol != 'SLT' &&
              curSymbol.symbol != 'COOP' &&
              curSymbol.symbol != 'BTR' &&
              curSymbol.symbol != '520' &&
              (curSymbol.symbol == 'ETH' || curSymbol.symbol == 'KRW' || curSymbol.symbol == 'KDP') &&
              !showCoin
            "
            href="javascript:void(0)"
            class="layer_btn1"
            style="padding-top: 14px"
            @click="exWindowOpen()"
          >
            {{ $t('exchange') }} <img style="vertical-align: -2px" src="~/assets/images/005/btn_img1.gif" alt="" />
          </a>
        </p>
      </div>
    </div>
    <!-- // right_top -->

    <div id="con1" class="tab_con">
      <!-- con1 -->

      <div v-show="curSymbol.symbol == ''" class="deposit_area5">
        <!-- deposit_area5 -->
        {{ $t('selectyourwallet') }}
      </div>
      <div v-show="curSymbol.symbol != ''" id="dep5" class="deposit_area5" style="padding-bottom: 10px">
        <!-- deposit_area5 -->
        <p class="st1">
          <img v-if="curSymbol.symbol != ''" class="circle" src="~/assets/images/coin/btc.png" :alt="$t('refresh')" :title="$t('refresh')" @click="onBlock(curSymbol.symbol, curSymbol.tokenType)" />
        </p>
        <p class="st2">{{ $t('assets') }}</p>
        <p class="st3">
          <span
            v-show="curSymbol.symbol == 'KDP' || curSymbol.symbol == 'KRW' || curSymbol.symbol == 'KDMP'"
            count-up
            duration="0.8"
            decimals="2"
            start-val="0"
            end-val="curSymbol.dpoQty"
            filter="toFixKRW"
          ></span>
          <span
            v-show="curSymbol.symbol != 'KDP' && curSymbol.symbol != 'KRW' && curSymbol.symbol != 'KDMP'"
            count-up
            duration="0.8"
            decimals="8"
            start-val="0"
            end-val="curSymbol.dpoQty"
            filter="toFix"
          ></span>

          <span v-show="curSymbol.dpoPdngQty != 0" :class="{ red: curSymbol.dpoPdngQty > 0, blue: curSymbol.dpoPdngQty < 0 }">
            (<span count-up duration="0.8" decimals="8" start-val="0" end-val="curSymbol.dpoPdngQty"></span>)
          </span>
        </p>
        <p
          v-show="
            curSymbol.symbol != 'KRW' &&
            curSymbol.symbol != 'KDMP' &&
            (!showCoin ||
              curSymbol.symbol == 'KDA' ||
              curSymbol.symbol == 'DPN' ||
              curSymbol.symbol == 'METAC' ||
              curSymbol.symbol == 'AGO' ||
              curSymbol.symbol == 'SLT' ||
              curSymbol.symbol == 'COOP' ||
              curSymbol.symbol == 'MCVW' ||
              curSymbol.symbol == 'VVC' ||
              curSymbol.symbol == 'MPC' ||
              curSymbol.symbol == 'CSC' ||
              curSymbol.symbol == 'EDIEN' ||
              curSymbol.symbol == 'KOC' ||
              curSymbol.symbol == 'STC' ||
              curSymbol.symbol == 'BTR' ||
              curSymbol.symbol == '520')
          "
          class="st4"
        >
          <span count-upprice duration="0.8" decimals="0" start-val="0" end-val="curSymbol.dpoQty" filter-val="curSymbol.lastPrice"></span>
          <span v-show="curSymbol.dpoPdngQty != 0" :class="{ red: curSymbol.dpoPdngQty > 0, blue: curSymbol.dpoPdngQty < 0 }">
            (<span count-upprice duration="0.8" decimals="0" start-val="0" end-val="curSymbol.dpoPdngQty" filter-val="curSymbol.lastPrice"></span>)
          </span>
        </p>
        <div id="viewRightDetail">
          <!-- <div v-show="curSymbol.symbol != 'KRW' && curSymbol.symbol != 'KDP' && curSymbol.symbol != 'KDA' && curSymbol.ableQty != 0"> -->
          <div v-show="curSymbol.symbol != 'KDP' && curSymbol.ableQty != 0">
            <div v-show="curSymbol.symbol != 'KRW' && curSymbol.symbol != 'KDMP'">
              <p class="st2">{{ $t('transferablequantity') }}</p>
              <p class="st3">
                <span count-up duration="0.8" decimals="8" start-val="0" end-val="curSymbol.ableQty"></span>
              </p>
            </div>
            <div v-show="curSymbol.symbol == 'KRW'">
              <p class="st2">{{ $t('withdrawableQuantity') }}</p>
              <p class="st3">
                <span count-up duration="0.8" decimals="2" start-val="0" end-val="curSymbol.ableQty"></span>
              </p>
            </div>

            <p v-show="curSymbol.shortMnthQty != '0'" class="st2">{{ $t('unfinishedamount') }}</p>
            <p v-show="curSymbol.shortMnthQty != '0'" class="st3">
              <span count-up duration="0.8" decimals="8" start-val="0" end-val="curSymbol.shortMnthQty"></span>
            </p>
          </div>
          <!--
          <div v-show="curSymbol.symbol == 'KDA'" data-tooltip-text="{{$t( 'QuantitiesMinedRewarded' )}}">
          -->
          <div v-show="curSymbol.symbol == 'KDA'">
            <p class="st2">{{ $t('ExchangeableQuantity') }}</p>
            <p class="st3">
              <span count-up duration="0.8" decimals="8" start-val="0" end-val="curSymbol.KDAblockQty"></span>
            </p>
          </div>
          <div v-show="curSymbol.symbol == 'MCVW'">
            <p class="st2">MCV-Token</p>
            <p class="st3">
              <span count-up duration="0.8" decimals="8" start-val="0" end-val="curSymbol.KDAblockQty"></span>
            </p>
          </div>
          <div v-show="curSymbol.symbol == 'VVC'">
            <p class="st2">VVC-Point</p>
            <p class="st3">
              <span count-up duration="0.8" decimals="8" start-val="0" end-val="curSymbol.KDAblockQty"></span>
            </p>
          </div>
        </div>
        <div v-show="curSymbol.symbol == 'KDA'" class="btns mt20">
          <!--
          <a href="javascript:void(0)" class="b1" data-tooltip-text="{{$t( 'coinsNotYetTransferred' )}}" @click="receiveKDA()">{{ $t('ExchangeApplication') }}</a>
          -->
          <a href="javascript:void(0)" class="b1" @click="receiveKDA()">{{ $t('ExchangeApplication') }}</a>
        </div>
        <div v-show="curSymbol.symbol != 'KRW' && curSymbol.symbol != 'KDP' && curSymbol.symbol != 'KDMP'" class="btns mt20">
          <a v-show="curSymbol.point < 0 && curSymbol.symbol != '520'" href="javascript:void(0)" class="b1 layer_btn212213" @click="sendAlert()">{{ $t('send') }}</a>

          <a v-show="curSymbol.point >= 0 && curSymbol.symbol != 'TRX'" href="javascript:void(0)" class="b1 layer_btn2" @click="sendWindowOpen()">{{ $t('send') }}</a>
          <!-- <a href="javascript:void(0)" class="b1 layer_btn211111" v-show="curSymbol.point >= 0 && curSymbol.symbol != 'TRX'" @click="blockSend();">{{$t( 'send' )}}</a> -->

          <a v-show="curSymbol.point >= 0 && curSymbol.symbol == 'TRX'" href="javascript:void(0)" class="b1 layer_btn211111" @click="notAuto()">{{ $t('send') }}</a>

          <a href="javascript:void(0)" class="b2 layer_btn3" @click="receiveWindowOpen()">{{ $t('receive') }}</a>
        </div>
        <div v-show="curSymbol.symbol == 'KRW'" class="btns mt20">
          <div v-show="userInfo.userLevel < 3">
            <a href="javascript:void(0)" class="b1 layer_btn611" @click="confirmCert3()">{{ $t('withdraw') }}</a>
            <a href="javascript:void(0)" class="b2 layer_btn711" @click="confirmCert3()">{{ $t('deposit') }}</a>
          </div>

          <div v-show="userInfo.userLevel > 2">
            <a href="javascript:void(0)" class="b1 layer_btn6" @click="sendKRWOpen()">{{ $t('withdraw') }}</a>
            <a href="javascript:void(0)" class="b2 layer_btn7" @click="receiveKRWOpen()">{{ $t('deposit') }}</a>
          </div>
        </div>
        <div v-show="curSymbol.symbol == 'KDP'" class="btns mt20">
          <a href="javascript:void(0)" class="b1 layer_btn5" @click="exPointWindowOpen()">{{ $t('charge') }}</a>
        </div>
        <div v-show="curSymbol.symbol == 'KDMP'" class="btns mt20">
          <a href="javascript:void(0)" class="b1 layer_btn8" @click="exPointWindowOpen()">{{ $t('charge') }}</a>
          <a href="javascript:goKdaMall()" class="b1">KDA MALL</a>
        </div>
        <div v-show="curSymbol.symbol == 'MCVW'" class="btns mt20">
          <a href="javascript:void(0)" class="b1 layer_btn2" @click="holdingWindowOpen()">홀딩</a>
        </div>
        <div v-show="curSymbol.symbol == 'MPC'" class="btns mt20">
          <a href="javascript:void(0)" class="b1 layer_btn2" @click="mongsendWindowOpen()">mongplus 입금</a>
        </div>
        <div v-show="curSymbol.symbol == 'ETH'" class="btns mt20">
          <!-- <a href="javascript:void(0)" class="b3 layer_btn4">Custom Token 추가</a> -->
          <a href="javascript:void(0)" class="b3 layer_btn4" @click="CustomTokenOpen()">{{ $t('customtokenmanagement') }}</a>
        </div>

        <a class="viewRight on" href="javascript:void(0)">{{ $t('Fold') }}</a>
      </div>
      <!-- // deposit_area5 -->
      <div id="deposit_area4_loading">
        <img src="/assets/js/plugins/loader/images/ownageLoader/loader2.gif" />
      </div>
      <div v-show="curSymbol.symbol != ''" class="deposit_area4 mCustomScrollbar">
        <ul>
          <!--
          <li v-for="list in walletRcpyList | orderBy:['-time', 'buho']" @click="goTx(list.txAddr)">
          -->
          <li v-for="list in walletRcpyList" :key="list" @click="goTx(list.txAddr)">
            <div class="l">
              <p class="st1">{/ list.time | dateTimeText /}</p>
              <p class="st2">[{/ rcpyComment[list.comment] /}] {/ curSymbol.symbol /} {{ $t('wallet') }} {/ rcpyBuho[list.buho] /}</p>
            </div>
            <div class="r">
              <p class="st1">
                <span v-show="list.txStatus == '1'" class="small_btn confirm">Confirm</span>
                <span v-show="list.txStatus == '2'" class="small_btn pending">Pending</span>
                <span v-show="list.txStatus == '9'" class="small_btn fail">Fail</span>
              </p>
              <p class="st2" :class="{ blue: list.buho == '2', red: list.buho == '1' }">{/ list.setAmount | toFixBoth:curSymbol.symbol /}</p>
            </div>
          </li>
          <li v-show="walletRcpyList.length < 1">
            <p style="text-align: center">
              {{ $t('nowalletdepositdetails') }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!-- // con1 -->
  </div>
  <!-- // right_area -->
</template>
<script>
export default {
  name: 'MyWallet',
  data() {
    return {
      curSymbol: {
        symbol: '',
        in: ''
      },
      userInfo: {
        userLevel: ''
      },
      walletRcpyList: {
        length: ''
      },
      showCoin: ''
    }
  }
}
</script>
