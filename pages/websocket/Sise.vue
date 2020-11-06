<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>체결일시</th>
          <th>체결가격</th>
          <th>체결량</th>
        </tr>
        <tr v-for="(item, i) in transactionList" :key="i">
          <td>{{ item.contDtm }}</td>
          <td>{{ item.contPrice }}</td>
          <td>{{ item.contQty }}</td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactionList: []
    }
  },
  mounted() {}
}
</script>
