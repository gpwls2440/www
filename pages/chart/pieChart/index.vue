<template>
  <div id="app">
    <AmPieChart style="width: 400px; height: 400px"></AmPieChart>
    <AmPieChart2 style="width: 400px; height: 400px"></AmPieChart2>
    <AmPieofaPieChart style="width: 1000px; height: 400px"></AmPieofaPieChart>
  </div>
</template>

<script>
import AmPieChart from './AmPieChart'
import AmPieChart2 from './AmPieChart2'
import AmPieofaPieChart from './AmPieofaPieChart'

export default {
  components: {
    AmPieChart,
    AmPieChart2,
    AmPieofaPieChart
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
