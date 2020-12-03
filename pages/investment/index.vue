<template>
  <div id="container">
    <!-- container -->
    <div class="contents">
      <!-- contents -->
      <div class="line_box_h1">
        <!-- line_box_h1 -->
        <ul class="tab_type_h1">
          <!-- tab_type_h1 -->
          <li :class="tab === '1' ? 'w25 on' : 'w25'">
            <a @click.prevent="changeTab('1')">{{ $t('retainedcoin') }}</a>
          </li>
          <li :class="tab === '2' ? 'w25 on' : 'w25'">
            <a @click.prevent="changeTab('2')">{{ $t('tradehistory') }}</a>
          </li>
          <li :class="tab === '3' ? 'w25 on' : 'w25'">
            <a @click.prevent="changeTab('3')">{{ $t('unfinishedamount') }}</a>
          </li>
          <li :class="tab === '4' ? 'w25 on' : 'w25'">
            <a @click.prevent="changeTab('4')">{{ $t('returnoninvestment') }}</a>
            <ul class="depth2">
              <li class="on">
                <a href="javascript:void(0)">{{ $t('averageprofit/lossbydate') }}</a>
              </li>
              <li>
                <a href="javascript:void(0)">{{ $t('averageprofit/lossbyitem') }}</a>
              </li>
            </ul>
          </li>
        </ul>
        <!-- // tab_type_h1 -->
        <div class="info_con_h4 mt5">
          <component :is="investComponent"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/investment.css'
import MyCoin from './MyCoin'
import TransactionHist from './TransactionHist'
import NonTransactionHist from './NonTransactionHist'
import TransactionProfit from './TransactionProfit'

export default {
  components: {
    MyCoin,
    TransactionHist,
    NonTransactionHist,
    TransactionProfit
  },
  data() {
    return {
      tab: '1',
      investComponent: ''
    }
  },
  mounted() {
    const vm = this
    vm.investComponent = 'MyCoin'
  },
  methods: {
    changeTab(tab) {
      const vm = this
      vm.tab = tab
      if (tab === '1') {
        vm.investComponent = 'MyCoin'
      } else if (tab === '2') {
        vm.investComponent = 'TransactionHist'
      } else if (tab === '3') {
        vm.investComponent = 'NonTransactionHist'
      } else {
        vm.investComponent = 'TransactionProfit'
      }
    }
  }
}
</script>
