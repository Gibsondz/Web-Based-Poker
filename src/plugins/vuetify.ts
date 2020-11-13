import Vue from 'vue'
import VuetifyLib from 'vuetify/lib'
import Vuetify from 'vuetify'

Vue.use(VuetifyLib)

const vuetify = new Vuetify({
    icons: {
      iconfont: 'md'
    },
    theme: {
      dark: true
    }
})

export default vuetify