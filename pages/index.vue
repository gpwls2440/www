<template>
  <div v-cloak>
    <!--
    <div v-show="noticeInfoList.length !== 0" id="overlay_t"></div>
    -->
    <div class="main_container">
      <!-- container -->
      <div class="m_visual_h1">
        <!--  m_visual_h1 -->
        <swiper ref="mySwiper" :options="swiperOption" class="swiper-container">
          <swiper-slide>
            <img id="slideMagine" src="~/assets/images/slide1.jpg" alt="" />
            <div class="mv_area">
              <span class="slide_text1">{{ $t('mainslide1_1') }}</span>
              <span class="slide_text2">{{ $t('mainslide1_2') }}</span>
              <span class="slide_text3">KDA!</span>
              <span class="slide_text4">!{{ $t('mainslide1_3') }}</span>
              <span class="slide_text5">{{ $t('mainslide1_4') }}</span>
            </div>
          </swiper-slide>
          <swiper-slide>
            <img id="slideMagine" src="~/assets/images/slide2.jpg" alt="" />
            <div class="mv_area">
              <span class="slide_text2_1">All IN One!!</span>
              <span class="slide_text2_2">KDEX {{ $t('mainslide1_4') }}</span>
              <span class="slide_text2_3">
                {{ $t('mainslide2_2') }}
                <br class="mobile" />
                {{ $t('mainslide2_3') }}
                <br class="mobile" />
                <span class="slide_text2_4">
                  {{ $t('mainslide2_4') }}
                </span>
                {{ $t('mainslide2_5') }}
              </span>
            </div>
          </swiper-slide>
          <div class="swiper-pagination"></div>
        </swiper>
      </div>
      <div v-cloak class="mainpage">
        <div class="notice_bar">
          <ul id="rolling" class="rolling">
            <li v-for="(noTit, index) in notiMainTitleList" :key="index">
              <span class="notice1">{{ $t('notice') }}</span>
              <span class="notice2">{{ noTit.notiTitle }}</span>
              <a href="#">
                <!--
                <span class="notice3">+{{ $('more') }}</span>
                -->
                <span class="notice3">+자세히</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="contents">
          <!-- contents -->
          <p class="main_tit">KDEX {{ $t('marketstatus') }}</p>
          <div class="exchange4">
            <div id="tab_btn" class="main_tab">
              <ul>
                <li v-show="favList[0] != null" :class="{ active: curItem == ' ' }">
                  <a @click="showMarket(' ')">{{ $t('favorites') }}</a>
                </li>
                <li :class="{ active: curItem == 'KRW' }"><a title="KRW" @click="showMarket('KRW')">KRW</a></li>
                <li :class="{ active: curItem == 'BTC' }"><a @click="showMarket('BTC')">BTC</a></li>
                <li :class="{ active: curItem == 'ETH' }"><a @click="showMarket('ETH')">ETH</a></li>
              </ul>
            </div>
            <div id="ex4Div2Tab1" class="ex4Div2Tab">
              <!-- con1 -->
              <div class="main_table1 mt20">
                <!-- main_table1 -->
                <table>
                  <colgroup>
                    <col style="width: 17%" />
                    <col style="width: 17%" />
                    <col style="width: 15%" />
                    <col style="width: 17%" />
                    <col style="width: 17%" />
                    <col style="width: * %" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>{{ $t('coinname') }}</th>
                      <th>{{ $t('last') }} {{ $t('matchingprice') }}</th>
                      <th>{{ $t('24hrchange') }}</th>
                      <th>24h {{ $t('high') }}</th>
                      <th>24h {{ $t('low') }}</th>
                      <th>24h {{ $t('volume') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(coin, index) in coinInfoList" :key="index" class="coinList" @click="goMarket(coin.symbol)">
                      <td :title="coin.coinName">
                        <div style="width: 50px; float: left; margin-left: 20px; padding-top: 5px">
                          <img :src="require(`~/assets/images/coin/${coin.symbol}.png`)" style="width: 60%; vertical-align: middle" :alt="coin.symbol" />
                        </div>
                        <div style="float: left; font-size: 16px; text-align: left; margin-left: 10px; line-height: 1.2">
                          {{ coin.coinName }}<br />
                          <span style="font-size: 12px">({{ coin.symbol }} / {{ coin.market }})</span>
                        </div>
                      </td>
                      <td class="pdw" :class="{ red: coin.updnSign == '1', blue: coin.updnSign == '-1' }">
                        {{ coin.lastPrice }}<span v-if="coin.market != 'KRW'" class="won_price">{{ coin.basicPrice }}<span> KRW</span></span>
                      </td>
                      <td :class="{ red: coin.updnSign == '1', blue: coin.updnSign == '-1' }">{{ coin.updnRate }} %</td>
                      <td class="sec2 red">
                        {{ coin.highPrice }}<span v-if="coin.market != 'KRW'" class="won_price">{{ coin.basicPrice }}<span> KRW</span></span>
                      </td>
                      <td class="sec2 blue">
                        {{ coin.lowPrice }}<span v-if="coin.market != 'KRW'" class="won_price">{{ coin.basicPrice }}<span> KRW</span></span>
                      </td>
                      <td class="sec4">
                        {{ coin.totalVol }}<span class="n1"> {{ coin.symbol }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--// main_table1 -->
            </div>
            <!-- // con1 -->
          </div>
          <!-- // contents -->
        </div>
        <!-- mainPage-->
      </div>
    </div>
    <div id="content">
      <!-- Why Choose Us -->
      <section id="mobile">
        <div class="container">
          <div class="mobile_box1">
            <h3>
              {{ $t('mainmobile_1') }} <span class="pointColor">{{ $t('mainmobile_2') }}</span>
            </h3>
            <p class="text1">{{ $t('mainmobile_3') }}</p>
            <p class="text2">{{ $t('mainmobile_4') }}</p>
          </div>
          <div class="mobile_img1"></div>
          <div class="bg_text1">REAL</div>
          <div class="bg_text2">TIME</div>
          <div class="mobile_box2">
            <h3 class="pointColor">{{ $t('mainmobile_5') }}</h3>
            <p>{{ $t('mainmobile_6') }}<br />{{ $t('mainmobile_7') }}<br />{{ $t('mainmobile_8') }}</p>
          </div>

          <div class="bg_text3">WAL</div>
          <div class="bg_text4">LET</div>
          <div class="mobile_box3">
            <h3 class="pointColor">{{ $t('mainmobile_9') }}</h3>
            <p>
              {{ $t('mainmobile_10') }}<br class="pc" />
              {{ $t('mainmobile_11') }}
            </p>
          </div>

          <div class="mobile_img2"></div>
        </div>
        <div class="bg_bottom1"></div>
      </section>

      <!-- Token Distribution -->
      <section id="infomation">
        <div class="container">
          <div class="content_logo"></div>
          <div class="bg_gragh1"></div>
          <div class="bg_gragh2"></div>
          <div class="info_text1">{{ $t('maininfomation_1') }}<br />{{ $t('maininfomation_2') }}</div>
          <div class="info_text2 pointColor">{{ $t('maininfomation_3') }}</div>
          <div class="info_text3">{{ $t('maininfomation_4') }}</div>
          <ul class="info_list">
            <li>
              <h5>{{ $t('maininfomation_5') }}<br />{{ $t('maininfomation_6') }}</h5>
              <div class="pic"><img src="~/assets/images/icon1.png" /></div>
              <p>{{ $t('maininfomation_7') }}<br />{{ $t('maininfomation_8') }}</p>
            </li>
            <li>
              <h5>{{ $t('maininfomation_9') }}<br />{{ $t('maininfomation_10') }}</h5>
              <div class="pic"><img src="~/assets/images/icon2.png" /></div>
              <p>{{ $t('maininfomation_11') }}<br />{{ $t('maininfomation_12') }}<br />{{ $t('maininfomation_13') }}</p>
            </li>
            <li>
              <h5>{{ $t('maininfomation_14') }}<br />{{ $t('maininfomation_15') }}</h5>
              <div class="pic"><img src="~/assets/images/icon3.png" /></div>
              <p>{{ $t('maininfomation_16') }}<br />{{ $t('maininfomation_17') }}<br />{{ $t('maininfomation_18') }}<br />{{ $t('maininfomation_19') }}</p>
            </li>
            <li>
              <h5>{{ $t('maininfomation_20') }}<br />{{ $t('maininfomation_21') }}</h5>
              <div class="pic"><img src="~/assets/images/icon4.png" /></div>
              <p>{{ $t('maininfomation_22') }}<br />{{ $t('maininfomation_23') }}</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <MainPopupModal v-show="showModal"></MainPopupModal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import MainPopupModal from '../components/MainPopupModal'
import { coinList, favCoinList } from '~/api/coin'
import { mainNotiTitle } from '~/api/etc'
import '@/assets/css/swiper.min.css'
import '@/assets/css/index.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    MainPopupModal
  },
  data() {
    return {
      noticeInfoList: [],
      showModal: true,
      notiMainTitleList: [],
      swiperOption: {
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      curItem: 'KRW',
      coinInfoList: [],
      favList: []
    }
  },
  computed: {
    ...mapGetters(['getSessionId', 'getUid']),
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  created() {},
  mounted() {
    this.ticker()
    this.getCoinList()
    this.getNotiTitle()
    this.getFavCoinList()
  },
  methods: {
    ticker() {
      const vm = this
      setTimeout(function () {
        $('#rolling li:first').animate({ marginTop: '-60px' }, 400, function () {
          $(this).detach().appendTo('#rolling').removeAttr('style')
        })
        vm.ticker()
      }, 2500)
    },
    showMarket(market) {
      this.curItem = market
      this.getCoinList()
    },
    goMarket(symbol) {
      this.$router.push({ path: '/exchange', query: { symbol } })
    },
    getNoticeLength(val) {
      this.noticeInfoList = val
    },
    getCoinList() {
      coinList().then(res => {
        const coinList = res.data
        const vm = this
        vm.coinInfoList = []
        coinList.forEach(function (item, index, array) {
          if (item.symbol.includes('_')) {
            item.symbol = item.symbol.substring(0, item.symbol.length - 4)
          }
          if (item.market === vm.curItem) {
            vm.coinInfoList.push(array[index])
          }
        })
      })
    },
    getNotiTitle() {
      const vm = this
      mainNotiTitle().then(res => {
        vm.notiMainTitleList = res.data
      })
    },
    getFavCoinList() {
      const vm = this
      favCoinList().then(res => {
        vm.favList = res.data
      })
    }
  }
}
</script>
