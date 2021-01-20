<template>
  <div id="footer">
    <!-- footer -->
    <div class="imgmap" style="">
      <div class="maptarget" onclick="window.open('https://open.kakao.com/o/gMjykk7 ', '_blank');"></div>
    </div>
    <div class="container">
      <!-- Rights -->
      <div class="footer_inner">
        <!-- footer_inner -->
        <p><img src="~/assets/images/foot_logo.png" alt="KDEX" /></p>
        <p class="mt10">
          {{ $t('address01') }}
          <span class="line">|</span>
          {{ $t('CEO') }}
          <span class="line">|</span>
          {{ $t('companyRegistrationNumber') }} 396-86-01243
          <span class="line">|</span>
          {{ $t('reportCompany') }}<br />{{ $t('customerservice') }}{{ $t('email') }} <a href="mailto:keystonelab@keystonelab.co.kr" style="color: #00b9b2">keystonelab@keystonelab.co.kr</a>
          <!--<span class="line">|</span>     전화 02-000-0000-->
          <br />{{ $t('mainContactUs01') }} <a href="mailto:keystonelab@keystonelab.co.kr"><span style="color: #00b9b2">keystonelab@keystonelab.co.kr</span></a
          >{{ $t('mainContactUs02') }}
          <a href="http://t.me/kdex_official" target="_blank">
            <img src="~/assets/images/telegram_web_ko_KR.png" alt="1대1 문의" style="position: absolute; top: 100px; left: 62%; width: 170px" />
          </a>
          <a href="~/assets/images/manuals/KDEX 매뉴얼 북(20190813).pdf" target="_blank">
            <img src="~/assets/images/btn_pdfdown_ko_KR.png" alt="kdex 메뉴얼 다운로드" style="position: absolute; top: 100px; left: 62%; margin-left: 180px; cursor: pointer" />
          </a>
        </p>

        <div class="foot_img" style="padding-left: 30px">
          <img src="~/assets/images/logo_hancom.png" alt="Hancom Secure" style="margin-right: 10px" />
          <img src="~/assets/images/logo_thales.png" alt="THALES" />
          <img src="~/assets/images/logo_ict.png" alt="ICT 콘텐츠협회" />
          <img src="~/assets/images/logo_blockchainhub.png" alt="BLOCKCHAIN HUB" />
          <img src="~/assets/images/logo_element.png" alt="ELEMENT" />
          <br />
          <img src="~/assets/images/logo_keystonelab.png" alt="KEYSTONE LAB." />
          <img src="~/assets/images/logo_lsware.png" alt="LS ware" />
          <img src="~/assets/images/logo_huobi.png" alt="Huobi" />
          <img src="~/assets/images/logo_scvsoft.png" alt="SCV soft" />
          <img src="~/assets/images/logo_onetv.png" alt="ONE TV" />
          <img src="~/assets/images/logo_ddk.png" alt="DDK" />
        </div>
      </div>
    </div>
  </div>
  <!-- // footer -->
</template>

<script>
export default {
  name: 'MainFooter'
}
</script>
