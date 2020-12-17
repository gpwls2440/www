<template>
  <div id="wrapper" style="background-color: #323240">
    <div id="top_noti" class="top_noti_bw"></div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/MainHeader'
import Footer from '../components/MainFooter'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
