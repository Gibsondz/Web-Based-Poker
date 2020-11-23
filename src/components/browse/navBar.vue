<template>
<div >
 <v-card  class="overflow-hidden">
    <v-app-bar
      absolute
      color="white"
      elevate-on-scroll
    >
    <v-btn elevation="0" color="#fff" @click="$emit('account')">
    <v-icon>settings</v-icon>
    <v-toolbar-title>Account</v-toolbar-title>
    </v-btn>
      
    <v-btn elevation="0" color="#fff" @click="$emit('lobby')">
    <v-toolbar-title>Lobby</v-toolbar-title>
    </v-btn>

      <v-spacer></v-spacer>
    </v-app-bar>
  </v-card>
</div>
</template>
<script>

import WaitingRoom from './WaitingRoom'
import Account from './Account'
export default {
    components: {
        Account,
        WaitingRoom
    },
    data() {
        return {
            user: null,
            showSettings: false,
            newGame: false
        }
    },   

}
</script>
<style scoped>

</style>