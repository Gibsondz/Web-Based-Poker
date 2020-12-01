<template>
    <v-container class="container">
        <div class="tablecontainer">
            <img id="tableimg" src="../../assets/Resources/pokerTable.jpg" alt="poker table">
            <div class="pointwrapper"> 
                <p id="potpoints">1000</p>
            </div>
            <div class="potcontainer">
                <img id="potcard1" src="../../assets/Resources/cards/clubs/2.png" alt="card1">
                <img id="potcard2" src="../../assets/Resources/cards/clubs/3.png" alt="card2">
                <img id="potcard3" src="../../assets/Resources/cards/clubs/4.png" alt="card3">
                <img id="potcard2" src="../../assets/Resources/cards/diamonds/K.png" alt="card2">
                <img id="potcard3" src="../../assets/Resources/cards/diamonds/Q.png" alt="card3">
            </div>

            <div class="playercontainer">
                <div id="player1">
                <div class="player-toprow">
                    <div class="cardcontainer">
                    <img id="player1card1" src="../../assets/Resources/cards/hearts/4.png" alt="card3">
                    <img id="player1card2" src="../../assets/Resources/cards/hearts/5.png" alt="card4">
                    </div>
                    <div class="player-points">
                    <p>
                        <p id="player1-name">p6</p>  
                        <br>
                        <p id="player1-points">123</p>
                    </p>
                    </div>
                </div>
                <div class="player-bottomrrow">
                    <p id="yourplayer-pot">
                    200
                    </p>
                </div>
                </div>
                
                <div id="player2">
                <div class="player-toprow">
                    <div class="cardcontainer">
                    <img id="player2card1" src="../../assets/Resources/cards/facedown.png" alt="card3">
                    <img id="player2card2" src="../../assets/Resources/cards/facedown.png" alt="card4">
                    </div>
                    <div class="player-points">
                    <p>
                        <p id="player2-name">p6</p>  
                        <br>
                        <p id="player2-points">123</p>
                    </p>
                    </div>
                </div>
                <div class="player-bottomrrow">
                    <p id="player2-pot">
                    200
                    </p>
                </div>
                </div>

                <div id="player3">
                <div class="player-toprow">
                    <div class="cardcontainer">
                    <img id="player3card1" src="../../assets/Resources/cards/facedown.png" alt="card3">
                    <img id="player3card2" src="../../assets/Resources/cards/facedown.png" alt="card4">
                    </div>
                    <div class="player-points">
                    <p>
                        <p id="player3-name">p6</p>  
                        <br>
                        <p id="player3-points">123</p>
                    </p>
                    </div>
                </div>
                <div class="player-bottomrrow">
                    <p id="player3-pot">
                    200
                    </p>
                </div>
                </div>

                <div id="player4">
                <div class="player-toprow">
                    <div class="cardcontainer">
                    <img id="player4card1" src="../../assets/Resources/cards/facedown.png" alt="card3">
                    <img id="player4card2" src="../../assets/Resources/cards/facedown.png" alt="card4">
                    </div>
                    <div class="player-points">
                    <p>
                        <p id="player4-name">p6</p>  
                        <br>
                        <p id="player4-points">123</p>
                    </p>
                    </div>
                </div>
                <div class="player-bottomrrow">
                    <p id="player4-pot">
                    200
                    </p>
                </div>
                </div>

                <div id="player5">
                <div class="player-toprow">
                    <div class="cardcontainer">
                    <img id="player5card1" src="../../assets/Resources/cards/facedown.png" alt="card3">
                    <img id="player5card2" src="../../assets/Resources/cards/facedown.png" alt="card4">
                    </div>
                    <div class="player-points">
                    <p>
                        <p id="player5-name">p6</p>  
                        <br>
                        <p id="player5-points">123</p>
                    </p>
                    </div>
                </div>
                <div class="player-bottomrrow">
                    <p id="player5-pot">
                    200
                    </p>
                </div>
                </div>

                <div id="player6">
                <div class="player-toprow">
                    <div class="cardcontainer">
                    <img id="player6card1" src="../../assets/Resources/cards/facedown.png" alt="card3">
                    <img id="player6card2" src="../../assets/Resources/cards/facedown.png" alt="card4">
                    </div>
                    <div class="player-points">
                    <p>
                        <p id="player6-name"></p>  
                        <br>
                        <p id="player6-points"></p>
                    </p>
                    </div>
                </div>
                <div class="player-bottomrrow">
                    <p id="player6-pot">
                    200
                    </p>
                </div>
                </div>

                <div id="player7">
                <div class="player-toprow">
                    <div class="cardcontainer">
                    <img id="player7card1" src="../../assets/Resources/cards/facedown.png" alt="card3">
                    <img id="player7card2" src="../../assets/Resources/cards/facedown.png" alt="card4">
                    </div>
                    <div class="player-points">
                    <p>
                        <p id="player7-name"></p>  
                        <br>
                        <p id="player7-points"></p>
                    </p>
                    </div>
                </div>
                <div class="player-bottomrrow">
                    <p id="player7-pot">
                    200
                    </p>
                </div>
                </div>

                <div id="player8">
                <div class="player-toprow">
                    <div class="cardcontainer">
                    <img id="player8card1" src="../../assets/Resources/cards/facedown.png" alt="card3">
                    <img id="player8card2" src="../../assets/Resources/cards/facedown.png" alt="card4">
                    </div>
                    <div class="player-points">
                    <p>
                        <p id="player8-name">p6</p>  
                        <br>
                        <p id="player8-points">123</p>
                    </p>
                    </div>
                </div>
                <div class="player-bottomrrow">
                    <p id="player8-pot">
                    200
                    </p>
                </div>
                </div>

                <div id="player9">
                    <div class="player-toprow">
                        <div class="cardcontainer">
                        <img id="player9card1" src="../../assets/Resources/cards/facedown.png" alt="card3">
                        <img id="player9card2" src="../../assets/Resources/cards/facedown.png" alt="card4">
                        </div>
                        <div class="player-points">
                        <p>
                            <p id="player9-name">p6</p>  
                            <br>
                            <p id="player9-points">123</p>
                        </p>
                        </div>
                    </div>
                    <div class="player-bottomrrow">
                        <p id="player9-pot">
                        50
                        </p>
                    </div>
                </div>
            </div>
            <div class="buttonscontainer">
                <div v-if="isActivePlayer && isBetOut ">
                    <v-text-field class="amount" v-model="numberData" label="Enter Amount"></v-text-field>
                    <button class="gameButton" @click="bet">Raise</button>
                    <button class="gameButton" @click="call">Call</button>
                    <button class="gameButton" @click="fold">Fold</button>
                </div>
                <div v-if="isActivePlayer && !isBetOut">
                    <v-text-field class="amount" v-model="numberData" label="Enter Amount"></v-text-field>
                    <button class="gameButton" @click="bet">Bet</button>
                    <button class="gameButton" @click="check">Check</button>
                    <button class="gameButton" @click="fold">Fold</button>
                </div>
                
                <!--
                <div v-if="isActivePlayer && isBetOut && isBigBlindCase"> 
                    <v-text-field class="amount" v-model="numberData" label="Enter Amount"></v-text-field>
                    <button class="gameButton" @click="bet">Raise</button>
                    <button class="gameButton" @click="call">Check</button>
                    <button class="gameButton" @click="fold">Fold</button>
                </div>
                -->
            </div>
        </div>
    </v-container>
</template>
<script>
export default {
    components: {
    },
    props: {
    },
    data() {
        return {
            user: null, 
            gameId: '',
            gameRendering: null,
            isActivePlayer: false,
            isBetOut: false,
            numberData: 0
        }
    },
    async created() {
        let allCookies = document.cookie
        this.gameId = allCookies.split('; ').find(row => row.startsWith('gameId')).split('=')[1]
        let id = allCookies.split('; ').find(row => row.startsWith('name')).split('=')[1]
        this.id = id
        let res  = await this.$axios.post('/users/getUser', {
        id: id,
        })
        
        this.user = res.data.user

        await this.requestRendering();

        this.gameSetup();

        if(!this.$ws.connected) await this.$ws.connect()
        this.$ws.on(`${this.gameId}/renderGame`, this.requestRendering)
    }, 
    async destroyed() {

    }, 
      
    methods:{
        gameSetup() {
            let playerNumber = this.gameRendering.data.players.length;
            let startIndex = 0;
            for ( let i = 0 ; i < playerNumber ; i++ ) {
                let playerSpot = Math.ceil( (9 / playerNumber) * i );
                if ( playerSpot === 0 ) {
                    for ( let j = 0 ; j < playerNumber ; j++ ) {
                        if ( this.user.username === this.gameRendering.data.players[j].name ) {
                            startIndex = j;
                        }
                    }
                    playerSpot++;
                }

                let playerIdentifier = "player" + playerSpot;
                let player = document.getElementById( playerIdentifier );
                player.style.display = "block";
                
                let playerData = this.gameRendering.data.players[(startIndex + i) % playerNumber];
                
                let playerNameText = document.getElementById( playerIdentifier + "-name" );
                playerNameText.innerHTML = playerData.name;

                let playerPointsText = document.getElementById( playerIdentifier + "-points" );
                playerPointsText.innerHTML = playerData.stackSize;
            }
        },
        updateUi() {
            let playerNumber = this.gameRendering.data.players.length;
            let startIndex = 0;
            for ( let i = 0 ; i < playerNumber ; i++ ) {
                let playerSpot = Math.ceil( (9 / playerNumber) * i );
                if ( playerSpot === 0 ) {
                    for ( let j = 0 ; j < playerNumber ; j++ ) {
                        if ( this.user.username === this.gameRendering.data.players[j].name ) {
                            startIndex = j;
                        }
                    }
                    playerSpot++;
                }

                let playerIdentifier = "player" + playerSpot;
                let playerData = this.gameRendering.data.players[(startIndex + i) % playerNumber];

                let playerPointsText = document.getElementById( playerIdentifier + "-points" );
                playerPointsText.innerHTML = playerData.stackSize;

            }
        },
        async requestRendering(){
            let res = await this.$axios.post('/game/getRendering', {
                gameId: this.gameId,
                username: this.user.username,
            })
            this.gameRendering = res;

            console.log("gamerendering: ");
            console.log( this.gameRendering); 
            
            this.isActivePlayer = res.data.activePlayer.name === this.user.username;
            this.isBetOut = res.data.isBetOut;
            
            this.updateUi();
        },
        async fold(){
            let res = await this.$axios.post('/game/fold', {
                gameId: this.gameId,
                username: this.user.username,
            })
        },
        async check(){
            let res = await this.$axios.post('/game/check', {
                gameId: this.gameId,
                username: this.user.username,
            })
        },
        async bet(){
            let res = await this.$axios.post('/game/bet', {
                gameId: this.gameId,
                username: this.user.username,
                amount: parseInt(this.numberData, 10)
            })
        },
        async call(){
            let res = await this.$axios.post('/game/call', {
                gameId: this.gameId,
                username: this.user.username,
            })
        },
    }
}
</script>
<style scoped>
.tablecontainer {
  position: relative;
  text-align: center;
}

#tableimg {
  position: relative;
  top: -3vw;
  left: 0; 
  display: block;
  width: 72vw;
  overflow-y: hidden;
  margin-left: auto;
  margin-right: auto;
}

.potcontainer {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 25%;
}

.potcontainer img{
  flex: 10%;
  width: 10%;
}

.pointwrapper {
  font-size: 1vw;
  padding-bottom: 1.5vw;
  border-width: 0.2vw;
  text-align: center;
  color: white;
  position: absolute;
  border-style: solid;
  border-radius: 1.5vw;
  height: 1.3vw;
  width: 8vw;
  left: 50%;
  top: 27.5%;
  transform: translate(-50%, -30%);
}

#player1 {
  position: absolute;
  left: 70%;
  top: 64%;
  transform: translate(-30%, 0%);
}

#player2 {
  position: absolute;
  left: 52%;
  top: 64%;
  transform: translate(-30%, 0%);
  display: none;
}

#player3 {
  position: absolute;
  left: 33%;
  top: 64%;
  transform: translate(-30%, 0%);
  display: none;
}

#player4 {
  position: absolute;
  left: 26%;
  top: 39%;
  transform: translate(-30%, 0%);
  display: none;
}

#player5 {
  position: absolute;
  left: 28%;
  top: 16%;
  transform: translate(-30%, 0%);
  display: none;
}

#player6 {
  position: absolute;
  left: 44%;
  top: 5%;
  transform: translate(-30%, 0%);
  display: none;
}

#player7 {
  position: absolute;
  left: 61%;
  top: 5%;
  transform: translate(-30%, 0%);
  display: none;
}

#player8 {
  position: absolute;
  left: 76%;
  top: 20%;
  transform: translate(-30%, 0%);
  display: none;
}

#player9 {
  position: absolute;
  left: 76%;
  top: 43%;
  transform: translate(-30%, 0%);
  display: none;
}

.player-toprow {
  display: flex;
}

.player-points {
    text-align: center;
    padding: 0.5vw;
  position: absolute;
  border-style: solid;
  border-radius: 0.75vw;
  color: white;
  border-width: 0.2vw;
  width: 5vw;
  height: 4.5vw;
  font-size: 1vw;
  background-color: black;
  transform: translate(-5.6vw, 0%)
}

.cardcontainer img {
  width: 5vw;
}

.cardcontainer img:nth-child(even) {
  transform: translate(-40%, 10%) rotate(25deg);
}

.player-bottomrrow {
  color: white;
  background-color: blue;
  text-align: center;
  border-style: solid;
  border-radius: 1.2vw;
  border-width: 0.2vw;
  transform: translate(-120%, -120%);
  width: 4.5vw;
  height: auto;
  font-size: 1vw;
}

.buttonscontainer{
  position: absolute;
  left: 73%;
  top: 88%;
  transform: translate(-37%, 0%);
  width: 25vw;
}

.amount {
    width: 10vw; 
    height: auto;
    float: left;
    background-color: white;
}

.gameButton {
    width: 4vw;
    font-size: 1vw;
    background-color: white;
    height: 3vw;
    margin: 0.1vw;
    border-style: solid;
    border-radius: 1.2vw;
    border-width: 0.2vw;
    color: black;
    float: left;
}
</style>