<script>
import { Pie } from 'vue-chartjs'

export default {
  name: 'PieChart',
  extends: Pie,
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
          text: '감자=수입 14,020(만달러($)/비중%) 2015.01~2020.09',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Arial'
        }
      },
      chartData: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 10,
        labels: ['미국(48.8%)', '호주', '중국', '베트남', '벨기에', 'Other'],
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
