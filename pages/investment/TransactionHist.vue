<template>
  <div>
    <!-- info_con_h4 -->
    <div class="list_detail">
      <div>
        {{ $t('checkperiod') }}
        <div class="box"><input id="startDate" v-model="startDt" type="text" style="width: 90px" /></div>
        -
        <div class="box"><input id="endDate" v-model="endDt" type="text" style="width: 90px" /></div>
        <a href="javascript:void(0)" :class="{ on: setVal == '1' }" class="btn_mon" @click="setDate('1')">{{ $t('today') }}</a>
        <a href="javascript:void(0)" :class="{ on: setVal == '7' }" class="btn_mon" @click="setDate('7')">1{{ $t('week') }}</a>
        <a href="javascript:void(0)" :class="{ on: setVal == '30' }" class="btn_mon" @click="setDate('30')">1{{ $t('month') }}</a>
        <a href="javascript:void(0)" :class="{ on: setVal == '90' }" class="btn_mon" @click="setDate('90')">3{{ $t('month') }}</a>
        <a href="javascript:void(0)" :class="{ on: setVal == '180' }" class="btn_mon" @click="setDate('180')">6{{ $t('month') }}</a>
        <a href="javascript:void(0)" :class="{ on: setVal == '360' }" class="btn_mon" @click="setDate('360')">1{{ $t('year') }}</a>
        <div class="box"><select class="form-control" name="tranTp" ng-model="sch.option" ng-options="item.label for item in opts"></select></div>
        <!--<div class="box"><select class="form-control" name="instCd" ng-model="sch.symbol" ng-options="item.label for item in symbolOpts"></select></div>-->
        <!--<div class="box"><input type="text" style="width:120px;" name="instCd" ng-model="sch.symbol" placeholder="코인명검색" /></div>-->
        <a href="javascript:void(0)" class="btn_1 ml05" @click="update()">SEARCH</a>
        <a href="javascript:void(0)" style="display: none" class="btn_1 ml05" @click="update1()">SEARCH</a>
        <!--<a href="javascript:void(0)" @click="update()" class="btn_search"><img src="~/assets/images/007/ico_search.png" alt="">검색</a>-->
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
          <td>{/ ml.dateTime | dateTimeText /}</td>
          <td>
            {/ ml.instCd | cutMarketSymbol/}
            <img
              v-if="ml.txAddress.length > 10"
              style="vertical-align: -2px; margin-left: 5px; cursor: pointer"
              src="~/assets/images/005/btn_img1.gif"
              :title="$t('averageprofit/lossbyitem')"
              @click="goTx(ml.txAddress, ml.instCd)"
            />
            <!--img style="vertical-align:-2px; margin-left:5px; cursor:pointer" @click="goTx(ml.txAddress, ml.instCd)" v-if="ml.txAddress.length > 10" src="~/assets/images/icon_page.png" title="블록체인네트워크확인" /-->
          </td>
          <td class="tr2"><span :class="{ red: ml.tranTp == 'TB', blue: ml.tranTp == 'TS' }">{/ ml.tranTpText /}</span></td>
          <td class="tr2">{/ ml.tranPrc | toFixKRW /}</td>
          <td class="tr2">{/ ml.tranQty | toFixPrice:ml.instCd /}</td>
          <td class="tr2">{/ ml.tranAmt | toFixKRW /}</td>
          <td class="tr2">{/ ml.sendFee | toFixPrice:ml.instCd /}</td>
          <td class="tr2">
            {/ ml.tranFee | toFixKRW /}
            <span v-show="ml.tranFee != 0 && ml.instCd.length > 6" class="c_n">KDP</span>
            <span v-show="ml.tranFee != 0 && ml.instCd.length <= 6" class="c_n">KRW</span>
          </td>
          <td class="tr2">
            <span :class="{ red: ml.plAmt > 0, blue: ml.plAmt < 0 }">{/ ml.plAmt | toFixKRW /}</span>
            <span v-show="ml.plAmt != 0" class="c_n">KRW</span>
          </td>
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
          <a v-if="pager.currentPage === 1">{{ $t('previous') }}</a>
          <a v-if="pager.currentPage !== 1" @click="setPage(pager.currentPage - 1)">{{ $t('previous') }}</a>
        </li>
        <li v-for="page in pager.pages" :key="page" :class="{ active: pager.currentPage === page }">
          <a @click="setPage(page)">{/page/}</a>
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
  </div>
  <!-- // info_con_h4 -->
</template>
<script>
export default {
  name: 'TransactionHist',
  data() {
    return {
      pager: {
        pages: []
      }
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
