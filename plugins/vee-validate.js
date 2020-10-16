import Vue from 'vue'
import { extend, ValidationProvider } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

Vue.component(ValidationProvider)

extend('required', {
  ...required,
  message: '필수항목 입니다.'
})
