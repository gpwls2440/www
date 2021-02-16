<script>
import { Doughnut } from 'vue-chartjs'

export default {
  name: 'DoughnutChart',
  extends: Doughnut,
  plugins: [],
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        hoverBorderWidth: 20,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: '',
          fontColor: '#FFF',
          fontSize: 20,
          fontFamily: 'Arial'
        }
      },
      chartData: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 10,
        labels: ['dd', 'dfg', 'aa', 'vv', 'ff', 'Other'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#30A9DE', '#EFDC05', '#E53A40', '#DDA0DD', '#2EC4B6', '#84B1DE'],
            data: [48, 42, 6.2, 2.0, 0.6, 0]
          }
        ]
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>
