<template>
  <div id="wrapper" style="background-color: #323240">
    <div id="top_noti" class="top_noti_bw">
      <span>KDEX의 서비스는 크롬 브라우저에 최적화 되어있습니다.</span>
      <span class="top_close todayNoSee">오늘하루 보지 않기</span>
      <span class="top_close topClose">닫기</span>
    </div>
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
