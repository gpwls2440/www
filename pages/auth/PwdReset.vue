<template>
  <div id="container3">
    <!-- container -->
    <div class="con_visual_h1">
      <!-- con_visual_h1 -->
      <div class="inner" style="width: 100%">
        <ul class="con_slider" style="width: 100%">
          <li style="width: 100%">
            <img src="~/assets/images/bg_mem1.jpg" width="100%" alt="" />
          </li>
          <li style="width: 100%">
            <img src="~/assets/images/bg_mem2.jpg" width="100%" alt="" />
          </li>
        </ul>
      </div>
    </div>
    <!-- // con_visual_h1 -->
    <div class="login_div2">
      <!-- login_div2 -->
      <div class="inner2">
        <!-- inner -->
        <p class="tit">
          비밀번호변경<br />
          <span class="c1">새로운 비밀번호로 변경하세요</span>
        </p>
        <input id="passCheck" type="hidden" name="passCheck" value="N" />
        <input id="passCheck1" type="hidden" name="passCheck1" value="N" />
        <input id="uid" type="hidden" name="uid" :value="userUid" />

        <div id="pwModiDiv" class="line_login">
          <div class="input_line mt05"><img src="~/assets/images/ico_inp1.png" alt="" /> <input id="userId" name="userId" type="text" :value="userId" readonly /></div>
          <div class="input_line mt15">
            <img src="~/assets/images/ico_inp2.png" alt="" />
            <input id="userpswd" name="userpswd" type="password" oninput="chkPw(this.value)" required placeholder="변경할 비밀번호 입력" title="비밀번호" maxlength="20" />
            <br />
            <p id="pwCheckText" class="txt4">영문대소문자, 숫자 혼합하여 8~20자리 이내로 입력하세요</p>
          </div>
          <br />
          <div class="input_line mt05">
            <img src="~/assets/images/ico_inp2.png" alt="" />
            <input id="rereuserpswd" name="reuserpswd" type="password" oninput="chkPw1(this.value)" placeholder="변경할 비밀번호 확인" maxlength="20" />
            <br />
            <p id="pwCheckText1" class="txt4">＊동일한 비밀번호를 다시 한번 입력해주세요!</p>
          </div>
        </div>
        <button class="btn_login" type="button" @click="updatePwProc()">확인</button>
      </div>
      <!-- inner2 -->
    </div>
    <!-- // login_div2 -->
    <modal v-if="showModal" @close="showModal = false">
      <p slot="body">{{ text }}</p>
    </modal>
  </div>
</template>

<script>
import Modal from '~/components/Modal'
export default {
  name: 'PwdReset',
  components: {
    Modal
  },
  data() {
    return {
      showModal: false,
      text: '',
      userId: '',
      userUid: ''
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
    updatePwProc() {}
  }
}
</script>

<style>
.login_div2 .tit .c1,
.login_div2 .txt4 {
  color: #fff;
}
.login_div2 .inner2 {
  padding-bottom: 70px;
}
.login_div2 .line_login .txt1 {
  margin-bottom: 20px;
}

.login_div2 .btn_login {
  border: 0;
}

@media (min-width: 300px) and (max-width: 990px) {
  body {
    background: url('../../assets/images/bg_mem1.jpg');
  }
  #container3 {
    padding: 0;
  }

  .con_visual_h1 {
    display: none;
  }

  .login_div2 {
    position: relative;
    display: block;
    padding: 0;
  }
  .login_div2 .inner2 {
    margin: 10% auto;
    width: 90%;
    padding: 70px 5% 50px 5%;
    background: none;
  }
  .login_div2 .line_login {
    text-align: center;
    padding: 25px 0 40px 0;
  }

  .login_div2 .input_line {
    margin: 0 auto;
    width: 90%;
    padding: 12px 0 0 0;
  }

  .login_div2 .btn_login {
    display: block;
    margin: 30px auto;
    width: 90%;
    background: #00b9b2;
  }

  .mt05 {
    margin-top: 5px !important;
  }
  .mt15 {
    margin-top: 15px !important;
  }
}
</style>
