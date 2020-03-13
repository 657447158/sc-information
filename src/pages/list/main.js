import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Index from './index.vue'
import '@/assets/styles/layout.scss'
import msg from '@/languages'

Vue.use(VueI18n)
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: process.env.NODE_ENV,
  messages: msg
})
new Vue({
  i18n,
  render: h => h(Index),
}).$mount('#app')
