<template>
  <div class="container"></div>
</template>

<script>
import axios from 'axios'

export default {
  created() {
    this.apitest()
  },
  methods: {
    apitest() {
      axios.get('https://jsonplaceholder.typicode.com/todos/1').then((res) => {
        console.log(res.data)
      })
    },
  },
}
</script>
