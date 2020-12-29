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
      <div class="inner" style="min-height: auto; padding-bottom: 50px">
        <!--
				<p class="tit">
					<img src="~/assets/images/log_tit1.png" alt="hello. nice to meet you.">
					<p style="margin-top:20px;text-align:center; color:#fff; font-size:20px; line-height:30px;">
						{{$t( 'mainInfo01' )}} <br>{{$t( 'mainInfo02' )}}
						
					</p>
				</p>
                -->
        <div id="login" class="login" style="margin-top: 30px; text-align: center; color: #fff; font-size: 20px; line-height: 50px">
          {{ $t('logoutMsg') }}<br />
          <button type="button" class="btn_login" @click="router.push('/auth/login')">LogIn</button>
          <br />
          <a @click="router.push('/')">{{ $t('gotoMain') }}</a>
        </div>
      </div>
    </div>
  </div>
  <!-- // container3 -->
</template>

<script>
import '@/assets/css/auth.css'

export default {
  name: 'Logout',
  data() {
    return {}
  }
}
</script>
<style>
#header {
  border-bottom: 6px solid #00b9b2 !important;
  background: #1b2f42 !important;
}
</style>
