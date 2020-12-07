<template>
  <div id="wrapper2">
    <div id="fullpage">
      <div id="section0" class="section">
        <div class="inner">
          <div v-cloak id="container2">
            <!-- container2 -->
            <div id="live_section">
              <!-- 차트 영역-->
              <chart></chart>
              <div id="right_section">
                <!-- 호가, 주문 영역 -->
                <hoga></hoga>
                <!-- 주문, 체결, 미체결내역-->
                <div id="OrderAddCtrl" class="bot">
                  <!-- bot -->
                  <order></order>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chart from './Chart'
import hoga from './Hoga'
import order from './Order'
import '@/assets/css/chart.css'

export default {
  layout: 'darkLayout',
  components: {
    chart,
    hoga,
    order
  },
  data() {
    return {}
  }
}
</script>
