<template>
  <div id="container3">
    <!-- container -->
    <div class="con_visual_h1">
      <!-- con_visual_h1 -->
      <div class="inner">
        <ul class="con_slider">
          <li><img src="~/assets/images/bg_mem1.jpg" alt="" /></li>
          <li><img src="~/assets/images/bg_mem2.jpg" alt="" /></li>
        </ul>
      </div>
    </div>
    <!-- // con_visual_h1 -->
    <div class="login_div2">
      <!-- login_div2 -->
      <div class="inner2">
        <!-- inner -->
        <p class="tit">
          {{ $t('findPassword') }}<br />
          <span class="c1">{{ $t('changePasswordByEmail') }}</span>
        </p>
        <div class="line_login">
          <p class="txt1">{{ $t('changePasswordMsg01') }}<br />{{ $t('changePasswordMsg02') }}</p>
          <div class="input_line mt05"><img src="~/assets/images/ico_inp1.png" alt="" /> <input id="userId" v-model="userId" name="userId" type="text" :placeholder="$t('email')" /></div>
        </div>
        <button type="button" class="btn_login" @click="findpw()">{{ $t('confirm') }}</button>
      </div>
      <!-- inner -->
    </div>
    <!-- // login_div2 -->
    <modal v-if="showModal" @close="showModal = false">
      <p slot="body">{{ text }}</p>
    </modal>
  </div>
</template>

<script>
import Modal from '~/components/Modal'
import { FindPw } from '~/api/auth'
export default {
  name: 'FindPw',
  components: {
    Modal
  },
  data() {
    return {
      showModal: false,
      text: '',
      userId: ''
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
    findpw() {
      const vm = this
      if (vm.userId === '') {
        vm.showModal = true
        vm.text = '이메일을 입력해주세요.'
      }
      FindPw(vm.userId).then(res => {
        if (res.data === 'OK') {
          vm.showModal = true
          vm.text = '비밀번호 변경 메일이 발송되었습니다. 메일을 확인해 주세요.'
        }
      })
    }
  }
}
</script>

<style></style>
