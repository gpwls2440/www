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
    <div class="login_div">
      <!-- login_div -->
      <div style="width: 100%; text-align: center; font-size: 30px; color: #fff; margin-top: 12%">
        에러가 발생했습니다.<br />
        계속 문제 발생시 관리자에게 문의 주세요.<br />
        <br />
        <a href="#" @click="$router.push('/')">거래소 메인으로</a>
      </div>
    </div>
  </div>
  <!-- // container3 -->
</template>
<script>
export default {
  name: 'Error',
  mounted() {
    $('.con_slider').bxSlider({
      mode: 'fade',
      pause: 5000,
      auto: true
    })
  }
}
</script>
