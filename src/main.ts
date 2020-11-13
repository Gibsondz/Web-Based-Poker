import Vue from 'vue'
import './plugins/axios'
import './plugins/ws'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './routes/router'

Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app')


