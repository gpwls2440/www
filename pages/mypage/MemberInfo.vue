<template>
  <div class="info_con_h1">
    <!-- info_con_h1 -->
    <h3><img src="~/assets/images/008/ico_008001_1.png" alt="" />{{ $t('basicMemberInformation') }}</h3>
    <span v-clipboard:copy="clipboardTxt" v-clipboard:success="copyDone" v-clipboard:error="copyFail" class="recom_btn">{{ $t('copySuggestedLink') }}</span>
    <div class="gray_box_h1">
      <!-- gray_box_h1 -->
      <div class="mem_table_h1">
        <!-- mem_table_h1 -->
        <table>
          <caption>
            {{
              $t('basicMemberInformation')
            }}
          </caption>
          <colgroup>
            <col style="width: 25%" />
            <col style="width: * %" />
          </colgroup>
          <tbody>
            <tr>
              <th>
                <label for="">{{ $t('nickname') }}</label>
              </th>
              <td><input type="text" :value="userInfo.userName" class="n_line" style="width: 70%" disabled /></td>
            </tr>
            <tr>
              <th>
                <label for="">{{ $t('ID') }}</label>
              </th>
              <td><input type="text" :value="userInfo.userEmail" class="n_line" style="width: 70%" disabled /></td>
            </tr>
            <tr>
              <th>
                <label for="">{{ $t('mobilePhoneNumber') }}</label>
              </th>
              <td>
                <input type="text" :value="userInfo.userMobile" class="n_line" style="width: 70%" disabled />
              </td>
            </tr>
            <tr>
              <th>
                <label for="">{{ $t('withdrawalAccount') }}</label>
              </th>
              <td><input type="text" :value="`(` + userInfo.bankName + `)` + userInfo.bankAccountNo" class="n_line" style="width: 70%" disabled /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- //mem_table_h1 -->
    </div>
    <!-- // gray_box_h1 -->
    <h3><img src="~/assets/images/008/ico_008001_2.png" alt="" />{{ $t('editYourPassword') }}</h3>
    <div id="pwModiDiv" class="gray_box_h1">
      <div class="mem_table_h1">
        <table>
          <caption>
            {{
              $t('editYourPassword')
            }}
          </caption>
          <colgroup>
            <col style="width: 25%" />
            <col style="width: * %" />
          </colgroup>
          <tbody>
            <tr>
              <th>
                <label for="">{{ $t('currentPassword') }}</label>
              </th>
              <td><input id="oriuserpswd" v-model="oriuserpswd" type="password" name="oriuserpswd" :placeholder="$t('enterYourCurrentPassword')" style="width: 92%" /></td>
            </tr>
            <tr>
              <th>
                <label for="">{{ $t('newPassword') }}</label>
              </th>
              <td>
                <div>
                  <input
                    id="userpswd"
                    v-model="newPwd"
                    name="userpswd"
                    class="joinInput isPw reqInput"
                    type="password"
                    required
                    :placeholder="$t('enterYourNewPassword')"
                    style="width: 92%"
                    maxlength="20"
                    @input="chkPw(newPwd)"
                  />
                </div>
                <p id="pwCheckText" class="txt3" :class="{ red: passCheck == 'N', blue: passCheck == 'Y' }">
                  {{ $t('passwordGuide') }}
                </p>
              </td>
            </tr>
            <tr>
              <th>
                <label for="">{{ $t('confirmPassword') }}</label>
              </th>
              <td>
                <input id="reuserpswd" v-model="rePwd" type="password" name="reuserpswd" :placeholder="$t('enterYourPasswordAgain')" style="width: 92%" maxlength="20" @input="confirmPwd(rePwd)" />
                <p id="pwCheckText1" class="t_wa" :class="{ red: rePassCheck == 'N', blue: rePassCheck == 'Y' }">＊{{ $t('enterSamePassword') }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="tc">
      <button class="but_black" @click="goUpdatePw()">{{ $t('changePassword') }}</button>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <p slot="body">{{ text }}</p>
    </modal>
  </div>
  <!-- // info_con_h1 -->
</template>
<script>
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Modal from '~/components/Modal'
import { userInfo, chkPwd } from '~/api/user'

Vue.use(VueClipboard, { global: false })

export default {
  name: 'MemberInfo',
  components: {
    Modal
  },
  data() {
    return {
      showModal: false,
      userInfo: {},
      clipboardTxt: '',
      oriuserpswd: '',
      newPwd: '',
      rePwd: '',
      passCheck: '',
      rePassCheck: ''
    }
  },
  computed: {
    ...mapGetters(['getSessionId', 'getUid'])
  },
  mounted() {
    const vm = this
    userInfo(vm.getSessionId, vm.getUid).then(res => {
      vm.userInfo = res.data
      vm.clipboardTxt = 'https://kdex.io/auth/' + vm.encodeEmail(vm.userInfo.userEmail) + '/welcome'
    })
  },
  methods: {
    copyDone() {
      this.showModal = true
      this.text = '클립보드에 복사되었습니다. Ctrl + V 로 붙여넣기 하세요.'
    },
    copyFail() {
      this.showModal = true
      this.text = '클립보드 복사에 실패하였습니다.'
    },
    encodeEmail(str) {
      let res = ''
      for (let i = 0; i < str.length; i++) {
        let tmp = str.charCodeAt(i)
        if (tmp === 64) {
          tmp = 9733
        }
        res = res + String.fromCharCode(tmp)
      }
      return res
    },
    chkPw(str) {
      const regPwd = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/
      if (!regPwd.test(str)) {
        this.passCheck = 'N'
        $('#pwCheckText').text(this.$i18n.t('Between8And20Digits'))
      } else {
        this.passCheck = 'Y'
        $('#pwCheckText').text(this.$i18n.t('securePassword'))
      }
    },
    confirmPwd(str) {
      if (str !== this.newPwd) {
        this.rePassCheck = 'N'
      } else {
        this.rePassCheck = 'Y'
        $('#pwCheckText1').text(this.$i18n.t('signUpPWChksub1'))
      }
    },
    goUpdatePw() {
      const vm = this
      if (this.oriuserpswd === '' || this.newPwd === '' || this.rePwd === '') {
        this.showModal = true
        this.text = '비밀번호를 입력해주세요'
      } else if (this.passCheck === 'N' || this.rePassCheck === 'N') {
        this.showModal = true
        this.text = '비밀번호를 확인해주세요'
      } else {
        chkPwd(vm.oriuserpswd, vm.getSessionId, vm.getUid).then(res => {
          console.log('res.data ' + res.data)
        })
      }
    }
  }
}
</script>
<style>
.recom_btn {
  padding: 5px 10px;
  border: 1px #00b9b2 solid;
  position: absolute;
  right: 280px;
  margin-top: -50px;
  font-size: 15px;
  background: #00b9b2;
  color: #fff;
  cursor: pointer;
}

.recom_btn:hover {
  background: #fff;
  color: #00b9b2;
}
</style>
