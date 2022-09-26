
import { reactive, ref } from 'vue'
import { ComposerTranslation } from 'vue-i18n'

interface IRuleForm {
  mobile: string,
  password: string
}

export default function useFromProperties (t: ComposerTranslation) {
  const loginText = ref(t('login.loginBtn'))

  const activeName = ref('login')
  const ruleFormRef = ref(null)

  const ruleForm:IRuleForm = reactive({
    mobile: '',
    password: ''
  })

  const rules = reactive({
    mobile: [{
      required: true,
      min: 11,
      max: 11,
      message: t('login.placeMobile'),
      trigger: 'blur'
    }],
    password: [{
      required: true,
      message: t('login.placePass'),
      trigger: 'blur'
    }]
  })
  return {
    loginText,
    activeName,
    ruleFormRef,
    rules,
    ruleForm
  }
}
