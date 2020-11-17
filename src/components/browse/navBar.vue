<template>
<div >
 <v-card  class="overflow-hidden">
    <v-app-bar
      absolute
      color="white"
      elevate-on-scroll
    >
    <v-btn elevation="0" color="#fff" @click="showSettings = true">
    <v-icon>settings</v-icon>
    <v-toolbar-title>Account</v-toolbar-title>
    </v-btn>
      
    <v-btn elevation="0" color="#fff" @click="showSettings = false">
    <v-toolbar-title>Lobby</v-toolbar-title>
    </v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>
  </v-card>
  <account  v-if="showSettings"></account>
</div>
</template>
<script>
import Account from './Account'
export default {
    components: {
        Account
    },
    data() {
        return {
            user: null,
            showSettings: false
        }
    },   
    methods:{
        settingsPage(){
            this.showSettings = true
        }

    }
}
</script>
<style scoped>

</style>