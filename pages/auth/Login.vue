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
                <a id="custom-login-btn" href="javascript:loginWithKakao()"><img src="~/assets/images/ico_log1.png" :alt="$t('kakaotalk')" /></a>
              </li>
              <li>
                <div id="gSignInWrapper">
                  <span class="label"></span>
                  <div id="customBtn" class="customGPlusSignIn">
                    <span class="icon"></span>
                    <span class="buttonText"></span>
                  </div>
                </div>
                <!-- <div id="name"></div> -->
              </li>
              <li>
                <a id="custom-login-btn" href="javascript:loginNaver()"><img src="~/assets/images/ico_log4.png" alt="네이버" /></a>
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
              numberOnly="true"
              type="text"
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
    <modal v-if="showModal" @close="stepChange">
      <p slot="body">{{ text }}</p>
    </modal>
  </div>
  <!-- // container3 -->
</template>
<script>
import '@/assets/css/auth.css'
import { Login, LoginCertProc } from '~/api/auth'
import Modal from '~/components/Modal'

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
      level: '',
      certNumber: '',
      pgwBrowser: ''
    }
  },
  mounted() {
    $('.con_slider').bxSlider({
      mode: 'fade',
      pause: 5000,
      auto: true
    })
  },
  methods: {
    goLogin() {
      const vm = this
      if (!vm.userId || !vm.userPw) {
        vm.showModal = true
        vm.text = '아이디 또는 패스워드를 입력해주세요'
      } else {
        Login(vm.userId, vm.userPw).then(res => {
          vm.showModal = true
          vm.text = res.data.resultMsg
          vm.level = res.data.level
          vm.uid = res.data.uid
          if (res.data.result === '2FACT') {
            // vm.step = '2'
          }
        })
      }
    },
    stepChange() {
      this.showModal = false
      this.setCertTimeout()
      this.step = '2'
    },
    goCertLogin() {
      const vm = this
      LoginCertProc(vm.certNumber, vm.uid, vm.level, '').then(res => {
        if (res.data === 'OK') {
          vm.showModal = true
          vm.text = '로그인 성공'
          this.$router.push('/')
        }
      })
    },
    setFocus() {
      this.$refs.userId.focus()
    },
    getPgwBrowser() {
      const pgwBrowser = jQuery.pgwBrowser()
      const bwText = pgwBrowser.os.name + ' (' + pgwBrowser.browser.name + ' ' + pgwBrowser.browser.fullVersion + ')'
      // $('#bw').val(bwText)
      return bwText
    },
    setCertTimeout() {
      let certTimeMethod = ''
      let certTime = 180
      // let certloginChk = true
      clearInterval(certTimeMethod)

      certTimeMethod = setInterval(function () {
        certTime = certTime - 1
        const certMin = parseInt(certTime / 60)
        let certSec = parseInt(certTime % 60)

        if (certSec < 10) {
          certSec = '0' + certSec
        }

        $('#certMin').text(certMin)
        $('#certSec').text(certSec)

        String(certMin)
        String(certSec)
        if (certMin === '0' && certSec === '00') {
          clearInterval(certTimeMethod)
          // certloginChk = true
          $('#btnCert').hide()
          $('#cert_re').show()
        }
      }, 1000)
    }
  }
}
</script>
