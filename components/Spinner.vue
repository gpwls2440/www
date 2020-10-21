<template>
  <div>
    <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'Spinner',
  components: {
    ClipLoader
  },
  data() {
    return {
      color: 'rgb(93, 197, 150)',
      size: '45px',
      loading: true
    }
  },
  mounted() {
    this.loading = false
  }
}
</script>
