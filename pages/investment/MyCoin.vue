<template>
  <div>
    <p class="p_tr">* {{ $t('averageprofit/lossbyitem') }}</p>
    <div class="line_box_h2">
      <!-- line_box_h2 -->
      <ul>
        <li>
          <span class="l">{{ $t('total') }}{{ $t('bidamount') }}</span>
          <span class="r"
            ><span class="c1">{{ total.openAmt | toFixed | commaFilter }}</span> KRW</span
          >
        </li>
        <li>
          <span class="l">{{ $t('total') }}{{ $t('evaluationamount') }}</span>
          <span class="r"
            ><span class="c1">{{ total.evalAmt | toFixed | commaFilter }}</span> KRW</span
          >
        </li>
      </ul>
      <ul>
        <li>
          <span class="l">{{ $t('total') }}{{ $t('profitorloss') }}</span>
          <span class="r">
            <span class="c2" :class="{ red: total.evalPl > 0, blue: total.evalPl < 0 }">{{ total.evalPl | toFixed | commaFilter }}</span>
            <span class="c8">KRW</span>
          </span>
        </li>
        <li>
          <span class="l">{{ $t('total') }}{{ $t('profitrate') }}</span>
          <span class="r">
            <span class="c2" :class="{ red: total.evalPlRt > 0, blue: total.evalPlRt < 0 }">{{ total.evalPlRt | toFixed2 | commaFilter }}</span>
            <span class="c8">%</span>
          </span>
        </li>
      </ul>
      <ul>
        <li>
          <span class="l">{{ $t('obtained') }}KRW</span>
          <span class="r"
            ><span class="c1">{{ total.totalKRW | toFixed | commaFilter }}</span> KRW</span
          >
        </li>
        <li>
          <span class="l">{{ $t('obtained') }}KDP</span>
          <span class="r"
            ><span class="c1">{{ total.totalKDP | toFixed | commaFilter }}</span> KRW</span
          >
        </li>
      </ul>
      <div class="total_div">
        <span class="l">{{ $t('totalassets') }}</span>
        <span class="r"
          ><span class="c2">{{ total.totalAmt | toFixed | commaFilter }}</span> KRW</span
        >
      </div>
    </div>
    <!-- // line_box_h2 -->
    <table class="table_type_h3 mt3">
      <!-- table_type_h3 -->
      <colgroup>
        <col style="width: 14%" />
        <col style="width: 14%" />
        <col style="width: 15%" />
        <col style="width: 15%" />
        <col style="width: 15%" />
        <col style="width: 15%" />
        <col style="width: * %" />
      </colgroup>
      <thead>
        <tr>
          <th class="tl">
            {{ $t('retainedcoin') }}
          </th>
          <th class="tr">
            {{ $t('quantityretained') }}
          </th>
          <th class="tr">
            {{ $t('averagepurchaseprice') }}
            <!-- <a href="javascript:void(0)" class="btn_ud"></a> -->
          </th>
          <th class="tr">
            {{ $t('PurchasePrice') }}
            <!-- <a href="javascript:void(0)" class="btn_ud"></a> -->
          </th>
          <th class="tr">
            {{ $t('evaluationamount') }}
            <!-- <a href="javascript:void(0)" class="btn_ud"></a> -->
          </th>
          <th class="tr">
            {{ $t('profitorloss') }}(%)
            <!-- <a href="javascript:void(0)" class="btn_ud"></a> -->
          </th>
          <th class="tr"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coins, index) in walletList" v-show="coins.symbol !== 'KRW'" :key="index">
          <td class="tl">
            <p>
              <!--
              <img :src="require(`~/assets/images/coin/${coins.symbol}.png`)" width="20" style="vertical-align: middle; margin-right: 5px" :alt="coins.symbol" /> {{ coins.symbolName }}
              -->
              <span class="c_n">{{ coins.symbol }}</span>
            </p>
          </td>
          <td class="tr">
            <p>
              {{ coins.openQty }} <span class="c_n">{{ coins.symbol }}</span>
            </p>
          </td>
          <td class="tr">
            <a href="javascript:void(0)" @click="editWindowOpen(coins.symbol)">
              {{ coins.argPrice | toFixed | commaFilter }}<span class="c_n">KRW</span>
              <img style="vertical-align: -2px; margin-left: 10px" src="~/assets/images/icon_set.png" :alt="`$t('averagepurchaseprice')`" />
              <span v-show="coins.editFlag == 0" class="editText">{{ $t('averageprice') }} {{ $t('modify') }}</span>
              <span v-show="coins.editFlag == 1" class="editText blue">{{ $t('averageprice') }} {{ $t('modified') }}</span>
            </a>
          </td>
          <td class="tr">{{ coins.openAmt | toFixed | commaFilter }}<span class="c_n">KRW</span></td>
          <td class="tr">{{ coins.evalAmt | toFixed | commaFilter }}<span class="c_n">KRW</span></td>
          <td class="tr">
            <p>
              <span class="c1" :class="{ red: coins.evalPlRt > 0, blue: coins.evalPlRt < 0 }">{{ coins.evalPlRt }}</span> <span class="c_n">%</span>
            </p>
            <p>
              <span class="c1" :class="{ red: coins.evalPl > 0, blue: coins.evalPl < 0 }">{{ coins.evalPl | toFixed | commaFilter }}</span> <span class="c_n">KRW</span>
            </p>
          </td>
          <td>
            <a v-if="coins.symbol !== 'KRW'" class="btn_line" @click="goMarket(coins.symbol + '_KRW')">{{ $t('order') }}</a>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- // table_type_h3 -->
    <div v-if="walletList.legnth == 0" style="text-align: center; padding: 20px; font-size: 13px">
      {{ $t('nothavecoin') }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { myCoins } from '~/api/balance'
export default {
  name: 'MyCoin',
  data() {
    return {
      total: {
        totalAmt: 0,
        openAmt: 0,
        evalPl: 0,
        evalAmt: 0,
        totalKRW: 0,
        totalKDP: 0
      },
      walletList: [],
      symbol: ' ',
      type: '2'
    }
  },
  computed: {
    ...mapGetters(['getSessionId', 'getUid'])
  },
  mounted() {
    this.getMycoin()
  },
  methods: {
    ...mapMutations(['setSymbolMarket']),
    goMarket(symbolMarket) {
      this.setSymbolMarket(symbolMarket)
      this.$router.push('/exchange')
    },
    getMycoin() {
      const vm = this
      myCoins(vm.symbol, vm.type, vm.getSessionId, vm.getUid).then(res => {
        vm.walletList = res.data
        vm.walletList.forEach(function (item, index, array) {
          if (array[index].symbol !== 'KRW' && array[index].symbol !== 'KDP') {
            array[index].evalAmt = Number(array[index].evalAmt)
            array[index].openAmt = Number(array[index].openAmt)
            array[index].evalPl = Number(array[index].evalPl)

            let totalAmt = Number(array[index].lastPrice) * Number(array[index].openQty)
            totalAmt = totalAmt.toFixed(0)

            vm.total.totalAmt += Number(totalAmt)
            vm.total.openAmt += array[index].openAmt
            vm.total.evalPl += array[index].evalPl
            vm.total.evalAmt += array[index].evalAmt
          } else if (array[index].symbol === 'KRW') {
            vm.total.totalKRW = Number(array[index].dpoQty)
            vm.total.totalAmt += Number(array[index].dpoQty)
          } else if (array[index].symbol === 'KDP') {
            vm.total.totalKDP = Number(array[index].openQty)
            vm.total.totalAmt += Number(array[index].openQty)
          }
        })
        if (vm.total.evalPl !== 0) {
          vm.total.evalPlRt = (vm.total.evalPl / vm.total.openAmt) * 100
        }
      })
    }
  }
}
</script>
