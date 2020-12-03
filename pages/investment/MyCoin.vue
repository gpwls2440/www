<template>
  <div class="info_con_h4">
    <p class="p_tr">* {{ $t('averageprofit/lossbyitem') }}</p>
    <div class="line_box_h2">
      <!-- line_box_h2 -->
      <ul>
        <li>
          <span class="l">{{ $t('total') }}{{ $t('bidamount') }}</span>
          <span class="r"><span class="c1">{/ total.openAmt | toFixKRW /}</span> KRW</span>
        </li>
        <li>
          <span class="l">{{ $t('total') }}{{ $t('evaluationamount') }}</span>
          <span class="r"><span class="c1">{/ total.evalAmt | toFixKRW /}</span> KRW</span>
        </li>
      </ul>
      <ul>
        <li>
          <span class="l">{{ $t('total') }}{{ $t('profitorloss') }}</span>
          <span class="r">
            <span class="c2" :class="{ red: total.evalPl > 0, blue: total.evalPl < 0 }">{/ total.evalPl | toFixKRW /}</span>
            <span class="c8">KRW</span>
          </span>
        </li>
        <li>
          <span class="l">{{ $t('total') }}{{ $t('profitrate') }}</span>
          <span class="r">
            <span class="c2" :class="{ red: total.evalPlRt > 0, blue: total.evalPlRt < 0 }">{/ total.evalPlRt | toFixPer /}</span>
            <span class="c8">%</span>
          </span>
        </li>
      </ul>
      <ul>
        <li>
          <span class="l">{{ $t('obtained') }}KRW</span>
          <span class="r"><span class="c1">{/ total.totalKRW | toFixKRW /}</span> KRW</span>
        </li>
        <li>
          <span class="l">{{ $t('obtained') }}KDP</span>
          <span class="r"><span class="c1">{/ total.totalKDP | toFixKRW /}</span> KRW</span>
        </li>
      </ul>
      <div class="total_div">
        <span class="l">{{ $t('totalassets') }}</span>
        <span class="r"><span class="c2">{/ total.totalAmt | toFixKRW /}</span> KRW</span>
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
        <tr ng-repeat="coins in walletList | orderBy:['-evalAmt'] | filter:onlyCoin ">
          <td class="tl">
            <p>
              <img src="~/assets/images/coin/btc.png" width="20" style="vertical-align: middle; margin-right: 5px" :alt="coins.simbol" /> {/ coins.simbolName /}
              <span class="c_n">{/ coins.simbol /}</span>
            </p>
          </td>
          <td class="tr">
            <p>{/ coins.openQty | toFix /} <span class="c_n">{/ coins.simbol /}</span></p>
          </td>
          <td class="tr">
            <a href="javascript:void(0)" @click="editWindowOpen(coins.simbol)">
              {/ coins.argPrice | toFixKRW /}<span class="c_n">KRW</span>
              <img style="vertical-align: -2px; margin-left: 10px" src="~/assets/images/icon_set.png" :alt="`$t('averagepurchaseprice') $t('modify')`" />
              <span v-show="coins.editFlag == 0" class="editText">{{ $t('averageprice') }} {{ $t('modify') }}</span>
              <span v-show="coins.editFlag == 1" class="editText blue">{{ $t('averageprice') }} {{ $t('Modified') }}</span>
            </a>
          </td>
          <td class="tr">{/ coins.openAmt | toFixKRW /}<span class="c_n">KRW</span></td>
          <td class="tr">{/ coins.evalAmt | toFixKRW /}<span class="c_n">KRW</span></td>
          <td class="tr">
            <p><span class="c1" :class="{ red: coins.evalPlRt > 0, blue: coins.evalPlRt < 0 }">{/ coins.evalPlRt | toFixPer /}</span> <span class="c_n">%</span></p>
            <p><span class="c1" :class="{ red: coins.evalPl > 0, blue: coins.evalPl < 0 }">{/ coins.evalPl | toFixKRW /}</span> <span class="c_n">KRW</span></p>
          </td>
          <td>
            <a ng-click="goMarket(coins.simbol)" class="btn_line">{{ $t('order') }}</a>
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
export default {
  name: 'MyCoin',
  data() {
    return {
      total: {
        evalPl: ''
      },
      coins: {
        symbol: ''
      },
      walletList: []
    }
  }
}
</script>
