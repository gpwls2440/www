<template>
  <div id="tab_btn2" class="ex_tab2">
    <ul id="tab_btn2_ul">
      <li :class="{ active: priceType == '2' }">
        <a href="#con5" @click="typeChange('2')">{{ $t('designatedamount') }}</a>
      </li>
      <li :class="{ '': priceType == '2' }">
        <a href="#con5" @click="notworking()">{{ $t('marketprice') }}</a>
      </li>
      <li>
        <a href="#con8" @click="typeChangeMaching('2')">{{ $t('tradehistory') }}</a>
      </li>
      <li>
        <a href="#con7" @click="typeChangeMaching('1')">{{ $t('openorders') }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'OrderTab',
  data() {
    return {}
  }
}
</script>
