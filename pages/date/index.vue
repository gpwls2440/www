<template>
  <div>
    <h1>{{ date | yyyymmddFilter }}</h1>
    <h1>{{ time | hhmmssFilter }}</h1>
    <Pikaday></Pikaday>
  </div>
</template>

<script>
import Pikaday from './Pikaday'
export default {
  components: {
    Pikaday
  },
  data() {
    return {
      date: '20201021',
      time: '162318'
    }
  }
}
</script>
