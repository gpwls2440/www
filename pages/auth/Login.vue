<template>
  <div id="container3">
    <!-- container3 -->
    <div class="con_visual_h1">
      <!-- con_visual_h1 -->
      <div class="inner">
        <ul class="con_slider">
          <li>
            <img src="~/assets/images/login_bg.jpg" alt="" />
          </li>
          <li>
            <img src="~/assets/images/bg_mem2.jpg" alt="" />
          </li>
        </ul>
      </div>
    </div>
    <!-- // con_visual_h1 -->
    <div class="login_div">
      <!-- login_div -->
      <div class="inner">
        <div class="tit">
          <img src="~/assets/images/log_tit1.png" :alt="$t('hello1')" />
          <p style="margin-top: 20px; text-align: center; color: #fff; font-size: 20px; line-height: 30px">{{ $t('mainInfo01') }} <br />{{ $t('mainInfo02') }}</p>
        </div>
        <div v-if="step == '1'" id="login" class="login" style="margin-top: 30px">
          <!--
          <input type="hidden" name="ip" :value="ip" />
          -->
          <div class="input_line">
            <img src="~/assets/images/ico_inp1.png" alt="" />
            <input id="userId" ref="userId" v-model="userId" name="userId" class="loginInput isId reqInput" type="text" required placeholder="이메일 아이디" :title="$t('ID')" />
          </div>
          <div class="input_line">
            <img src="~/assets/images/ico_inp2.png" alt="" />
            <input id="userPw" v-model="userPw" name="userPw" class="loginInput isPw reqInput" type="password" required :placeholder="$t('password')" :title="$t('password')" />
          </div>
          <button type="button" class="btn_login" @click="goLogin()">{{ $t('login') }}</button>
          <div class="sim_login_h1">
            <!-- sim_login_h1 -->
            <p class="txt">{{ $t('easyLogin') }}</p>
            <ul>
              <li>
                <a id="custom-login-btn" @click="notWorking()"><img src="~/assets/images/ico_log1.png" :alt="$t('kakaotalk')" /></a>
              </li>
              <li>
                <div id="gSignInWrapper">
                  <span class="label"></span>
                  <div id="customBtn" class="customGPlusSignIn">
                    <span class="icon" @click="notWorking()"></span>
                    <span class="buttonText"></span>
                  </div>
                </div>
                <!-- <div id="name"></div> -->
              </li>
              <li>
                <a id="custom-login-btn" @click="notWorking()"><img src="~/assets/images/ico_log4.png" alt="네이버" /></a>
              </li>
              <li><div id="naver_id_login"></div></li>
              <li style="display: none"><div id="naver_id_login"></div></li>
            </ul>
          </div>
          <!-- // sim_login_h1 -->
          <ul class="my_search_h1">
            <!-- my_search_h1 -->
            <li>
              <a href="/auth/findId">{{ $t('findEmail') }}</a>
            </li>
            <li>
              <a href="/auth/findPw">{{ $t('findPassword') }}</a>
            </li>
          </ul>
          <!-- // my_search_h1 -->
          <p class="log_txt">
            {{ $t('notYetMember') }} <a href="/auth/signup">{{ $t('signup') }}</a>
          </p>
        </div>
        <div v-if="step == '2'" id="certLogin" class="login" style="margin-top: 30px">
          <p style="font-size: 14px; color: #fff; margin-bottom: 10px; text-align: center">{{ $t('enterVerificationNumber') }}</p>
          <input id="uid" type="hidden" name="uid" />
          <input id="level" type="hidden" name="level" />
          <!--
          <input type="hidden" name="ip" :value="ip" />
          -->
          <input id="bw" type="hidden" name="bw" value="" />
          <div class="input_line">
            <img src="~/assets/images/ico_inp2.png" alt="" />
            <input
              id="certNumber"
              v-model="certNumber"
              name="certNumber"
              class="loginInput isPw"
              type="number"
              required
              maxlength="6"
              :placeholder="$t('certificationNumberInput')"
              :title="$t('certificationNumberInput')"
              style="ime-mode: disabled"
            />
            <input id="" name="" type="text" style="display: none" />
          </div>
          <button id="btnCert" type="button" class="btn_login" @click="goCertLogin()">{{ $t('certificationNumberInput') }} (<span id="certMin">3</span>:<span id="certSec">00</span>)</button>
          <p id="cert_re" style="margin-top: 10px; display: none">
            <button type="button" class="btn_login" @click="goReLogin()">{{ $t('resendCertificationNumber') }}</button>
          </p>
        </div>
      </div>
    </div>
    <!-- // login_div -->
    <modal v-if="showModal" @close="showModal = false">
      <p slot="body">{{ text }}</p>
    </modal>
  </div>
  <!-- // container3 -->
</template>
<script>
import '@/assets/css/auth.css'
import { mapMutations, mapGetters } from 'vuex'
import { Login, LoginCertProc, CertReSend } from '~/api/auth'
import Modal from '~/components/Modal'
// import 'pgwbrowser/pgwbrowser.js'

export default {
  name: 'Login',
  components: {
    Modal
  },
  data() {
    return {
      userId: '',
      userPw: '',
      showModal: false,
      text: '',
      step: '1',
      // level: '',
      uid: '',
      certNumber: '',
      pgwBrowser: '',
      result: '',
      certTimeMethod: ''
      // sessionId: ''
    }
  },
  computed: {
    ...mapGetters(['getUid', 'getSessionId', 'getUserLevel'])
  },
  mounted() {
    $('.con_slider').bxSlider({
      mode: 'fade',
      pause: 5000,
      auto: true
    })
    // console.log(this.getPgwBrowser())
  },
  methods: {
    ...mapMutations(['setUid', 'setSessionId', 'setUserLevel']),
    goLogin() {
      const vm = this
      if (!vm.userId || !vm.userPw) {
        vm.showModal = true
        vm.text = '아이디 혹은 패스워드를 입력해주세요.'
      } else {
        Login(vm.userId, vm.userPw).then(res => {
          vm.result = res.data.result
          vm.showModal = true
          if (vm.result !== 'Fail') {
            vm.uid = res.data.uid
            vm.setUid(vm.uid)
            vm.setSessionId(res.data.sessionId)
            vm.setUserLevel(res.data.level)
            if (this.result === '2FACT') {
              vm.text = res.data.resultMsg
              vm.setCertTimeout()
              this.step = '2'
            } else if (this.result === 'LEVEL1') {
              vm.text = vm.$t('loginMsg01') + vm.$t('loginMsg02')
              this.$router.push('/')
            }
          } else {
            vm.text = '다시 시도해주세요'
          }
        })
      }
    },
    modalClose() {
      this.showModal = false
    },
    goCertLogin() {
      const vm = this
      if (!vm.certNumber) {
        vm.showModal = true
        vm.text = '인증번호를 입력해주세요.'
      } else {
        LoginCertProc(vm.certNumber, vm.getUid, vm.getUserLevel, '').then(res => {
          if (res.data === 'OK') {
            vm.showModal = true
            vm.text = '로그인에 성공하였습니다.'
            this.$router.push('/')
          } else {
            vm.showModal = true
            vm.text = '인증번호를 다시 확인해주세요.'
          }
        })
      }
    },
    setFocus() {
      this.$refs.userId.focus()
    },
    getPgwBrowser() {
      const pgwBrowser = $.pgwBrowser()
      console.log('pgwBrowser: ' + pgwBrowser)
      const bwText = pgwBrowser.os.name + ' (' + pgwBrowser.browser.name + ' ' + pgwBrowser.browser.fullVersion + ')'
      return bwText
    },
    setCertTimeout() {
      let certTime = 180
      // let certloginChk = true
      this.claerTimeout()

      this.certTimeMethod = setInterval(function () {
        certTime = certTime - 1
        const certMin = parseInt(certTime / 60)
        let certSec = parseInt(certTime % 60)

        if (certSec < 10) {
          certSec = '0' + certSec
        }

        $('#certMin').text(certMin)
        $('#certSec').text(certSec)

        if (certMin.toString() === '2' && certSec.toString() === '50') {
          // this.claerTimeout()
          // certloginChk = true
          $('#btnCert').hide()
          $('#cert_re').show()
        }
      }, 1000)
    },
    claerTimeout() {
      clearInterval(this.certTimeMethod)
    },
    goReLogin() {
      const vm = this
      vm.setCertTimeout()
      CertReSend(vm.uid).then(res => {})
    }
  }
}
</script>
