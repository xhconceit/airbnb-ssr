import { createI18n } from 'vue-i18n'
import messages from './messages'

// const i18n = createI18n({
//   locale: 'zh',
//   legacy: false,
//   messages
// })

export function createSSRI18n () {
  return createI18n({
    locale: 'zh',
    legacy: false,
    messages
  })
}
