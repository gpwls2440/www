<template>
  <div>
    <!-- info_con_h4 -->
    <div class="list_detail">
      <div>
        {{ $t('checkperiod') }}
        <div class="box">
          <vue-pikaday v-model="startDt" style="width: 90px" :options="options" :value="startDt" />
        </div>
        -
        <div class="box"><vue-pikaday v-model="endDt" style="width: 90px" :options="options" :value="endDt" /></div>
        <a :class="{ on: setVal == '1' }" class="btn_mon" @click="setDate(1, 'days')">{{ $t('today') }}</a>
        <a :class="{ on: setVal == '7' }" class="btn_mon" @click="setDate(7, 'days')">1{{ $t('week') }}</a>
        <a :class="{ on: setVal == '30' }" class="btn_mon" @click="setDate(1, 'months')">1{{ $t('month') }}</a>
        <a :class="{ on: setVal == '90' }" class="btn_mon" @click="setDate(3, 'months')">3{{ $t('month') }}</a>
        <a :class="{ on: setVal == '180' }" class="btn_mon" @click="setDate(6, 'months')">6{{ $t('month') }}</a>
        <a :class="{ on: setVal == '360' }" class="btn_mon" @click="setDate(12, 'months')">1{{ $t('year') }}</a>
        <div class="box">
          <select v-model="tranTp" class="form-control" name="tranTp">
            <option value="0">구분</option>
            <option value="1">매수체결</option>
            <option value="2">매도체결</option>
            <option value="3">입금</option>
            <option value="4">출금</option>
          </select>
        </div>
        <a class="btn_1 ml05" @click="goSearch()">SEARCH</a>
      </div>
    </div>
    <p class="info_text">※ {{ $t('historywillbe') }}</p>
    <table class="table_type_h3 mt2">
      <!-- table_type_h3 -->
      <colgroup>
        <col style="width: 12%" />
        <col style="width: 11%" />
        <col style="width: 11%" />
        <col style="width: 11%" />
        <col style="width: 11%" />
        <col style="width: 11%" />
        <col style="width: 11%" />
        <col style="width: 11%" />
        <col style="width: 11%" />
        <col style="width: 11%" />
      </colgroup>
      <thead>
        <tr>
          <th>{{ $t('time') }}</th>
          <th>{{ $t('coinname') }}</th>
          <th>{{ $t('type') }}</th>
          <th>{{ $t('tradeprice') }}</th>
          <th>{{ $t('tradeamount') }}</th>
          <th>{{ $t('trademoney') }}</th>
          <th>{{ $t('transferfee') }}</th>
          <th>{{ $t('transactionfee') }}</th>
          <th>{{ $t('profitandloss') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ml in items" :key="ml">
          <td>{{ ml.dateTime }}</td>
          <td>
            {{ ml.instCd }}
            <img
              v-if="ml.txAddress.length > 10"
              style="vertical-align: -2px; margin-left: 5px; cursor: pointer"
              src="~/assets/images/005/btn_img1.gif"
              :title="$t('averageprofit/lossbyitem')"
              @click="goTx(ml.txAddress, ml.instCd)"
            />
            <!--img style="vertical-align:-2px; margin-left:5px; cursor:pointer" @click="goTx(ml.txAddress, ml.instCd)" v-if="ml.txAddress.length > 10" src="~/assets/images/icon_page.png" title="블록체인네트워크확인" /-->
          </td>
          <td class="tr2">
            <span :class="{ red: ml.tranTp == 'TB', blue: ml.tranTp == 'TS' }">{{ ml.tranTpText }}</span>
          </td>
          <td class="tr2">{{ ml.tranPrc }}</td>
          <td class="tr2">{{ ml.tranQty }}</td>
          <td class="tr2">{{ ml.tranAmt }}</td>
          <td class="tr2">{{ ml.sendFee }}</td>
          <td class="tr2">
            {{ ml.tranFee }}
            <span v-show="ml.tranFee != 0 && ml.instCd.length > 6" class="c_n">KDP</span>
            <span v-show="ml.tranFee != 0 && ml.instCd.length <= 6" class="c_n">KRW</span>
          </td>
          <td class="tr2">
            <span :class="{ red: ml.plAmt > 0, blue: ml.plAmt < 0 }">{{ ml.plAmt }}</span>
            <span v-show="ml.plAmt != 0" class="c_n">KRW</span>
          </td>
        </tr>
        <tr v-if="items.length == 0">
          <td colspan="9">거래내역이 없습니다.</td>
        </tr>
      </tbody>
    </table>
    <!-- // table_type_h3 -->
    <pagination v-if="records > 0" v-model="page1" :records="records" :per-page="pageSize" @paginate="setPage"></pagination>
    <!-- 
    <div class="page_btn">
      <ul v-if="pager.pages.length" class="pagination">
        <li :class="{ disabled: pager.currentPage === 1 }">
          <a @click="setPage(1)">&laquo;</a>
        </li>

        <li :class="{ disabled: pager.currentPage === 1 }">
          <a v-if="pager.currentPage === 1">{{ $t('previous') }}</a>
          <a v-if="pager.currentPage !== 1" @click="setPage(pager.currentPage - 1)">{{ $t('previous') }}</a>
        </li>
        <li v-for="page in pager.pages" :key="page" :class="{ active: pager.currentPage === page }">
          <a @click="setPage(page)">{{ page }}</a>
        </li>
        <li :class="{ disabled: pager.currentPage === pager.totalPages }">
          <a v-if="pager.currentPage === pager.totalPages">{{ $t('next') }}</a>
          <a v-if="pager.currentPage !== pager.totalPages" @click="setPage(pager.currentPage + 1)">{{ $t('next') }}</a>
        </li>
        <li :class="{ disabled: pager.currentPage === pager.totalPages }">
          <a @click="setPage(pager.totalPages)">&raquo;</a>
        </li>
      </ul>
    </div>
    -->
  </div>
  <!-- // info_con_h4 -->
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from 'vue-pagination-2'
import { transactionList } from '~/api/exchange'

export default {
  name: 'TransactionHist',
  components: {
    Pagination
  },
  data() {
    return {
      pager: {
        pages: []
      },
      sch: {
        option: '0'
      },
      startDt: '',
      endDt: '',
      setVal: '',
      options: {
        format: 'YYYY-MM-DD'
      },
      items: [],
      tranTp: '0',
      instCd: '',
      page1: 1,
      pageSize: 10,
      records: 100
    }
  },
  computed: {
    ...mapGetters(['getSessionId', 'getUid'])
  },
  created() {
    this.startDt = this.$moment(new Date()).format('YYYY-MM-DD')
    this.endDt = this.$moment(new Date()).format('YYYY-MM-DD')
  },
  mounted() {
    this.goSearch()
  },
  methods: {
    setDate(val, gb) {
      const vm = this
      vm.startDt = vm.$moment(vm.endDt).subtract(val, gb).format('YYYY-MM-DD')
    },
    goSearch() {
      const vm = this
      transactionList(vm.getSessionId, vm.getUid, vm.startDt, vm.endDt, vm.tranTp, vm.instCd, vm.page1, vm.pageSize).then(res => {
        this.items = res.data
      })
    },
    setPage(page) {
      this.page = page
      this.goSearch()
    }
  }
}
</script>
<style>
.form-control {
  width: 120px;
  border: 0;
  font-size: 14px;
}

.info_text {
  margin-top: 20px;
  font-size: 14px;
}
</style>
