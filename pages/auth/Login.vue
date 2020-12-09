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
        <div id="login" class="login" style="margin-top: 30px">
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
            {{ $t('notYetMember') }} <a href="javascript:go_join();">{{ $t('signup') }}</a>
          </p>
        </div>
        <div id="certLogin" class="login" style="margin-top: 30px">
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
              name="certNumber"
              class="loginInput isPw"
              numberOnly="true"
              type="text"
              required
              maxlength="6"
              :placeholder="$t('certificationNumberInput')"
              :title="$t('certificationNumberInput')"
              style="ime-mode: disabled"
              @keyup="enterEvent(this, 2)"
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
import { Login } from '~/api/auth'
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
      text: ''
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
        this.showModal = true
        this.text = '아이디 또는 패스워드를 입력해주세요'
      } else {
        Login(vm.userId, vm.userPw).then(res => {
          this.showModal = true
          this.text = res.data.resultMsg
          if (res.data.reult.result === '2FACT') {
          }
        })
      }
    },
    setFocus() {
      this.$refs.userId.focus()
    }
  }
}
</script>
