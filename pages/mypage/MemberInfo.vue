<template>
  <div class="info_con_h1">
    <!-- info_con_h1 -->
    <h3><img src="~/assets/images/008/ico_008001_1.png" alt="" />{{ $t('basicMemberInformation') }}</h3>
    <span class="recom_btn" onclick="clipboard()">{{ $t('copySuggestedLink') }}</span>
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
              <td><input type="text" :value="nickName" class="n_line" style="width: 70%" disabled /></td>
            </tr>
            <tr>
              <th>
                <label for="">{{ $t('ID') }}</label>
              </th>
              <td><input type="text" :value="email" class="n_line" style="width: 70%" disabled /></td>
            </tr>
            <tr>
              <th>
                <label for="">{{ $t('mobilePhoneNumber') }}</label>
              </th>
              <td>
                <input type="text" :value="phone" class="n_line" style="width: 70%" disabled />
              </td>
            </tr>
            <tr>
              <th>
                <label for="">{{ $t('withdrawalAccount') }}</label>
              </th>
              <td><input type="text" value="userInfo.bankName" class="n_line" style="width: 70%" disabled /></td>
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
                    name="userpswd"
                    class="joinInput isPw reqInput"
                    type="password"
                    required
                    :placeholder="$t('enterYourNewPassword')"
                    style="width: 92%"
                    maxlength="20"
                    @input="chkPw(value)"
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
  </div>
  <!-- // info_con_h1 -->
</template>
<script>
export default {
  name: 'MemberInfo',
  data() {
    return {}
  }
}
</script>
