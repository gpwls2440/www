<template>
  <div id="container">
    <!-- container -->
    <div class="contents">
      <!-- contents -->
      <div class="con_layout5">
        <!-- con_layout5 -->
        <MyCoins></MyCoins>
        <MyWalletChart></MyWalletChart>
        <MyWallet></MyWallet>
      </div>
    </div>
  </div>
</template>

<script>
import MyCoins from './MyCoins'
import MyWalletChart from './MyWalletChart'
import MyWallet from './MyWallet'
import '@/assets/css/wallet.css'

export default {
  // middleware: 'authenticated',
  components: {
    MyCoins,
    MyWalletChart,
    MyWallet
  },
  data() {
    return {}
  }
}
</script>
<style>
.pointColor {
  color: #00b9b2;
  font-weight: bold;
}
.red {
  color: #e4292b !important;
}
.blue {
  color: #2c5ac1 !important;
}

.mCustomScrollbar {
  overflow: auto;
}

.applyList {
  height: 95px;
  overflow: auto;
  width: 440px;
  margin: 0 auto;
  margin-top: 20px;
}
.applyList p {
  margin-bottom: 10px;
}
.applyList table {
  width: 100%;
}
.applyList tr {
  border-bottom: 1px solid #eceef6;
}
.applyList th {
  padding: 8px 20px;
  background: #efefef;
}
.applyList td {
  padding: 5px 20px;
  text-align: center;
}
.applyList li .st1 {
  font-size: 13px;
  color: #8b90a6;
  width: 50%;
}
.applyList li .st2 {
  font-size: 15px;
  color: #444444;
  width: 30%;
}
.bk_list > ul > li {
  position: relative;
}
.wlt1ConLeftTextH2 {
  width: 300px;
  margin-left: 220px;
}
.viewRight {
  width: 30px;
  height: 20px;
  margin: 10px auto 0px;
  display: block;
  font-size: 0px;
  cursor: pointer;
}

.viewRight.on {
  background: url('/assets/img/btn_on.png') center center no-repeat;
}

.viewRight.off {
  background: url('/assets/img/btn_off.png') center center no-repeat;
}

.warning {
  background: url('/assets/img/icon_pkmark.png') no-repeat;
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-left: 5px;
  cursor: pointer;
}
</style>
