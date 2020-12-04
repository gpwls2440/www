<template>
  <div id="header">
    <!-- header -->
    <div class="header_inner2">
      <!-- header_inner -->
      <h1 style="left: 30px">
        <a href="/"><img src="~/assets/images/logo.png" alt="KDEX" /></a>
      </h1>
      <div class="gnb">
        <ul>
          <li id="menuItem1">
            <a href="/exchange">{{ $t('coinExchange') }}</a>
          </li>
          <li id="menuItem2">
            <a href="/chart">{{ $t('kdexChart') }}</a>
          </li>
          <li id="menuItem4">
            <a href="/investment">{{ $t('investmentStatus') }}</a>
          </li>
          <li id="menuItem5">
            <a href="/wallet">{{ $t('walletManagement') }}</a>
          </li>
          <li id="menuItem6">
            <a href="/infomation">{{ $t('usageGuide') }}</a>
          </li>
          <li id="menuItem7">
            <a href="/customer">{{ $t('customerservice') }}</a>
          </li>
        </ul>
      </div>
      <div class="gnb_right">
        <a href="/mypage">{{ $t('mypage') }}</a>
        <a href="javascript:go_logout();">{{ $t('logout') }}</a>
        <a href="/auth/signup">{{ $t('signup') }}</a>
        <a href="/auth/login">{{ $t('login') }}</a>
        <a href="javascript:select_lang()" class="lang">한국어</a>
        <ul class="select_lang_box">
          <li><a href="javascript:void(0)">한국어</a></li>
          <li><a href="javascript:change_lang('en_US')">English</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainHeader'
}
</script>
