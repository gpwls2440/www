<template>
  <div id="BottomTabCtrl" class="exchange3_bottom">
    <div id="tab_btn4" class="ex_tab3">
      <!-- tab_btn3 -->
      <ul>
        <li :class="{ active: tab == '1' }">
          <a @click="tabChange('1')">{{ $t('matchinghistory') }}</a>
        </li>
        <li :class="{ active: tab == '2' }">
          <a @click="tabChange('2')">{{ $t('coinpost') }}</a>
        </li>
        <li :class="{ active: tab == '3' }">
          <a @click="tabChange('3')">{{ $t('coinexplanation') }}</a>
        </li>
      </ul>
      <a href="javascript://" class="slideup_btn4"><img src="~/assets/images/ex_btn_off.gif" alt="" /></a>
    </div>
    <!-- // tab_btn3 -->

    <div v-if="tab == '1'" id="tickList" class="tab_con4 ex_con4">
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
            <tr v-for="(tick, index) in tickList" :key="index" @click="setPrice(tick.mtchPrc)">
              <td class="tc">{{ tick.mtchTime | dateAndTimeFilter }}</td>
              <td class="tr">
                <span style="font-weight: bold" :class="{ red: tick.updnSign == '1', blue: tick.updnSign == '-1' }">{{ tick.mtchPrc | commaFilter }}</span> {{ market }}
              </td>
              <td class="tr">
                <span :class="{ red: tick.preUpdnSign == '1', blue: tick.preUpdnSign == '-1' }">{{ tick.mtchQty }}</span> {{ symbol }}
              </td>
              <td class="tr">
                <span>{{ tick.mtchAmt | commaFilter }}</span> {{ market }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- // ex_table_type1 mCustomScrollbar -->
    </div>
    <!-- // con10 -->

    <div v-if="tab == '2'" id="coinSocial" class="tab_con4 ex_con4">
      <!-- con11 -->
      코인소셜
    </div>
    <!-- // con11 -->
    <div v-if="tab == '3'" id="coinInfomation" class="tab_con4 ex_con4">
      코인설명
      <!-- con12 -->
    </div>
    <!-- // con12 -->
  </div>
</template>
<script>
import { tickList } from '~/api/exchange'
export default {
  name: 'TradeHist',
  data() {
    return {
      tab: '1',
      market: 'KRW',
      symbol: 'BTC',
      tickList: []
    }
  },
  mounted() {
    this.getTickList()
  },
  methods: {
    tabChange(tab) {
      const vm = this
      vm.tab = tab
    },
    getTickList() {
      const vm = this
      tickList(vm.symbol).then(res => {
        vm.tickList = res.data
      })
    }
  }
}
</script>
