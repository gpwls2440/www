<template>
  <div id="app">
    <div>
      <AnyPieChart style="width: 400px; height: 400px"></AnyPieChart>
      <AmPieChart style="width: 400px; height: 400px"></AmPieChart>
    </div>
  </div>
</template>

<script>
import AnyPieChart from './AnyPieChart'
import AmPieChart from './AmPieChart'

export default {
  components: {
    AnyPieChart,
    AmPieChart
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
