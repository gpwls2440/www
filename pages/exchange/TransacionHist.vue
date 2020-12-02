<template>
  <div class="exchange2_Left_bottom">
    <!-- exchange2_Left_bottom -->
    <div id="tab_btn3" class="ex_tab3">
      <!-- tab_btn3 -->
      <ul>
        <li class="active">
          <a href="#con7">{{ $t('depthChart') }}</a>
        </li>
        <li>
          <a href="#MatchingList" @click="showTab('#MatchingList')">{{ $t('tradehistory') }}</a>
        </li>
        <li>
          <a href="#MatchingReady" @click="showTab('#MatchingReady')">{{ $t('openorders') }}</a>
        </li>
      </ul>
      <a href="javascript://" class="slideup_btn2"><img src="/assets/img/ex_btn_off.gif" alt="" /></a>
    </div>
    <!-- // tab_btn3 -->

    <div id="con7" class="tab_con3 ex_con3">
      <!-- con7 -->
      <div id="depth_chart" style="width: 100%; height: 100%"></div>
    </div>
    <!-- // con7 -->

    <div id="MatchingList" class="tab_con3 ex_con3">
      <!-- con8 -->
      <div v-show="userLevel < 1" style="text-align: center; padding: 20px; font-size: 16px">
        <p class="st1">
          <a href="/auth/login"
            ><span class="pointColor">{{ $t('login') }}</span></a
          >
          {{ $t('or') }}
          <a href="javascript:go_join();"
            ><span class="pointColor">{{ $t('signup') }}</span></a
          >
          {{ $t('isrequired') }}
        </p>
      </div>
      <div v-show="userLevel > 1" class="ex_table_type3 mCustomScrollbar">
        <!-- ex_table_type1 mCustomScrollbar -->
        <table>
          <colgroup>
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
          </colgroup>
          <tbody>
            <tr>
              <th class="tl">
                <span style="padding-left: 10px">{{ $t('coinname') }}/{{ $t('date') }}</span>
              </th>
              <th class="tr">{{ $t('tradeamount') }}</th>
              <th class="tr">{{ $t('tradeprice') }}</th>
              <th class="tr">{{ $t('asktotal') }}</th>
            </tr>
            <tr v-for="ml in matchingList" :key="ml">
              <td class="st1 tl">
                <span class="wColor">{/ ml.instCd | cutSimbol /} / {/ ml.instCd | cutMarket /}</span>
                <span :class="{ red: ml.byslTp == 'B', blue: ml.byslTp == 'S' }">{/ ml.byslTp | buySellType /}</span><br />
                <p class="gray">{/ ml.mtchTime | dateTimeText /}</p>
              </td>
              <td><span :class="{ red: ml.byslTp == 'B', blue: ml.byslTp == 'S' }">{/ ml.mtchQty /}</span> {/ ml.instCd | cutSimbol /}</td>
              <td><span :class="{ red: ml.byslTp == 'B', blue: ml.byslTp == 'S' }">{/ ml.mtchPrc | toFix:this /}</span> {/ market /}</td>
              <td><span :class="{ red: ml.byslTp == 'B', blue: ml.byslTp == 'S' }">{/ ml.mtchQty | calcPrice:ml.mtchPrc | toFix:this /}</span> {/ market /}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- // ex_table_type1 mCustomScrollbar -->
    </div>
    <!-- // con8 -->
    <div id="MatchingReady" class="tab_con3 ex_con3">
      <!-- con9 -->
      <div v-show="userLevel < 1" style="text-align: center; padding: 20px; font-size: 16px">
        <p class="st1">
          <a href="/auth/login"
            ><span class="pointColor">{{ $t('login') }}</span></a
          >
          {{ $t('or') }}
          <a href="javascript:go_join();"
            ><span class="pointColor">{{ $t('signup') }}</span></a
          >
          {{ $t('isrequired') }}
        </p>
      </div>
      <form id="frmOrderCancle">
        <input type="hidden" name="oriOrderNo" />
        <input type="hidden" name="cancleOrderQty" />
        <input type="hidden" name="simbol" value="{/ oriSimbol /}" />
        <input type="hidden" name="waysType" value="W" />
      </form>
      <div v-show="userLevel > 1" class="ex_table_type3 mCustomScrollbar">
        <!-- ex_table_type1 mCustomScrollbar -->
        <table>
          <colgroup>
            <col style="width: * %" />
            <col style="width: 11%" />
            <col style="width: 20%" />
            <col style="width: 16%" />
            <col style="width: 16%" />
            <col style="width: 13%" />
          </colgroup>
          <tbody>
            <tr>
              <th>{{ $t('orderdate') }}</th>
              <th>{{ $t('type') }}</th>
              <th class="tr">{{ $t('orderprice') }}</th>
              <th class="tr">{{ $t('orderamount') }}</th>
              <th class="tr">{{ $t('unfinishedamount') }}</th>
              <th>{{ $t('cancel') }}</th>
            </tr>
            <tr v-for="mr in matchingReady" :key="mr">
              <td class="tc"><span class="st1">{/ mr.ordrTime | dateTimeText /}</span></td>
              <td class="tc" :class="{ red: mr.byslTp == 'B', blue: mr.byslTp == 'S' }">{/ mr.byslTp | buySellType /}</td>
              <td>
                {/ mr.ordrPrc | toFix:this /}
                <p class="won_price" ng-if="market != 'KRW'">{/ basicPrice | calcPrice:mr.ordrPrc /}<span>KRW</span></p>
              </td>
              <td>{/ mr.ordrQty /}</td>
              <td>{/ mr.remnQty /}</td>
              <td class="tc">
                <a style="cursor: pointer" class="ex_table_btn1" @click="orderCancle(mr.ordrNo, mr.remnQty)">{{ $t('cancel') }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- // ex_table_type1 mCustomScrollbar -->
    </div>
    <!-- // con9 -->
  </div>
  <!-- // exchange2_Left_bottom -->
</template>
<script>
export default {
  name: 'TransacionHist',
  data() {
    return {}
  }
}
</script>
