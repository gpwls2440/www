<template>
  <div class="main_container">
    <!-- container -->
    <div class="m_visual_h1 swiper-container">
      <!--  m_visual_h1 -->
      <swiper ref="mySwiper" :options="swiperOption">
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
        <div slot="pagination" class="swiper-pagination"></div>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
    <div v-cloak class="mainpage">
      <div class="notice_bar">
        <ul id="rolling" class="rolling">
          <li v-for="noTit in notiMainTitleList" :key="noTit">
            <span class="notice1">{{ $t('notice') }}</span>
            <span class="notice2">{{ noTit.notiTitle }}</span>
            <a href="#">
              <span class="notice3">+{{ $('more') }}</span>
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
              <li ng-show="favList[0] != null" ng-class="{'active' : curItem == ' '}">
                <a href="#con1" ng-click="showMarket(' ')">{{ $t('favorites') }}</a>
              </li>
              <li ng-class="{'active' : curItem == 'KRW'}"><a href="#con2" ng-click="showMarket('KRW')" title="KRW">KRW</a></li>
              <li ng-class="{'active' : curItem == 'BTC'}"><a href="#con3" ng-click="showMarket('BTC')">BTC</a></li>
              <li ng-class="{'active' : curItem == 'ETH'}"><a href="#con4" ng-click="showMarket('ETH')">ETH</a></li>
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
                  <tr class="coinList" ng-repeat="coin in coinInfoList | orderBy:['order','market', 'order']  | filter:serchingItem " ng-click="goMarket(coin.simbol)">
                    <td title="{/ coin.coinName /}">
                      <div style="width: 50px; float: left; margin-left: 20px; padding-top: 5px">
                        <img ng-src="/assets/img/coin/{/ coin.simbol | cutSimbol  /}.png" style="width: 60%; vertical-align: middle" alt="{/ coin.simbol /}" />
                      </div>
                      <div style="float: left; font-size: 16px; text-align: left; margin-left: 10px; line-height: 1.2">
                        {/ coin.coinName /}<br />
                        <span style="font-size: 12px">({/ coin.simbol | cutSimbol /} / {/ coin.simbol | cutMarket /})</span>
                      </div>
                    </td>
                    <td class="pdw" ng-class="{'red' :  coin.updnSign == '1', 'blue' :  coin.updnSign == '-1'}">
                      {/ coin.lastPrice | toFixMarket:coin.market /}<span class="won_price" ng-if="coin.market != 'KRW'">{/ coin.basicPrice | calcPrice:coin.lastPrice /}<span> KRW</span></span>
                    </td>
                    <td ng-class="{'red' :  coin.updnSign == '1', 'blue' :  coin.updnSign == '-1'}">{/ coin.updnRate | toFixPer /} %</td>
                    <td class="sec2 red">
                      {/ coin.highPrice | toFixMarket:coin.market /}<span class="won_price" ng-if="coin.market != 'KRW'">{/ coin.basicPrice | calcPrice:coin.highPrice /}<span> KRW</span></span>
                    </td>
                    <td class="sec2 blue">
                      {/ coin.lowPrice | toFixMarket:coin.market /}<span class="won_price" ng-if="coin.market != 'KRW'">{/ coin.basicPrice | calcPrice:coin.lowPrice /}<span> KRW</span></span>
                    </td>
                    <td class="sec4">{/ coin.totalVol /}<span class="n1"> {/ coin.simbol | cutSimbol /}</span></td>
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
    <MainModal v-show="showModal" @close="showModal = false"></MainModal>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import MainModal from '../components/MainModal'
// import 'swiper/css/swiper.css'
import 'swiper/swiper-bundle.css'
import '@/assets/css/index.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    MainModal
  },
  data() {
    return {
      showModal: true,
      notiMainTitleList: [],
      swiperOption: {
        centeredSlides: true,
        autoplay: {
          delay: 3200,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  created() {},
  mounted() {
    console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {}
}
</script>
