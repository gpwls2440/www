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
        <input type="hidden" name="device" value="W" />
        <input id="checkNickName" type="hidden" value="N" />
        <input id="checkEmail" type="hidden" value="N" />
        <input id="checkPassword" type="hidden" value="N" />
        <input id="checkPhone" type="hidden" value="N" />
        <div class="line_login">
          <div class="input_line">
            <img src="~/assets/images/ico_inp4.png" alt="" />
            <input id="inputNick" name="userName" class="joinInput isStr reqInput" type="text" required :placeholder="$t('nickName')" title="닉네임" />
          </div>
          <p id="chkNick" class="t_wa">＊{{ $t('enterNickname') }}</p>
          <div class="input_line mt05">
            <img src="~/assets/images/ico_inp1.png" alt="" />
            <input id="userId" name="userId" class="joinInput isId reqInput" type="text" required :placeholder="$t('previewEmail')" title="이메일" @input="emailCheck(this)" />
          </div>
          <p id="chkMsg" class="t_wa">＊{{ $t('signUpEnterEmail') }}</p>
          <div class="input_line mt05 pw_area">
            <img src="~/assets/images/ico_inp2.png" alt="" />
            <input id="inputPw" name="userPw" class="joinInput isPw reqInput" type="password" title="비밀번호" maxlength="20" :placeholder="$t('signUpPW')" required @input="chkPw(value)" />
          </div>
          <p id="pwCheckText" class="txt4">＊{{ $t('signUpPWsub1') }}</p>
          <div class="input_line pw_area">
            <img src="~/assets/images/ico_inp2.png" alt="" />
            <input id="inputPwCk" name="userPwCk" class="joinInput isPw reqInput" type="password" maxlength="20" title="비밀번호 확인" :placeholder="$t('signUpPWChk')" required @input="chkPw1()" />
          </div>
          <p id="pwCheckText1" class="t_wa pw_area">＊{{ $t('signUpPWChksub1') }}</p>
          <div class="input_line mt05">
            <img src="~/assets/images/ico_inp3.png" alt="" />
            <input id="inputPhone" name="userMobile" class="joinInput reqInput" type="text" required maxlength="13" :placeholder="$t('signUpMobileNo')" title="휴대폰 번호" />
          </div>
          <div class="input_line mt05">
            <img src="~/assets/images/ico_inp4.png" alt="" />
            <input id="inputRecom" name="recom" class="joinInput reqInput" type="text" :placeholder="$t('recommendedID')" title="추전인 아이디" />
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
export default {
  name: 'SignupForm',
  data() {
    return {}
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
