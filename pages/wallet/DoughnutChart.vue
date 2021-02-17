<script>
import { mapGetters } from 'vuex'
import { Doughnut } from 'vue-chartjs'
import { myCoins } from '~/api/balance'
import { calcPrice } from '~/plugins/util'

export default {
  name: 'DoughnutChart',
  extends: Doughnut,
  plugins: [],
  props: {
    /*
    symbolName: {
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
  */
  },
  data() {
    return {
      symbol: '',
      walletList: [],
      symbolName: [],
      coinEval: [],
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
        percentageInnerCutout: 70,
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              // const dataLabel = data.labels[tooltipItem.index]
              const value = ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString()
              return value
            }
          }
        }
      },
      chartData: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 5,
        labels: this.symbolName,
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
  computed: {
    ...mapGetters(['getSessionId', 'getUid'])
  },
  created() {
    const vm = this
    myCoins(vm.symbol, '2', vm.getSessionId, vm.getUid).then(res => {
      vm.walletList = res.data
      vm.walletList.forEach(function (item, index, arr) {
        vm.symbolName.push(arr[index].symbolName)
        const coinEval = calcPrice(arr[index].lastPrice, arr[index].dpoQty)
        vm.coinEval.push(coinEval)
      })
    })
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>
