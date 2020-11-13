import Vue from 'vue'
import axios, { AxiosInstance } from 'axios'

Vue.use(Vue  => {
    Vue.prototype.$axios = axios.create({
        baseURL: `${window.location.protocol}//${window.location.host}/api/`,
        withCredentials: true
    })
})

declare module 'vue/types/vue' {
    export interface Vue {
        $axios: AxiosInstance
    }
}