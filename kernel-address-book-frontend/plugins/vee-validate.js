import { extend } from 'vee-validate'
import { required, email, regex } from 'vee-validate/dist/rules'

extend('email', email)
extend('required', required)
extend('regex', regex)
