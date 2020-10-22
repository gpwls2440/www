<template>
  <fusioncharts :type="type" :width="width" :height="height" :data-format="dataFormat" :data-source="dataSource"></fusioncharts>
</template>

<script>
export default {
  name: 'SankeyChart',
  data() {
    return {
      type: 'sankey',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: '전국 40개 대표 품목과 도매시장 관계',
          subcaption: '2020-10-14',
          showLegend: '0',
          nodelabelposition: 'right',
          nodeLabelFontColor: '#000',
          nodeWidth: '50',
          theme: 'gammel'
          // orientation: 'horizontal'
          // linkalpha: 30,
          // linkhoveralpha: 60,
          // nodelabelposition: 'start'
        },
        nodes: [
          { label: '감자', color: '#ff0000' },
          { label: '광주각화도매=>광주원협' },
          { label: '고구마' },
          { label: '구리도매시장=>구리청과' },
          { label: '깻잎' },
          { label: '대구북부도매=>대구중앙' },
          { label: '당근' },
          { label: '서울가락도매=>대아청과' },
          { label: '부추' },
          { label: '서울강서도매=>강서청과' },
          { label: '사과' },
          { label: '인천구월도매=>인천농산' },
          { label: '방울토마토' },
          { label: '대구북부도매=>대구중앙' },
          { label: '메론' },
          { label: '청주도매시장=>충북원협' },
          { label: '수박' },
          { label: '충주도매시장=>충북원협' },
          { label: '밤' },
          { label: '부산반여도매=>농협반여' },
          { label: '호박' },
          { label: '순천도매시장=>순천원협' }
        ],
        links: [
          { from: '감자', to: '광주각화도매=>광주원협', value: 9850744 },
          { from: '감자', to: '광주각화도매=>광주원협', value: 780744 },
          { from: '감자', to: '대구북부도매=>대구중앙', value: 587044 },
          { from: '감자', to: '서울가락도매=>대아청과', value: 287044 },
          { from: '감자', to: '광주각화도매=>광주원협', value: 580744 },
          { from: '감자', to: '구리도매시장=>구리청과', value: 708744 },
          { from: '고구마', to: '대구북부도매=>대구중앙', value: 987044 },
          { from: '고구마', to: '부산반여도매=>농협반여', value: 47044 },
          { from: '고구마', to: '광주각화도매=>광주원협', value: 787044 },
          { from: '고구마', to: '대구북부도매=>대구중앙', value: 987044 },
          { from: '깻잎', to: '순천도매시장=>순천원협', value: 5887044 },
          { from: '깻잎', to: '서울가락도매=>대아청과', value: 9887044 },
          { from: '당근', to: '광주각화도매=>광주원협', value: 980744 },
          { from: '부추', to: '구리도매시장=>구리청과', value: 908744 },
          { from: '사과', to: '광주각화도매=>광주원협', value: 5806744 },
          { from: '메론', to: '광주각화도매=>광주원협', value: 780744 },
          { from: '방울토마토', to: '순천도매시장=>순천원협', value: 908744 },
          { from: '수박', to: '서울가락도매=>대아청과', value: 980744 },
          { from: '밤', to: '광주각화도매=>광주원협', value: 197404 },
          { from: '호박', to: '부산반여도매=>농협반여', value: 487044 },
          { from: '감자', to: '광주각화도매=>광주원협', value: 787044 },
          { from: '고구마', to: '대구북부도매=>대구중앙', value: 987044 },
          { from: '깻잎', to: '충주도매시장=>충북원협', value: 987044 },
          { from: '당근', to: '충주도매시장=>충북원협', value: 9608744 },
          { from: '부추', to: '구리도매시장=>구리청과', value: 908744 },
          { from: '사과', to: '광주각화도매=>광주원협', value: 580744 },
          { from: '메론', to: '청주도매시장=>충북원협', value: 7680744 },
          { from: '방울토마토', to: '순천도매시장=>순천원협', value: 980744 },
          { from: '수박', to: '인천구월도매=>인천농산', value: 987044 },
          { from: '밤', to: '충주도매시장=>충북원협', value: 197044 },
          { from: '호박', to: '서울강서도매=>강서청과', value: 4580744 },
          { from: '밤', to: '서울강서도매=>강서청과', value: 197404 },
          { from: '밤', to: '대구북부도매=>대구중앙', value: 9847044 },
          { from: '밤', to: '서울가락도매=>대아청과', value: 987044 },
          { from: '밤', to: '광주각화도매=>광주원협', value: 908744 },
          { from: '밤', to: '구리도매시장=>구리청과', value: 908744 },
          { from: '호박', to: '부산반여도매=>농협반여', value: 4870544 },
          { from: '호박', to: '광주각화도매=>광주원협', value: 787044 },
          { from: '호박', to: '대구북부도매=>대구중앙', value: 987044 },
          { from: '부추', to: '부산반여도매=>농협반여', value: 4870544 },
          { from: '수박', to: '인천구월도매=>인천농산', value: 7857044 },
          { from: '메론', to: '인천구월도매=>인천농산', value: 987044 }
        ]
      }
    }
  },
  mounted() {}
}
</script>
