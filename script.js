// ha understreck i variabel_namn
// Metoder och klasser ska vara i camelCase

class player {
    constructor(name, money) {
        this.name = name;
        this.money = money;
    }

    addMoney(amount) {
        if(amount > 0) {
            this.money += amount;
        }
    }

    removeMoney(amount) {
        if(amount <= this.money && amount > 0){
                this.money -= amount;
            }
    }
}

class game {
    constructor() {
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(player) {
        this.players.splice(this.players.indexOf(player), 1);
    }

    //Method to create a html "card" element for the game
    createGameIcon(name) {
        let cardElement = document.createElement('div');
        cardElement.classList.add('gameIcon');
        cardElement.innerHTML = name;
        document.body.appendChild(cardElement);

        //make game icon clickable that runs startGame()
        cardElement.addEventListener('click', function() {
            this.startGame();
        }.bind(this));


    }

}

class pokerGame extends game {
    createDeck() { //Standard poker cards
        let deck = ['h1','h2','h3','h4','h5','h6','h7','h8','h9','h10','h11','h12','h13',
                    'd1','d2','d3','d4','d5','d6','d7','d8','d9','d10','d11','d12','d13',
                    'c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12','c13',
                    's1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13'];                
        return deck;
    }

    dealCard(deck) {
 
        let card = deck[Math.floor(Math.random() * deck.length)];
        deck.splice(deck.indexOf(card), 1);
        return card;
}

    



}

class blackJack extends pokerGame {
    constructor() {
        super();
        this.currentPlayerIndex = 0;
        this.player_cards = [];

    }

    startGame() {
        //Clear
        document.body.innerHTML = '';

        this.deck = this.createDeck();

        // ask for bets
        // deal first card to player
        // deal cards to dealer
        // play turns
        // dealer play
        // determine winner


        let deck1 = blackJack1.createDeck();
        console.log(deck1);
        let card1 = blackJack1.dealCard(deck1);
        console.log(card1);
        console.log(deck1);




        //while (!this.isGameOver()) {
        //    this.playTurn();
        //}

        // Determine winner, handle end of game
    }

    

    isGameOver() {
        // Check if the game is over
    }

    playTurn() {
        // Implement the logic for a player's turn

    }

    
    dealerPlay() {
        // Implement the logic for the dealer's turn

   
    }

    

}

player1 = new player('Kalle', 100);
blackJack1 = new blackJack();

blackJack1.createGameIcon('BlackJack');

//blackJack1.addPlayer(player1);
//blackJack1.startGame();

