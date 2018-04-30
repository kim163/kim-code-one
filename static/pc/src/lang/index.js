import Vue from 'vue'
import VueI18n from 'vue-i18n' //引入i8n插件
import enLocale from './en'  //英文包
import zhLocale from './zh' //中文包
import {$localStorage,$sessionStorage} from '@/util/storage'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}

const i18n = new VueI18n({
  locale: $localStorage.get('language-sel') || 'en', // 判断语言习惯设置
  messages // 挂载语言包
})

export default i18n
