<template>
  <div id="BottomTabCtrl" class="exchange3_bottom">
    <div id="tab_btn4" class="ex_tab3">
      <!-- tab_btn3 -->
      <ul>
        <li :class="{ active: bottomTab == 'tickList' }">
          <a href="#tickList" @click="typeChange('tickList')">{{ $t('matchinghistory') }}</a>
        </li>
        <li :class="{ active: bottomTab == 'coinSocial' }">
          <a href="#coinSocial" @click="typeChange('coinSocial')">{{ $t('coinpost') }}</a>
        </li>
        <li :class="{ active: bottomTab == 'coinInfomation' }">
          <a href="#coinInfomation" @click="typeChange('coinInfomation')">{{ $t('coinexplanation') }}</a>
        </li>
      </ul>
      <a href="javascript://" class="slideup_btn4"><img src="/assets/img/ex_btn_off.gif" alt="" /></a>
    </div>
    <!-- // tab_btn3 -->

    <div id="tickList" class="tab_con4 ex_con4">
      <!-- con10 -->
      <div class="ex_table_type3 mCustomScrollbar" style="height: 320px">
        <!-- ex_table_type1 mCustomScrollbar -->
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 25%" />
            <col style="width: 28%" />
            <col style="width: 27%" />
          </colgroup>
          <tbody>
            <tr>
              <th>{{ $t('matchingtime') }}</th>
              <th class="tr">{{ $t('matchingprice') }}</th>
              <th class="tr">{{ $t('matchingamount') }}</th>
              <th class="tr">{{ $t('matchingtotal') }}</th>
            </tr>
            <tr v-for="tick in tickList" :key="tick" @click="setPrice(tick.mtchPrc)">
              <td class="tc">{/ tick.mtchTime | dateTimeText /}</td>
              <td class="tr"><span style="font-weight: bold" :class="{ red: tick.updnSign == '1', blue: tick.updnSign == '-1' }">{/ tick.mtchPrc | toFix:this /}</span> {/ market /}</td>
              <td class="tr"><span :class="{ red: tick.preUpdnSign == '1', blue: tick.preUpdnSign == '-1' }">{/ tick.mtchQty | toFixAmount /}</span> {/ simbol /}</td>
              <td class="tr"><span>{/ tick.mtchAmt | toFix:this /}</span> {/ market /}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- // ex_table_type1 mCustomScrollbar -->
    </div>
    <!-- // con10 -->

    <div id="coinSocial" class="tab_con4 ex_con4">
      <!-- con11 -->
    </div>
    <!-- // con11 -->
    <div id="coinInfomation" class="tab_con4 ex_con4">
      <!-- con12 -->
    </div>
    <!-- // con12 -->
  </div>
</template>
<script>
export default {
  name: 'TradeHist',
  data() {
    return {}
  }
}
</script>
