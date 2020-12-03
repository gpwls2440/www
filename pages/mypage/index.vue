<template>
  <div id="container">
    <!-- container -->
    <div class="contents">
      <!-- contents -->
      <div class="line_box_h1">
        <!-- line_box_h1 -->
        <ul class="tab_type_h1">
          <!-- tab_type_h1 -->
          <li :class="tab === '1' ? 'w25 on' : 'w25'">
            <a @click.prevent="changeTab('1')">{{ $t('membershipInformationManagement') }}</a>
          </li>
          <li :class="tab === '2' ? 'w25 on' : 'w25'">
            <a @click.prevent="changeTab('2')">{{ $t('authenticationManagement') }}</a>
          </li>
          <li :class="tab === '3' ? 'w25 on' : 'w25'">
            <a @click.prevent="changeTab('3')">{{ $t('accessInformation') }}</a>
          </li>
          <li :class="tab === '4' ? 'w25 on' : 'w25'">
            <a @click.prevent="changeTab('4')">{{ $t('deviceManagement') }}</a>
            <ul class="depth2">
              <li class="on">
                <a href="javascript:void(0)">{{ $t('averageprofit/lossbydate') }}</a>
              </li>
              <li>
                <a href="javascript:void(0)">{{ $t('averageprofit/lossbyitem') }}</a>
              </li>
            </ul>
          </li>
        </ul>
        <!-- // tab_type_h1 -->
        <component :is="mypageComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import MemberInfo from './MemberInfo'
import AuthManage from './AuthManage'
import AccessInfo from './AccessInfo'
import DeviceManage from './DeviceManage'

export default {
  components: {
    MemberInfo,
    AuthManage,
    AccessInfo,
    DeviceManage
  },
  data() {
    return {
      tab: '1',
      mypageComponent: ''
    }
  },
  mounted() {
    const vm = this
    vm.mypageComponent = 'MemberInfo'
  },
  methods: {
    changeTab(tab) {
      const vm = this
      vm.tab = tab
      if (tab === '1') {
        vm.mypageComponent = 'MemberInfo'
      } else if (tab === '2') {
        vm.mypageComponent = 'AuthManage'
      } else if (tab === '3') {
        vm.mypageComponent = 'AccessInfo'
      } else {
        vm.mypageComponent = 'DeviceManage'
      }
    }
  }
}
</script>
