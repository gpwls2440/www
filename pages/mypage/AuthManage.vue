<template>
  <div class="info_con_h2">
    <!-- info_con_h2 -->
    <ul class="cert_step">
      <!-- cert_step -->
      <li class="cert1">
        <div>
          <span class="tit">{{ $t('level01') }}</span>
          <span class="img"><img src="~/assets/images/008/img_008002_1.png" alt="" /></span>
          <span class="btn">{{ $t('authenticationCompleted') }}</span>
          <span class="arr"></span>
        </div>
      </li>
      <li class="cert2">
        <div>
          <span class="tit">{{ $t('level02') }}</span>
          <span class="img"><img src="~/assets/images/008/img_008002_2.png" alt="" /></span>
          <span class="btn" :data-tooltip-text="$t('lev2Ment')">{{ $t('unauthorized') }}</span>
          <span class="arr"></span>
        </div>
      </li>
      <li class="cert3">
        <div>
          <span class="tit">{{ $t('level03') }}</span>
          <span class="img"><img src="~/assets/images/008/img_008002_3.png" alt="" /></span>
          <span v-if="userInfo.certMobileYn == 'N' && userInfo.userLevel < 2" class="btn1" :data-tooltip-text="$t('lev2Ment2')">{{ $t('nameCertification') }} : {{ $t('unauthorized') }}</span>
          <span v-if="userInfo.certMobileYn == 'N' && userInfo.userLevel == 2" class="btn1" @click="jsSubmit()">{{ $t('nameCertification') }} : {{ $t('unauthorized') }}</span>
          <span v-if="userInfo.certMobileYn == 'Y'" class="btn1 on" style="cursor: default">{{ $t('nameCertification') }} : {{ $t('authenticationCompleted') }}</span>

          <span v-show="userInfo.certMobileYn == 'Y' && userInfo.certAccountYn == 'N'" class="btn2 layer_btn1" @click="openAccountWindow()"
            >{{ $t('accountAuthentication') }} : {{ $t('unauthorized') }}</span
          >
          <span v-show="userInfo.certMobileYn == 'Y' && userInfo.certAccountYn == 'Y'" class="btn2 on" @click="openAccountWindow()"
            >{{ $t('accountAuthentication') }} : {{ $t('authenticationCompleted') }} (계좌변경시 클릭)</span
          >
          <span v-show="userInfo.certMobileYn == 'N' && userInfo.certAccountYn == 'N'" class="btn2" :data-tooltip-text="$t('lev3Ment')"
            >{{ $t('accountAuthentication') }} : {{ $t('unauthorized') }}</span
          >
        </div>
      </li>
    </ul>
    <!-- // cert_step -->
    <ul class="cert_txt">
      <!-- cert_txt -->
      <li>
        <p class="cir">LEVEL<br />01</p>
        <p class="txt">
          {{ $t('authenticationmethod') }} : {{ $t('signup') }}<br />
          {{ $t('authority') }} : <span class="c1">{{ $t('authority1') }}</span>
        </p>
      </li>
      <li>
        <p class="cir">LEVEL<br />02</p>
        <p class="txt">
          {{ $t('authenticationmethod') }} : {{ $t('appverification') }}<br />
          {{ $t('authority') }} : <span class="c1">{{ $t('authority2') }}</span>
        </p>
      </li>
      <li>
        <p class="cir">LEVEL<br />03</p>
        <p class="txt">
          {{ $t('authenticationmethod') }} : {{ $t('accountauthentication') }}<br />
          {{ $t('authority') }} : <span class="c1">{{ $t('authority3') }}</span>
        </p>
      </li>
    </ul>
    <!-- // cert_txt -->
  </div>
  <!-- // info_con_h2 -->
</template>

<script>
export default {
  name: 'AuthManage',
  data() {
    return {
      userInfo: {
        certMobileYn: ''
      }
    }
  }
}
</script>
