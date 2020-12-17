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
        <a v-if="getSessionId != ''" href="/mypage">{{ $t('mypage') }}</a>
        <a v-if="getSessionId != ''" @click="showModal = true">{{ $t('logout') }}</a>
        <a v-if="getSessionId == ''" href="/auth/signup">{{ $t('signup') }}</a>
        <a v-if="getSessionId == ''" href="/auth/login">{{ $t('login') }} {{ getSessionId }}</a>
        <a href="javascript:select_lang()" class="lang">한국어</a>
        <ul class="select_lang_box">
          <li><a href="javascript:void(0)">한국어</a></li>
          <li><a href="javascript:change_lang('en_US')">English</a></li>
        </ul>
      </div>
    </div>
    <div v-if="showModal" id="modal-window" style="position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 1050; overflow: auto; background-color: rgba(0, 0, 0, 0.35)">
      <div class="modal-box modal-type-inverted modal-size-normal modal-theme-atlant" style="position: absolute; top: 50%; left: 50%; margin-top: -85.5px; margin-left: -1066.5px">
        <div class="modal-inner">
          <div class="modal-title">
            <h3>KDEX 로그아웃</h3>
            <a class="modal-close-btn" @click="showModal = false"></a>
          </div>
          <div class="modal-text">
            <slot name="body">로그아웃 하시겠습니까?</slot>
          </div>
          <div class="modal-buttons">
            <a class="modal-btn" @click="showModal = false">{{ $t('cancel') }}</a>
            <a class="modal-btn btn-light-blue" @click="logout">{{ $t('logout') }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Logout } from '~/api/auth'
import '@/assets/css/jquery_modal.css'

export default {
  name: 'MainHeader',
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapGetters(['getSessionId'])
  },
  methods: {
    ...mapActions(['clearUserFunc']),
    logout() {
      const vm = this
      Logout().then(res => {
        if (res.data === 'OK') {
          console.log('in')
          vm.clearUserFunc('')
          console.log('getSessionId: ' + vm.getSessionId)
        }
      })
    }
  }
}
</script>
