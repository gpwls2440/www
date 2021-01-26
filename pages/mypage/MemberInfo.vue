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

    <input id="passCheck" type="hidden" name="passCheck" value="N" />
    <input id="passCheck1" type="hidden" name="passCheck1" value="N" />
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
              <td><input id="oriuserpswd" type="password" name="oriuserpswd" :placeholder="$t('enterYourCurrentPassword')" style="width: 92%" /></td>
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
                    @input="chkPw(password)"
                  />
                </div>
                <p id="pwCheckText" class="txt3">
                  {{ $t('passwordGuide') }}
                </p>
              </td>
            </tr>
            <tr>
              <th>
                <label for="">{{ $t('confirmPassword') }}</label>
              </th>
              <td>
                <input id="rereuserpswd" type="password" name="reuserpswd" oninput="chkPw1(this.value)" :placeholder="$t('enterYourPasswordAgain')" style="width: 92%" maxlength="20" />
                <p id="pwCheckText1" class="t_wa">＊{{ $t('enterSamePassword') }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="tc">
      <button class="but_black" type="button" onclick="goUpdatePw();">{{ $t('changePassword') }}</button>
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
import { userInfo } from '~/api/user'

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
      newPwd: ''
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
        $('#passCheck').val('N')
        $('#pwCheckText').text("{{i18n 'Between8And20Digits'}}")
        $('#pwCheckText').removeClass('blue')
        $('#pwCheckText').addClass('red')
      } else {
        $('#passCheck').val('Y')
        $('#pwCheckText').text("{{i18n 'securePassword'}}")
        $('#pwCheckText').removeClass('red')
        $('#pwCheckText').addClass('blue')
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
