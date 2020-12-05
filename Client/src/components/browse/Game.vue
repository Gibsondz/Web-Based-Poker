<template>
    <v-container class="container">
        <div class="tablecontainer">
            <img id="tableimg" src="../../assets/Resources/pokerTable.jpg" alt="poker table">
            <div class="pointwrapper"> 
                <p id="potPoints">1000</p>
            </div>
            <div class="potcontainer">
                <img v-if="potCardOne" id="potcard1" :src="require(`../../assets/Resources/cards/${potCardOne.suit}/${potCardOne.value}.png`)" alt="card1">
                <img v-if="potCardTwo" id="potcard2" :src="require(`../../assets/Resources/cards/${potCardTwo.suit}/${potCardTwo.value}.png`)" alt="card2">
                <img v-if="potCardThree" id="potcard3" :src="require(`../../assets/Resources/cards/${potCardThree.suit}/${potCardThree.value}.png`)" alt="card3">
                <img v-if="potCardFour" id="potcard2" :src="require(`../../assets/Resources/cards/${potCardFour.suit}/${potCardFour.value}.png`)" alt="card2">
                <img v-if="potCardFive" id="potcard3" :src="require(`../../assets/Resources/cards/${potCardFive.suit}/${potCardFive.value}.png`)" alt="card3">
            </div>

            <div class="playercontainer">
                <div id="player1">
                <div class="player-toprow">
                    <div class="cardcontainer">
                    <img id="player1card1" :src="require(`../../assets/Resources/cards/${playerCardOne.player1Suit}/${playerCardOne.player1Value}.png`)" alt="card3">
                    <img id="player1card2" :src="require(`../../assets/Resources/cards/${playerCardTwo.player1Suit}/${playerCardTwo.player1Value}.png`)" alt="card4">
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
                    <p id="player1-pot">
                        200
                    </p>
                </div>
                </div>
                
                <div id="player2">
                <div class="player-toprow">
                    <div class="cardcontainer">
                    <img id="player2card1" :src="require(`../../assets/Resources/cards/${playerCardOne.player2Suit}/${playerCardOne.player2Value}.png`)" alt="card3">
                    <img id="player2card2" :src="require(`../../assets/Resources/cards/${playerCardTwo.player2Suit}/${playerCardTwo.player2Value}.png`)" alt="card4">
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
                    <img id="player3card1" :src="require(`../../assets/Resources/cards/${playerCardOne.player3Suit}/${playerCardOne.player3Value}.png`)" alt="card3">
                    <img id="player3card2" :src="require(`../../assets/Resources/cards/${playerCardTwo.player3Suit}/${playerCardTwo.player3Value}.png`)" alt="card4">
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
                    <img id="player4card1" :src="require(`../../assets/Resources/cards/${playerCardOne.player4Suit}/${playerCardOne.player4Value}.png`)" alt="card3">
                    <img id="player4card2" :src="require(`../../assets/Resources/cards/${playerCardTwo.player4Suit}/${playerCardTwo.player4Value}.png`)" alt="card4">
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
                    <img id="player5card1" :src="require(`../../assets/Resources/cards/${playerCardOne.player5Suit}/${playerCardOne.player5Value}.png`)" alt="card3">
                    <img id="player5card2" :src="require(`../../assets/Resources/cards/${playerCardTwo.player5Suit}/${playerCardTwo.player5Value}.png`)" alt="card4">
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
                    <img id="player6card1" :src="require(`../../assets/Resources/cards/${playerCardOne.player6Suit}/${playerCardOne.player6Value}.png`)" alt="card3">
                    <img id="player6card2" :src="require(`../../assets/Resources/cards/${playerCardTwo.player6Suit}/${playerCardTwo.player6Value}.png`)" alt="card4">
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
                    <img id="player7card1" :src="require(`../../assets/Resources/cards/${playerCardOne.player7Suit}/${playerCardOne.player7Value}.png`)" alt="card3">
                    <img id="player7card2" :src="require(`../../assets/Resources/cards/${playerCardTwo.player7Suit}/${playerCardTwo.player7Value}.png`)" alt="card4">
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
                    <img id="player8card1" :src="require(`../../assets/Resources/cards/${playerCardOne.player8Suit}/${playerCardOne.player8Value}.png`)" alt="card3">
                    <img id="player8card2" :src="require(`../../assets/Resources/cards/${playerCardTwo.player8Suit}/${playerCardTwo.player8Value}.png`)" alt="card4">
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
                        <img id="player9card1" :src="require(`../../assets/Resources/cards/${playerCardOne.player9Suit}/${playerCardOne.player9Value}.png`)" alt="card3">
                        <img id="player9card2" :src="require(`../../assets/Resources/cards/${playerCardTwo.player9Suit}/${playerCardTwo.player9Value}.png`)" alt="card4">
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
                <div v-if="isActivePlayer && isBetOut && !isBigBlindCase">
                    <v-text-field class="amount" height="1vw" color="white" dark v-model="numberData" label="Enter Amount" outlined></v-text-field>
                    <button class="gameButton" @click="bet">Raise</button>
                    <button class="gameButton" @click="call">Call</button>
                    <button class="gameButton" @click="fold">Fold</button>
                </div>
                <div v-if="isActivePlayer && !isBetOut">
                    <v-text-field class="amount" height="1vw" color="white" dark v-model="numberData" label="Enter Amount" outlined></v-text-field>  
                    <button class="gameButton" @click="bet">Bet</button>
                    <button class="gameButton" @click="check">Check</button>
                    <button class="gameButton" @click="fold">Fold</button>
                </div>
                <div v-if="isActivePlayer && isBetOut && isBigBlindCase"> 
                    <v-text-field class="amount" heigh="1vw" color="white" dark v-model="numberData" label="Enter Amount"></v-text-field>
                    <button class="gameButton" @click="bet">Raise</button>
                    <button class="gameButton" @click="check">Check</button>
                    <button class="gameButton" @click="fold">Fold</button>
                </div>
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
            playerCardOne: { 
                                player1Suit: 1, player1Value: 2,
                                player2Suit: 1, player2Value: 2,
                                player3Suit: 1, player3Value: 2,
                                player4Suit: 1, player4Value: 2,
                                player5Suit: 1, player5Value: 2,
                                player6Suit: 1, player6Value: 2,
                                player7Suit: 1, player7Value: 2,
                                player8Suit: 1, player8Value: 2,
                                player9Suit: 1, player9Value: 2,
                           },
            playerCardTwo: { 
                                player1Suit: 1, player1Value: 2,
                                player2Suit: 1, player2Value: 2,
                                player3Suit: 1, player3Value: 2,
                                player4Suit: 1, player4Value: 2,
                                player5Suit: 1, player5Value: 2,
                                player6Suit: 1, player6Value: 2,
                                player7Suit: 1, player7Value: 2,
                                player8Suit: 1, player8Value: 2,
                                player9Suit: 1, player9Value: 2,
                            },
            potCardOne: null,
            potCardTwo: null,
            potCardThree: null,
            potCardFour: null,
            potCardFive: null,
            user: null, 
            gameId: '',
            gameRendering: null,
            isActivePlayer: false,
            isBetOut: false,
            isBigBlindCase: false,
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
        
        this.user = res.data.user;

        await this.requestRendering();

        if(!this.$ws.connected) await this.$ws.connect()
        this.$ws.on(`${this.gameId}/renderGame`, this.requestRendering)
        this.$ws.on(`${this.gameId}/gameOver`, this.gameOver)
    }, 
    async destroyed() {

    }, 
      
    methods:{
        updateUi() {
            this.clearInactive();
            this.updatePot();
            this.updatePlayerValues();
        },
        gameOver(){
            document.cookie = 'gameId=""'
            window.location.href='/lobby'

        },
        clearInactive() {
            for (let i = 1 ; i < 10 ; i++ ) {
                let playerIdentifier = "player" + i;
                let player = document.getElementById( playerIdentifier );
                player.style.display = "none";
            }
        },
        updatePlayerValues() {
            let playerNumber = this.gameRendering.data.players.length;
            let startIndex = 0;

            for ( let j = 0 ; j < playerNumber ; j++ ) {
                if ( this.user.username === this.gameRendering.data.players[j].name ) {
                    startIndex = j;
                }
            }

            for ( let i = 0 ; i < playerNumber ; i++ ) {
                let playerSpot = Math.ceil( (9 / playerNumber) * i );
                if ( playerSpot === 0 ) {
                    playerSpot++;
                }

                //player position display
                let playerIdentifier = "player" + playerSpot;
                let player = document.getElementById( playerIdentifier );
                player.style.display = "block";
                
                //player points and name
                // spaghetti DONT TOUCH, blame justin
                let playerIndex = startIndex - i;
                if ( playerIndex < 0 ) {
                    playerIndex = playerNumber + playerIndex;
                }

                let playerData = this.gameRendering.data.players[playerIndex];
                
                let playerNameText = document.getElementById( playerIdentifier + "-name" );
                playerNameText.innerHTML = playerData.name;

                let playerPointsText = document.getElementById( playerIdentifier + "-points" );
                playerPointsText.innerHTML = playerData.stackSize;

                //player bet chips
                let playerBetChips = document.getElementById( playerIdentifier + "-pot" );
                playerBetChips.innerHTML = playerData.betChips;

                if ( this.gameRendering.data.activePlayer !== null && this.gameRendering.data.activePlayer.name === playerData.name ) {
                    playerBetChips.style.backgroundColor = "green";
                }
                else {
                    playerBetChips.style.backgroundColor = "blue";
                }

                //update cards 
                let holeCardsKey = "holeCards";
                console.log(playerData.name);
                console.log("holeCards" in playerData );
                if ( "holeCards" in playerData ) {
                    let playerCardOneSuit = playerData.holeCards[0].suit;
                    let playerCardOneValue = playerData.holeCards[0].value;
                    let cardSuitPlayer = playerIdentifier + "Suit";
                    let cardValuePlayer = playerIdentifier + "Value";
                    this.playerCardOne[cardSuitPlayer] = playerCardOneSuit;
                    this.playerCardOne[cardValuePlayer] = playerCardOneValue;

                    let playerCardTwoSuit = playerData.holeCards[1].suit;
                    let playerCardTwoValue = playerData.holeCards[1].value;
                    cardSuitPlayer = playerIdentifier + "Suit";
                    cardValuePlayer = playerIdentifier + "Value";
                    this.playerCardTwo[cardSuitPlayer] = playerCardTwoSuit;
                    this.playerCardTwo[cardValuePlayer] = playerCardTwoValue;
                }
                else {
                    // file path jank
                    //"../../assets/Resources/cards/facedown.png"
                    //`../../assets/Resources/cards/${playerCardOne.suit}/${playerCardOne.value}.png`
                    let dummyChangeDirSuit = 1;
                    let dummyChangeDirValue = "facedown";
                    let cardSuitPlayer = playerIdentifier + "Suit";
                    let cardValuePlayer = playerIdentifier + "Value";
                    this.playerCardOne[cardSuitPlayer] = dummyChangeDirSuit;
                    this.playerCardOne[cardValuePlayer] = dummyChangeDirValue;

                    cardSuitPlayer = playerIdentifier + "Suit";
                    cardValuePlayer = playerIdentifier + "Value";
                    this.playerCardTwo[cardSuitPlayer] = dummyChangeDirSuit;
                    this.playerCardTwo[cardValuePlayer] = dummyChangeDirValue;
                }

                //fold status
                let cardOne = document.getElementById( playerIdentifier + "card1");
                let cardTwo = document.getElementById( playerIdentifier + "card2");
                if ( playerData.isFolded ) {
                    cardOne.style.display = "none";
                    cardTwo.style.display = "none";
                }
                else {
                    cardOne.style.display = "inline-block";
                    cardTwo.style.display = "inline-block";
                }
            }
        },
        updatePot() {
            //pot cards
            if ( this.gameRendering.data.board.length === 0 ) {
                this.potCardOne = null;
                this.potCardTwo = null; 
                this.potCardThree = null;
                this.potCardFour = null;
                this.potCardFive = null;
            }
            if ( this.gameRendering.data.board.length > 0 && this.gameRendering.data.board.length < 4) {
                this.potCardOne = { suit: this.gameRendering.data.board[0].suit , value: this.gameRendering.data.board[0].value };
                this.potCardTwo = { suit: this.gameRendering.data.board[1].suit , value: this.gameRendering.data.board[1].value };
                this.potCardThree = { suit: this.gameRendering.data.board[2].suit , value: this.gameRendering.data.board[2].value };
            }
            if ( this.gameRendering.data.board.length === 4 ) {
                this.potCardFour = { suit: this.gameRendering.data.board[3].suit , value: this.gameRendering.data.board[3].value };
            }
            if ( this.gameRendering.data.board.length === 5 ) {
                this.potCardFive = { suit: this.gameRendering.data.board[4].suit , value: this.gameRendering.data.board[4].value  };
            }

            //pot size 
            document.getElementById( "potPoints" ).innerHTML = this.gameRendering.data.potSize;
        }, 
        async requestRendering(){
            let res = await this.$axios.post('/game/getRendering', {
                gameId: this.gameId,
                username: this.user.username,
            })
            this.gameRendering = res;

            console.log("gamerendering: ");
            console.log( this.gameRendering); 
            
            if(res.data.activePlayer !== null)
            {
               this.isActivePlayer = res.data.activePlayer.name === this.user.username; 
            }
            else
            {
                this.isActivePlayer = false;
            }
            this.isBetOut = res.data.isBetOut;
            this.isBigBlindCase = this.getBigBlindCase();
            
            this.updateUi();
        },
        getBigBlindCase() {
            let bigBlindCounter = 0;
            let activePlayerCounter = 0;
            for ( let i = 0 ; i < this.gameRendering.data.players.length ; i++ ) {
                if ( !this.gameRendering.data.players[i].isFolded ) {
                    activePlayerCounter++;
                }
                if ( this.gameRendering.data.players[i].betChips === this.gameRendering.data.blinds.currentHandBigBlind ) {
                    bigBlindCounter++;
                }
            }

            if ( bigBlindCounter === activePlayerCounter && this.gameRendering.data.board.length === 0 ) {
                return true;
            }
            return false;
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
  left: 65%;
  top: 87%;
  transform: translate(-37%, 0%);
}

.amount {
    margin-right: 0.25vw;
    width: 10vw;
    float: left;
}

.gameButton {
    width: 6vw;
    font-size: 1vw;
    background-color: white;
    height: 3.7vw;
    margin: 0.1vw;
    border-style: solid;
    border-radius: 1.2vw;
    border-width: 0.2vw;
    color: black;
    float: left;
    transform: translate(0%, -13%);
}
</style>