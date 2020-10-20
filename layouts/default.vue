<template>
  <div style="height: 100%">
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
