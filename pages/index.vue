<template>
  <div class="container">
    <MARQUEE>
      <span>참외: 1400원</span>
      <span>사과: 5400원</span>
      <span>귤: 500원</span>
      <span>메론: 9800원</span>
      <span>배: 10900원</span>
      <span>파인애플: 7000원</span>
      <span>딸기: 14000원</span>
      <span>체리: 3000원</span>
      <span>레몬: 800원</span>
      <span>복숭아: 6500원</span>
    </MARQUEE>
    <router-link to="/chart/piechart">파이차트</router-link>
    <router-link to="/chart/barchart">bar 차트</router-link>
    <router-link to="/chart">차트</router-link>
    <router-link to="/chart/trade">trade 차트</router-link>
    <router-link to="/keyword">키워드</router-link>
    <router-link to="/date">날짜</router-link>
    <div id="edd" style="visibility: hidden; opacity: 0">
      <ul class="bxslider">
        <li style="list-style: none"><img src="~assets/images/img1.jpg" /></li>
        <li style="list-style: none"><img src="~assets/images/img2.jpg" /></li>
        <li style="list-style: none"><img src="~assets/images/img3.jpg" /></li>
      </ul>
    </div>
    <h2>{{ id }}</h2>
    <h2>FilterNum: {{ num | commaFilter }}</h2>
  </div>
</template>

<script>
import { testApi } from '../api/testApi'

export default {
  data() {
    return {
      userid: '1',
      id: '',
      num: '100000000.0000',
      color: '#cc181e',
      size: '45px',
      loading: true
    }
  },
  created() {
    this.apitest()
  },
  mounted() {
    $('.bxslider').bxSlider({
      auto: true,
      speed: 300,
      mode: 'horizontal',
      pager: false,
      onSliderLoad() {
        $('#edd').css('visibility', 'visible').animate({ opacity: 1 })
      }
    })
  },
  methods: {
    apitest() {
      const vm = this
      testApi(vm.userid).then(res => {
        vm.id = res.data.id
      })
    }
  }
}
</script>
