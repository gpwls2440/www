<template>
  <div>
    <div id="overlay_t"></div>
    <div v-for="(noin, index) in noticeInfoList" :key="index" class="popup_wrap" style="left: 30%">
      <div :id="`pop_div${noin.notiDtTm}`" class="pop_div" style="min-width: 500px; top: 120px; left: 30%">
        <!-- pop_div -->
        <div class="layer_topm" style="background-color: #fff">
          <!-- layer_top -->
          {{ noin.notiTitle }}
        </div>
        <!-- // layer_top -->
        <div class="layer_con" style="padding-left: 7%">
          <!-- layer_con -->
          <!--
          <div class="scroll_div_h1 mCustomScrollbar" style="height: 25vw" v-html="noin.notiContents"></div>
          -->
          <div class="scroll_div_h1 mCustomScrollbar" style="height: 25vw">{{ noin.notiContents }}</div>
        </div>
        <!-- // layer_con -->
        <div class="layer_foot" style="min-width: 500px">
          <div class="lp_left">
            <input
              :id="`chekbox${noin.notiDtTm}`"
              type="checkbox"
              class="cookie_save"
              style="display: inline-block; margin-right: 10px; margin-left: 20px; background-color: #fff; display: none"
            /><label :for="`chekbox${noin.notiDtTm}`">오늘하루 열지 않기</label>
          </div>
          <div class="lp_right">
            <input
              type="button"
              class="layer_close2m"
              value="확인"
              style="
                width: 55%;
                border: 1.5px solid #00b9b2;
                height: 34px;
                background-color: #fff;
                padding-top: 3px;
                padding-bottom: 3px;
                color: #00b9b2;
                margin-right: 11%;
                cursor: pointer;
                margin-left: 32%;
              "
              @click="close(noin.notiDtTm)"
            />
          </div>
        </div>
      </div>
      <!-- // pop_div -->
    </div>
  </div>
</template>

<script>
import { popupNotiList } from '~/api/etc'

export default {
  name: 'MainPopupModal',
  data() {
    return {
      noticeInfoList: []
    }
  },
  mounted() {
    this.getPopupNotiList()
  },
  methods: {
    close(notiDtTm) {
      if ($('#chekbox' + notiDtTm).is(':checked')) {
        // this.setCookies('pop_div' + notiDtTm, 'done', 1)
        this.$cookie.set('pop_div' + notiDtTm, 'done', 1)
      }
      $('#pop_div' + notiDtTm).css('display', 'none')

      let noneadd = 0
      for (let i = 0; i < this.noticeInfoList.length; i++) {
        const display = $('.popup_wrap .pop_div').eq(i).css('display')
        if (display === 'none') {
          noneadd = noneadd + 1
          if (noneadd === this.noticeInfoList.length) {
            $('#overlay_t').css('display', 'none')
          }
        }
      }
    },
    getPopupNotiList() {
      popupNotiList().then(res => {
        this.noticeInfoList = res.data
        this.noticeInfoList.forEach(function (item, index, array) {
          if (document.cookie.includes(item.notiDtTm)) {
            // $('#pop_div' + item.notiDtTm).css('display', 'none')
          }
        })
      })
    }
  }
}
</script>
