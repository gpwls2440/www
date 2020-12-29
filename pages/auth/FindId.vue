<template>
  <div id="container3">
    <!-- container -->
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
    <div class="login_div2">
      <!-- login_div2 -->
      <div class="inner2">
        <!-- inner -->
        <input id="val" type="hidden" name="val" />
        <p class="tit">
          {{ $t('findEmail') }}<br />
          <span class="c1">{{ $t('findingIDUsedLogin') }}</span>
        </p>
        <div class="line_login">
          <p class="txt1">{{ $t('findEmailAtSignUp') }}<br /></p>
          <p class="type_select">
            <input id="type1" type="radio" name="type" checked @click="checkType(1)" /><label for="type1">{{ $t('nickname') }}</label>
            <input id="type2" type="radio" name="type" @click="checkType(2)" /><label for="type2">{{ $t('mobilePhoneNumber') }}</label>
          </p>
          <div id="typeDiv1" class="input_line mt05">
            <img src="~/assets/images/ico_inp4.png" alt="" />
            <input id="inputNick" v-model="inputVal" name="userName" class="joinInput isStr reqInput" type="text" required :placeholder="$t('nickname')" :title="$t('nickname')" />
          </div>
          <div id="typeDiv2" class="input_line mt05">
            <img src="~/assets/images/ico_inp3.png" alt="" />
            <input
              id="inputPhone"
              v-model="inputVal"
              name="userMobile"
              class="joinInput reqInput"
              type="text"
              required
              maxlength="13"
              :placeholder="$t('mobilePhoneNumber')"
              :title="$t('mobilePhoneNumber')"
            />
          </div>
          <p id="foundEmailP" class="txt2">
            <span id="foundEmail"></span><a href="javascript:clipboard('#foundEmail')" class="copy_btn">{{ $t('copyClipboard') }}</a>
          </p>
        </div>
        <button id="btn_button1" type="button" class="btn_login" @click="findId()">{{ $t('confirm') }}</button>
        <button id="btn_button2" type="button" class="btn_login" @click="goLogin()">{{ $t('goToLogin') }}</button>
      </div>
    </div>
    <!-- // login_div -->
  </div>
  <!-- // container -->
</template>

<script>
import { FindId } from '~/api/auth'
export default {
  name: 'FindId',
  data() {
    return {
      findType: 1,
      inputVal: ''
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
    checkType(val) {
      this.inputVal = ''
      this.findType = val
      if (this.findType === 1) {
        $('#typeDiv1').show()
        $('#typeDiv2').hide()
      } else {
        $('#typeDiv1').hide()
        $('#typeDiv2').show()
      }
    },
    findId() {
      const vm = this
      if (vm.findType === 1) {
        if (vm.inputVal === '') {
          alert('닉네임을 입력하세요')
        } else {
          FindId(vm.inputVal).then(res => {
            alert(res.data.returnMsg)
          })
        }
      } else if (vm.findType === 2) {
        if (vm.inputVal === '') {
          alert('휴대폰번호를 입력하세요')
        } else {
          FindId(vm.inputVal).then(res => {
            alert(res.data.returnMsg)
          })
        }
      }
    }
  }
}
</script>

<style>
.type_select {
  text-align: center;
  margin-bottom: 15px;
  padding-left: 10px;
}
.type_select label {
  color: #fff;
  font-size: 1.5em;
  margin-right: 30px;
  padding-left: 26px !important;
}
.type_select input[type='radio'] {
  background: none;
}

#typeDiv2,
#btn_button2 {
  display: none;
}
.login_div2 .line_login .txt2 {
  color: #fff;
  display: none;
}

.copy_btn {
  font-size: 0.8em;
  color: #fff;
  padding: 0px 10px;
  border: 1px #fff solid;
  display: inline-block;
  margin-left: 10px;
}
</style>
