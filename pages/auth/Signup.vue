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
          <form id="frm" name="frm">
            <button type="button" class="btn_login" @click="$router.push('/auth/signupform')">{{ $t('joinByEmail') }}</button>
          </form>
          <div class="sim_login_h1">
            <!-- sim_login_h1 -->
            <p class="txt">{{ $t('joinBySNS') }}</p>
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
              <li><div id="naver_id_login"></div></li>
              <li style="display: none"><div id="naver_id_login"></div></li>
            </ul>
          </div>
          <!-- // sim_login_h1 -->
        </div>
      </div>
    </div>
    <!-- // login_div -->
  </div>
  <!-- // container3 -->
</template>

<script>
import '~/assets/css/auth.css'

export default {
  name: 'Signup',
  data() {
    return {}
  }
}
</script>
