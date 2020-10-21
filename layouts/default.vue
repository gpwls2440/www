<template>
  <div style="height: 100%">
    <Header />
    <Spinner />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/MainHeader'
import Footer from '../components/MainFooter'
import Spinner from '../components/Spinner'

export default {
  components: {
    Header,
    Footer,
    Spinner
  }
}
</script>
