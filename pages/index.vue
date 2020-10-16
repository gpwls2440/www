<template>
  <div class="container">
    <router-link to="/chart">차트</router-link>
    <ul class="bxslider">
      <li style="list-style: none"><img src="~assets/images/img1.jpg" /></li>
      <li style="list-style: none"><img src="~assets/images/img2.jpg" /></li>
      <li style="list-style: none"><img src="~assets/images/img3.jpg" /></li>
    </ul>
    <h2>{{ id }}</h2>
  </div>
</template>

<script>
import { testApi } from '../api/testApi'

export default {
  data() {
    return {
      userid: '1',
      id: ''
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
      pager: false
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
