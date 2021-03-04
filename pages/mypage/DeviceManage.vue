<template>
  <div class="info_con_h4 mt2">
    <!-- info_con_h4 -->

    <table v-cloak class="table_type_h3">
      <!-- table_type_h3 -->
      <colgroup>
        <col style="width: 18%" />
        <col style="width: 10%" />
        <col style="width: * %" />
        <col style="width: 16%" />
        <col style="width: 28%" />
      </colgroup>
      <tbody>
        <!--
        <tr v-for="ml in boardList | filter:sublist">
        -->
        <tr v-for="ml in boardList" :key="ml">
          <td class="tr1"><strong>{/ ml.deviceModel /}</strong></td>
          <td class="tr1 os">{/ ml.deviceOs /}</td>
          <td class="tr1">{/ ml.createDate | dateTimeText/}</td>
          <td class="tr1 bold" ng-bind-html="ml.privateKeyYn | privateKey"></td>
          <td class="tr1">
            <span class="btn" @click="deviceDeleteConfirm(ml.deviceId)">{{ $t('deviceDisabled') }}</span>
            <span v-if="ml.privateKeyYn == 'N'" class="btn greenX">{{ $t('changeMainDevice') }}</span>
            <span v-if="ml.privateKeyYn == 'Y'" class="btn green" @click="deviceMainConfirm(ml.deviceId)">{{ $t('changeMainDevice') }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- // table_type_h3 -->

    <p v-show="delCount > 0" class="del_title">{{ $t('listDisabledDevices') }}</p>
    <table v-cloak class="table_type_h3">
      <!-- table_type_h3 -->
      <colgroup>
        <col style="width: 18%" />
        <col style="width: 10%" />
        <col style="width: * %" />
        <col style="width: 16%" />
        <col style="width: 28%" />
      </colgroup>
      <tbody>
        <!--
        <tr v-for="ml in boardList | filter:dellist">
        -->
        <tr v-for="ml in boardList" :key="ml">
          <td class="tr1"><strong>{/ ml.deviceModel /}</strong></td>
          <td class="tr1 os">{/ ml.deviceOs /}</td>
          <td class="tr1">{/ ml.createDate | dateTimeText/}</td>
          <td class="tr1 deleted">{/ ml.privateKeyYn | delprivateKey /}</td>
          <td class="tr1">
            <span class="btn gray" @click="deviceDeleteDatabase(ml.deviceId)">{{ $t('delete') }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- // table_type_h3 -->
  </div>
  <!-- // info_con_h3 -->
</template>

<script>
export default {
  name: 'DeviceManage',
  data() {
    return {}
  }
}
</script>
<style>
.top_box {
  background: url('../../assets/images/img_device.png') 150px 25px no-repeat;
  width: 425px;
  height: 140px;
  margin: 20px auto;
  border: 3px #ddd solid;
  padding-left: 415px;
  padding-top: 25px;
}
.mb {
  margin-bottom: 10px;
}
.ml {
  margin-left: 10px;
}
.top_box p {
  font-size: 18px;
}
.table_type_h3 {
  border-top: 1px #ddd solid;
}

.table_type_h3 tbody td {
  font-size: 16px;
  padding: 15px 0 19px 0;
}

.btn {
  border: 1px #555 solid;
  padding: 3px 15px;
  font-size: 18px;
  margin: 0 5px;
  color: #555;
  cursor: pointer;
}
.btn:hover {
  background-color: #555;
  color: #fff;
  border-color: #555;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.green {
  border-color: #00b9b2;
  color: #00b9b2;
}

.greenX {
  border-color: #00b9b2;
  color: #00b9b2;
}

.gray {
  background-color: #555;
  color: #fff;
  border-color: #555;
}

.btn.gray:hover {
  background-color: #000;
  border-color: #000;
  color: #fff;
}

.btn.green:hover {
  background-color: #00b9b2;
  border-color: #00b9b2;
  color: #fff;
}

.btn.greenX:hover {
  background-color: red;
  border-color: red;
  color: #fff;
}

.bold {
  font-weight: bold;
}
.os {
  text-transform: capitalize;
}

.deleted {
  font-weight: bold;
  text-decoration: line-through;
}

p.del_title {
  font-size: 18px;
  font-weight: bold;
  padding-left: 20px;
  margin: 50px 0px 10px 0px;
}

.warning {
  background: url('../../assets/images/icon_pkmark.png') no-repeat;
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-left: 5px;
  cursor: pointer;
}
</style>
