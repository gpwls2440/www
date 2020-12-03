<template>
  <div class="info_con_h4 mt5">
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
        <a href="javascript:void(0)" class="btn_1 ml05" @click="update()">SEARCH</a>
      </div>
    </div>

    <table v-cloak class="table_type_h3 mt2">
      <!-- table_type_h3 -->
      <colgroup>
        <col style="width: 18%" />
        <col style="width: 10%" />
        <col style="width: * %" />
        <col style="width: 16%" />
        <col style="width: 18%" />
      </colgroup>
      <thead>
        <tr>
          <th>{{ $t('accessTime') }}</th>
          <th>{{ $t('accessType') }}</th>
          <th>{{ $t('accessPlatform') }}</th>
          <th>{{ $t('useOfServices') }}</th>
          <th>IP</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ml in boardList" :key="ml">
          <td class="tr1">{/ ml.connTm | dateTimeText/}</td>
          <td class="tr1">{/ ml.deviceTp | toDeviceType/}</td>
          <td class="tr1">{/ ml.deviceNm /}</td>
          <td class="tr1">
            {{ $t('login') }}
          </td>
          <td class="tr1">{/ ml.pcAddr /}</td>
        </tr>
      </tbody>
    </table>
    <!-- // table_type_h3 -->
  </div>
  <!-- // info_con_h3 -->
</template>

<script>
export default {
  name: 'AccessInfo',
  data() {
    return {}
  }
}
</script>
