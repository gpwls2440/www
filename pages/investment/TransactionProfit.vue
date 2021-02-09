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
            ><span class="c1">{{ total.buyAmt | commaFilter }}</span> KRW</span
          >
        </li>
        <li style="width: 270px">
          <span class="l">{{ $t('total') }}{{ $t('ask') }}{{ $t('price') }}</span>
          <span class="r"
            ><span class="c1">{{ total.sellAmt | commaFilter }}</span> KRW</span
          >
        </li>
        <li>
          <span class="l">{{ $t('returnoninvestment') }}</span>
          <span class="r">
            <span class="c2" :class="{ red: total.profitAmt > 0, blue: total.profitAmt < 0 }">{{ total.profitAmt | commaFilter }}</span>
            <span class="c8">KRW</span>
          </span>
        </li>
        <li style="width: 150px">
          <span class="l">{{ $t('profitrate') }}</span>
          <span class="r">
            <span class="c2" :class="{ red: total.rate > 0, blue: total.rate < 0 }">{{ total.rate | toFixed2 }}</span>
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
      <tbody v-for="(ml, index) in boardList" :key="index">
        <tr>
          <td class="tr1">{{ ml.symbol }}</td>
          <td class="tr1">
            <span>{{ ml.buyAmt | commaFilter }}</span> <span class="c_n">KRW</span>
          </td>
          <td class="tr1">
            <span>{{ ml.sellAmt | commaFilter }}</span> <span class="c_n">KRW</span>
          </td>
          <td class="tr1">
            <p>
              <span class="c1" :class="{ red: ml.profitAmt > 0, blue: ml.profitAmt < 0 }">{{ ml.profitAmt | commaFilter }}</span> <span class="c_n">KRW</span>
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
import { mapGetters } from 'vuex'
import { profitList } from '~/api/exchange'
export default {
  name: 'TransactionProfit',
  components: {},
  data() {
    return {
      pager: {
        pages: ''
      },
      total: {
        buyAmt: 0, // 총 매수
        sellAmt: 0, // 총 매도
        profitAmt: 0, // 손익
        rate: 0 // 수익률
      },
      startDt: '20210105',
      endDt: '20210205',
      options: {
        format: 'YYYY-MM-DD'
      },
      setVal: '',
      boardList: []
    }
  },
  computed: {
    ...mapGetters(['getSessionId', 'getUid'])
  },
  mounted() {
    this.goSearch()
  },
  methods: {
    setDate(val, gb) {
      this.startDt = this.$moment(this.endDt).subtract(val, gb).format('YYYY-MM-DD')
    },
    goSearch() {
      const vm = this
      profitList(vm.getSessionId, vm.getUid, vm.startDt, vm.endDt).then(res => {
        vm.boardList = res.data
        vm.boardList.forEach(function (v, i, o) {
          vm.total.buyAmt += Number(o[i].buyAmt)
          vm.total.sellAmt += Number(o[i].sellAmt)
        })
        vm.total.profitAmt = Number(vm.total.sellAmt) - Number(vm.total.buyAmt)
        vm.total.rate = (Number(vm.total.profitAmt) / Number(vm.total.buyAmt)) * 100
      })
    }
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
