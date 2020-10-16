<template>
  <div class="container">
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
