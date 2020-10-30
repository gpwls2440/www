<template>
  <div class="container">
    <router-link to="/chart/piechart">파이차트</router-link>
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
