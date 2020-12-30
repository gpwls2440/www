<template>
  <div id="container3">
    <!-- container3 -->
    <div class="con_visual_h1">
      <!-- con_visual_h1 -->
      <div class="inner">
        <ul class="con_slider">
          <li>
            <img src="~/assets/images/bg_mem1.jpg" alt="" />
          </li>
          <li>
            <img src="~/assets/images/bg_mem2.jpg" alt="" />
          </li>
        </ul>
      </div>
    </div>
    <!-- // con_visual_h1 -->
    <div class="login_div2" style="margin-top: -40px">
      <!-- login_div2 -->
      <div class="inner">
        <p class="tit2">
          {{ $t('signup') }}
        </p>
        <div class="line_login">
          <div class="input_line">
            <img src="~/assets/images/ico_inp4.png" alt="" />
            <input id="inputNick" v-model="userNick" name="userName" class="joinInput isStr reqInput" type="text" required :placeholder="$t('nickName')" title="닉네임" @blur="nicknmChk" />
          </div>
          <p id="chkNick" class="t_wa">＊{{ $t('enterNickname') }}</p>
          <div class="input_line mt05">
            <img src="~/assets/images/ico_inp1.png" alt="" />
            <input id="userId" v-model="userId" name="userId" class="joinInput isId reqInput" type="text" required :placeholder="$t('previewEmail')" title="이메일" @blur="emailChk" />
          </div>
          <p id="chkMsg" class="t_wa">＊{{ $t('signUpEnterEmail') }}</p>
          <div class="input_line mt05 pw_area">
            <img src="~/assets/images/ico_inp2.png" alt="" />
            <input
              id="inputPw"
              v-model="userPwd"
              name="userPw"
              class="joinInput isPw reqInput"
              type="password"
              title="비밀번호"
              maxlength="20"
              :placeholder="$t('signUpPW')"
              required
              @change="pwdChk(userPwd)"
            />
          </div>
          <p id="pwCheckText" class="txt4">＊{{ $t('signUpPWsub1') }}</p>
          <div class="input_line pw_area">
            <img src="~/assets/images/ico_inp2.png" alt="" />
            <input
              id="inputPwCk"
              v-model="reUserPwd"
              name="reUserPwCk"
              class="joinInput isPw reqInput"
              type="password"
              maxlength="20"
              title="비밀번호 확인"
              :placeholder="$t('signUpPWChk')"
              required
              @change="rePwdChk(reUserPwd)"
            />
          </div>
          <p id="pwCheckText1" class="t_wa pw_area">＊{{ $t('signUpPWChksub1') }}</p>
          <div class="input_line mt05">
            <img src="~/assets/images/ico_inp3.png" alt="" />
            <input
              id="inputPhone"
              v-model="phoneNm"
              name="userMobile"
              class="joinInput reqInput"
              type="text"
              required
              maxlength="13"
              :placeholder="$t('signUpMobileNo')"
              title="휴대폰 번호"
              @keyup="autoHypenPhone(phoneNm)"
            />
          </div>
          <div class="input_line mt05">
            <img src="~/assets/images/ico_inp4.png" alt="" />
            <input id="inputRecom" v-model="recomId" name="recom" class="joinInput reqInput" type="text" :placeholder="$t('recommendedID')" title="추전인 아이디" />
          </div>
        </div>
        <div class="tc txt4">
          <input id="agreement" type="checkbox" value="1" name="agreement" /><label for="agreement">{{ $t('agreementAgree') }}</label>
          <a href="#" class="blue_tdu layer_btn1">{{ $t('viewFullArticle') }}</a>
        </div>
        <div id="html_element" class="g-recaptcha" data-sitekey="6LdsOHkUAAAAAGVF1iisCB8jK0JfmBapOgNYOUwU" style="margin-top: 10px"></div>
        <button type="button" class="btn_login" style="margin-top: 15px" @click="goJoin()">{{ $t('joinKdex') }}</button>
        <div class="tc txt5 mt15">
          {{ $t('alreadyMem') }} <a href="/auth/login" class="btn_blue">{{ $t('login') }}</a>
        </div>
      </div>
      <!-- // inner -->
    </div>
    <!-- // login_div2 -->
  </div>
  <!-- // container3 -->
</template>

<script>
import { NicknmChk, EmailChk, Signup } from '~/api/auth'
export default {
  name: 'SignupForm',
  data() {
    return {
      userNick: '',
      userId: '',
      userPwd: '',
      reUserPwd: '',
      phoneNm: '',
      recomId: '',
      chkNickNm: '',
      chkEmail: '',
      chkFlag1: 'N',
      chkFlag2: 'N',
      chkPhone: 'N'
    }
  },
  mounted() {},
  methods: {
    nicknmChk() {
      const vm = this
      if (vm.userNick.length < 3) {
        this.chkNickNm = 'N'
        $('#chkNick').text(this.$i18n.t('signUpNicknamesub1'))
        $('#chkNick').removeClass('blue')
        $('#chkNick').addClass('red')
      } else {
        NicknmChk(vm.userNick).then(res => {
          if (res.data === 'Y') {
            this.chkNickNm = 'N'
            $('#chkNick').text(this.$i18n.t('signUpNicknamesub2'))
            $('#chkNick').removeClass('blue')
            $('#chkNick').addClass('red')
          } else {
            this.chkNickNm = 'Y'
            $('#chkNick').removeClass('red')
            $('#chkNick').addClass('blue')
            $('#chkNick').text(this.$i18n.t('signUpNicknamesub3'))
          }
        })
      }
    },
    emailChk() {
      const vm = this
      const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      if (!regExp.test(vm.userId)) {
        this.chkEmail = 'N'
        $('#chkMsg').text(this.$i18n.t('signUpEmailsub1'))
        $('#chkMsg').removeClass('blue')
        $('#chkMsg').addClass('red')
      } else {
        EmailChk(vm.userId).then(res => {
          if (res.data === 'Y') {
            this.chkEmail = 'N'
            $('#chkMsg').text(this.$i18n.t('signUpEmailsub2'))
            $('#chkMsg').removeClass('blue')
            $('#chkMsg').addClass('red')
          } else {
            this.chkEmail = 'Y'
            $('#chkMsg').removeClass('red')
            $('#chkMsg').addClass('blue')
            $('#chkMsg').text(this.$i18n.t('signUpEmailsub3'))
          }
        })
      }
    },
    pwdChk(val) {
      if (!/^.*(?=.{8,20})(?=.*[0-9])(?=.*[A-Z]).*$/.test(val)) {
        $('#pwCheckText').text('영문, 숫자 혼합하여 8~20자리 이내로 입력하세요.')
        $('#pwCheckText').removeClass('blue')
        $('#pwCheckText').addClass('red')
        this.chkFlag1 = 'N'
      } else {
        $('#pwCheckText').text('안전한 비밀번호 입니다.')
        $('#pwCheckText').removeClass('red')
        $('#pwCheckText').addClass('blue')
        this.chkFlag1 = 'Y'
      }
    },
    rePwdChk(val) {
      if (val === this.userPwd) {
        $('#pwCheckText1').text('입력한 두 비밀번호가 일치합니다.')
        $('#pwCheckText1').removeClass('red')
        $('#pwCheckText1').addClass('blue')
        this.chkFlag2 = 'Y'
      } else {
        $('#pwCheckText1').text('입력한 두 비밀번호가 일치하지 않습니다.')
        $('#pwCheckText1').removeClass('blue')
        $('#pwCheckText1').addClass('red')
        this.chkFlag2 = 'N'
      }
    },
    autoHypenPhone(phoneNm) {
      const phoneNum = phoneNm.trim()
      this.phoneNm = phoneNum.replace(/[^0-9]/g, '')
      let tmp = ''
      this.chkPhone = 'Y'
      if (this.phoneNm.length < 4) {
        return this.phoneNm
      } else if (this.phoneNm.length < 7) {
        tmp += this.phoneNm.substr(0, 3)
        tmp += '-'
        tmp += this.phoneNm.substr(3)
        this.phoneNm = tmp
      } else if (this.phoneNm.length < 11) {
        tmp += this.phoneNm.substr(0, 3)
        tmp += '-'
        tmp += this.phoneNm.substr(3, 3)
        tmp += '-'
        tmp += this.phoneNm.substr(6)
        this.phoneNm = tmp
      } else {
        $('#checkPhone').val('Y')
        tmp += this.phoneNm.substr(0, 3)
        tmp += '-'
        tmp += this.phoneNm.substr(3, 4)
        tmp += '-'
        tmp += this.phoneNm.substr(7)
        this.phoneNm = tmp
      }
    },
    goJoin() {
      const vm = this
      Signup(vm.userId, vm.userPwd, vm.userNick, vm.phoneNm, vm.recomId, 'W').then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>
<style>
.blue {
  color: #96b3ff !important;
}
.red {
  color: red !important;
}
</style>
