<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'BarChart',
  extends: Bar,
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
          text: '감자=수입 (천달러($))',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Arial'
        },
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              const value = data.datasets[0].data[tooltipItem.index]
              if (parseInt(value) >= 1000) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
              } else {
                return value + '원'
              }
            }
          } // end callbacks:
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback(value, index, values) {
                  if (parseInt(value) >= 1000) {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  } else {
                    return value
                  }
                }
              }
            }
          ]
        }
      },
      chartData: {
        hoverBorderWidth: 10,
        labels: ['2016', '2017', '2018', '2019', '2020'],
        datasets: [
          {
            label: '미국',
            backgroundColor: '#30A9DE',
            borderColor: '#30A9DE',
            data: [9154, 12354, 5456, 460, 5511]
          },
          {
            label: '호주',
            backgroundColor: '#EFDC05',
            borderColor: '#EFDC05',
            data: [1151, 25451, 38441, 4844, 9525]
          },
          {
            label: '중국',
            backgroundColor: '#E53A40',
            borderColor: '#E53A40',
            data: [5411, 45412, 21313, 4450, 5987]
          },
          {
            label: '베트남',
            backgroundColor: '#DDA0DD',
            borderColor: '#DDA0DD',
            data: [411, 8542, 1123, 5224, 2525]
          },
          {
            label: '벨기에',
            backgroundColor: '#2EC4B6',
            borderColor: '#2EC4B6',
            data: [461, 2504, 3210, 8444, 5520]
          },
          {
            label: '스페인',
            backgroundColor: '#84B1DE',
            borderColor: '#84B1DE',
            data: []
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
