<template>
  <div class="info_con_h4 mt5">
    <!-- info_con_h4 -->
    <table class="table_type_h3">
      <!-- table_type_h3 -->
      <colgroup>
        <col style="width: 14%" />
        <col style="width: 10%" />
        <col style="width: 10%" />
        <col style="width: 14%" />
        <col style="width: 14%" />
        <col style="width: 15%" />
        <col style="width: 14%" />
        <col style="width: * %" />
      </colgroup>
      <thead>
        <tr>
          <th>{{ $t('time') }}</th>
          <th>{{ $t('market') }}</th>
          <th>{{ $t('tradingclassification') }}</th>
          <th>{{ $t('orderprice') }}</th>
          <th>{{ $t('orderamount') }}</th>
          <th>{{ $t('signedquantity') }}</th>
          <th>{{ $t('unsignedquantity') }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mr, index) in items" :key="index">
          <td>{{ mr.ordrTime | dateAndTimeFilter }}</td>
          <td>
            <span>{{ mr.instCd }}</span>
          </td>
          <td>
            <span :class="{ red: mr.byslTp == 'B', blue: mr.byslTp == 'S' }">{{ mr.byslTp | buySellType }}</span>
          </td>
          <td class="tr2">
            {{ mr.ordrPrc }}
          </td>
          <td class="tr2">
            {{ mr.ordrQty }} <span class="c_n">{{ mr.instCd }}</span>
          </td>
          <td class="tr2">
            {{ mr.ordrQty - mr.remnQty }} <span class="c_n">{{ mr.instCd }}</span>
          </td>
          <td class="tr2">
            {{ mr.remnQty }} <span class="c_n">{{ mr.instCd }}</span>
          </td>
          <td>
            <a style="cursor: pointer" class="btn_line" @click="orderCancle(mr.instCd, mr.ordrNo, mr.remnQty)">{{ $t('orderCancel') }}</a>
          </td>
        </tr>
        <tr v-if="items.length == 0">
          <td colspan="9">미체결 내역이 없습니다.</td>
        </tr>
      </tbody>
    </table>
    <!-- // table_type_h3 -->
    <div class="page_btn">
      <ul v-if="pager.pages.length" class="pagination">
        <li :class="{ disabled: pager.currentPage === 1 }">
          <a @click="setPage(1)">&laquo;</a>
        </li>
        <li :class="{ disabled: pager.currentPage === 1 }">
          <a @click="setPage(pager.currentPage - 1)">{{ $t('previous') }}</a>
        </li>
        <li v-for="page in pager.pages" :key="page" :class="{ active: pager.currentPage === page }">
          <a @click="setPage(page)">{{ page }}</a>
        </li>
        <li :class="{ disabled: pager.currentPage === pager.totalPages }">
          <a @click="setPage(pager.currentPage + 1)">{{ $t('next') }}</a>
        </li>
        <li :class="{ disabled: pager.currentPage === pager.totalPages }">
          <a @click="setPage(pager.totalPages)">&raquo;</a>
        </li>
      </ul>
    </div>
  </div>
  <!-- // info_con_h4 -->
</template>

<script>
import { mapGetters } from 'vuex'
import { nonTransactionList } from '~/api/exchange'
export default {
  name: 'NonTransactionHist',
  components: {},
  data() {
    return {
      pager: {
        pages: ''
      },
      items: []
    }
  },
  computed: {
    ...mapGetters(['getSessionId', 'getUid'])
  },
  mounted() {
    this.getNontransactionList()
  },
  methods: {
    getNontransactionList() {
      const vm = this
      nonTransactionList(vm.getSessionId, vm.getUid, '').then(res => {
        vm.items = res.data
      })
    }
  }
}
</script>
