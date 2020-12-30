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
        <div id="pwModiDiv" class="line_login">
          <div class="input_line mt05"><img src="~/assets/images/ico_inp1.png" alt="" /><input id="userId" name="userId" type="text" :value="userId" readonly /></div>
          <div class="input_line mt15">
            <img src="~/assets/images/ico_inp2.png" alt="" />
            <input id="userPwd" v-model="userPwd" name="userPwd" type="password" placeholder="변경할 비밀번호 입력" required title="비밀번호" maxlength="20" @change="chkPw(userPwd)" />
            <br />
            <p id="pwCheckText" class="txt4">영문, 숫자 혼합하여 8~20자리 이내로 입력하세요</p>
          </div>
          <br />
          <div class="input_line mt05">
            <img src="~/assets/images/ico_inp2.png" alt="" />
            <input id="reUserPwd" v-model="reUserPwd" name="reUserPwd" type="password" placeholder="변경할 비밀번호 확인" maxlength="20" @change="reChkPw(reUserPwd)" />
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
import { FindPwResetInit, FindPwResetProc } from '~/api/auth'
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
      userUid: '',
      userPwd: '',
      reUserPwd: '',
      chkFlag1: 'N',
      chkFlag2: 'N'
    }
  },
  mounted() {
    $('.con_slider').bxSlider({
      mode: 'fade',
      pause: 5000,
      auto: true
    })
    const query = this.$route.query.p
    this.findPwReset(query)
  },
  methods: {
    findPwReset(query) {
      const vm = this
      FindPwResetInit(query).then(res => {
        vm.userId = res.data.userId
        vm.userUid = res.data.userUid
        if (res.data.result === 'Timeout') {
          vm.showModal = true
          vm.text = '비밀번호 변경 가능 시간이 초과되었습니다.'
          vm.$router.push('/auth/findpw')
        }
      })
    },
    updatePwProc() {
      const vm = this
      if (vm.chkFlag1 === 'Y' && vm.chkFlag2 === 'Y') {
        FindPwResetProc(vm.userPwd, vm.userUid).then(res => {
          if (res.data === vm.userUid) {
            vm.showModal = true
            vm.text = '비밀번호가 변경되었습니다.'
            vm.$router.push('/auth/login')
          }
        })
      } else {
        vm.showModal = true
        vm.text = '비밀번호를 다시 확인해주세요.'
      }
    },
    chkPw(val) {
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
    reChkPw(val) {
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
    }
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
