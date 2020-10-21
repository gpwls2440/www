<template>
  <div>
    <h1>{{ date | yyyymmddFilter }}</h1>
    <h1>{{ time | hhmmssFilter }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: '20201021',
      time: '162318'
    }
  }
}
</script>
