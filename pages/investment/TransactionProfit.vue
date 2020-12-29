<template>
  <div>
    <div class="list_detail">
      <div>
        {{ $t('checkperiod') }}
        <div class="box"><vue-pikaday v-model="startDt" style="width: 90px" :options="options" :value="startDt" /></div>
        -
        <div class="box"><vue-pikaday v-model="endDt" style="width: 90px" :options="options" :value="endDt" /></div>
        <a :class="{ on: setVal == '1' }" class="btn_mon" @click="setDate(1, 'days')">{{ $t('today') }}</a>
        <a :class="{ on: setVal == '7' }" class="btn_mon" @click="setDate(7, 'days')">1{{ $t('week') }}</a>
        <a :class="{ on: setVal == '30' }" class="btn_mon" @click="setDate(1, 'months')">1{{ $t('month') }}</a>
        <a :class="{ on: setVal == '90' }" class="btn_mon" @click="setDate(3, 'momths')">3{{ $t('month') }}</a>
        <a :class="{ on: setVal == '180' }" class="btn_mon" @click="setDate(6, 'months')">6{{ $t('month') }}</a>
        <a :class="{ on: setVal == '360' }" class="btn_mon" @click="setDate(12, 'momths')">1{{ $t('year') }}</a>
        <a class="btn_1 ml05" @click="goSearch()">SEARCH</a>
      </div>
    </div>

    <div class="line_box_h3">
      <!-- line_box_h2 -->
      <ul>
        <li style="width: 270px">
          <span class="l">{{ $t('total') }}{{ $t('purchaseamount') }}</span>
          <span class="r"
            ><span class="c1">{{ total.buyAmt }}</span> KRW</span
          >
        </li>
        <li style="width: 270px">
          <span class="l">{{ $t('total') }}{{ $t('ask') }}{{ $t('price') }}</span>
          <span class="r"
            ><span class="c1">{{ total.sellAmt }}</span> KRW</span
          >
        </li>
        <li>
          <span class="l">{{ $t('returnoninvestment') }}</span>
          <span class="r">
            <span class="c2" :class="{ red: total.profitAmt > 0, blue: total.profitAmt < 0 }">{{ total.profitAmt }}</span>
            <span class="c8">KRW</span>
          </span>
        </li>
        <li style="width: 150px">
          <span class="l">{{ $t('profitrate') }}</span>
          <span class="r">
            <span class="c2" :class="{ red: total.rate > 0, blue: total.rate < 0 }">{{ total.rate }}</span>
            <span class="c8">%</span>
          </span>
        </li>
      </ul>
    </div>
    <!-- // line_box_h2 -->
    <table class="table_type_h3 mt2">
      <!-- table_type_h3 -->
      <colgroup>
        <col style="width: * %" />
        <col style="width: * %" />
        <col style="width: * %" />
        <col style="width: * %" />
        <col style="width: * %" />
      </colgroup>
      <thead>
        <tr>
          <th>{{ $t('coinname') }}</th>
          <th>{{ $t('purchaseamount') }}(KRW)</th>
          <th>{{ $t('ask') }}{{ $t('price') }}(KRW)</th>
          <th>{{ $t('returnoninvestment') }}(KRW)</th>
          <th>{{ $t('profitrate') }}(%)</th>
        </tr>
      </thead>
      <tbody v-for="ml in boardList" :key="ml">
        <tr>
          <td class="tr1">{{ ml.symbol }}</td>
          <td class="tr1">
            <span>{{ ml.buyAmt }}</span> <span class="c_n">KRW</span>
          </td>
          <td class="tr1">
            <span>{{ ml.sellAmt }}</span> <span class="c_n">KRW</span>
          </td>
          <td class="tr1">
            <p>
              <span class="c1" :class="{ red: ml.profitAmt > 0, blue: ml.profitAmt < 0 }">{{ ml.profitAmt }}</span> <span class="c_n">KRW</span>
            </p>
          </td>
          <td class="tr1">
            <p>
              <span class="c1" :class="{ red: ml.rate > 0, blue: ml.rate < 0 }">{{ ml.rate }}</span> <span class="c_n">%</span>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- // table_type_h3 -->
  </div>
</template>
<script>
export default {
  name: 'TransactionProfit',
  components: {},
  data() {
    return {
      pager: {
        pages: ''
      },
      total: {
        profitAmt: ''
      },
      startDt: null,
      endDt: null,
      options: {
        format: 'YYYY-MM-DD'
      },
      setVal: '',
      boardList: []
    }
  },
  methods: {
    setDate(val, gb) {
      this.startDt = this.$moment(this.endDt).subtract(val, gb).format('YYYY-MM-DD')
    },
    goSearch() {}
  }
}
</script>
<style>
.table_type_h3 tr:hover,
.table_type_h3 .detailTr {
  background: #e5f8f7;
}

.blue {
  color: #3060dd !important;
}
.red {
  color: #e4292b !important;
}

.c8 {
  display: inline-block;
  width: 30px;
  text-align: left;
  padding-left: 0px;
}
</style>
