<script>
import { mapGetters } from 'vuex'
import { Doughnut } from 'vue-chartjs'

export default {
  name: 'DoughnutChart',
  extends: Doughnut,
  plugins: [],
  props: {
    totSymbol: {
      type: Array,
      default() {
        return []
      }
    },
    coinEval: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      symbol: '',
      walletList: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        hoverBorderWidth: 20,
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: '',
          fontColor: '#FFF',
          fontSize: 20,
          fontFamily: 'Arial'
        },
        cutoutPercentage: 70, // thickness
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getSessionId', 'getUid']),
    chartData() {
      return {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 5,
        labels: this.totSymbol,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#30A9DE', '#EFDC05', '#E53A40', '#DDA0DD', '#2EC4B6', '#84B1DE'],
            data: this.coinEval
          }
        ]
      }
    }
  },
  watch: {
    chartData() {
      this.$data._chart.update()
    }
  },
  created() {},
  mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>
