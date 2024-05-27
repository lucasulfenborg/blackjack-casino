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
    constructor(name) {
        this.name = name;
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(player) {
        this.players.splice(this.players.indexOf(player), 1);
    }

    //Method to create a html "card" element for the game
    createGameIcon() {
        let cardElement = document.createElement('div');
        cardElement.classList.add('gameIcon');
        cardElement.innerHTML = this.name;
        document.body.appendChild(cardElement);

        //make game icon clickable that runs startGame()
        cardElement.addEventListener('click', function() {
            this.startGame();
        }.bind(this));


    }

    startGame() {

    }

    createActionContainer() {
        let actionContainer = document.createElement('div');
        actionContainer.classList.add('actionContainer');
        document.body.appendChild(actionContainer);
        
        //Create info div
        let infoDiv = document.createElement('div');
        infoDiv.classList.add('infoDiv');
        actionContainer.appendChild(infoDiv);

        //Display info above the div, wallet and current bet
        let wallet = document.createElement('span');
        wallet.classList.add('wallet');
        wallet.innerHTML = 'Wallet: ' + player1.money;
        infoDiv.appendChild(wallet);

        //Display current state of game
        let gameState = document.createElement('div');
        gameState.classList.add('gameState');
        gameState.innerHTML = 'Place your bets...';
        infoDiv.appendChild(gameState);

        let betAmount = document.createElement('span');
        betAmount.classList.add('betAmount');
        betAmount.innerHTML = 'Current bet: ' + this.bets;
        infoDiv.appendChild(betAmount);

        


    }


    askForBet() {
        let actionContainer = document.getElementsByClassName('actionContainer')[0];
        let betAmount = document.getElementsByClassName('betAmount')[0];
        betAmount.innerHTML = 'Current bet: ' + this.bets;
        

        //Display div containing bettings (5, 10, 20)
        

        let bet5 = document.createElement('button');
        bet5.classList.add('betButton');
        bet5.innerHTML = '5';
        actionContainer.appendChild(bet5);

        let bet10 = document.createElement('button');
        bet10.innerHTML = '10';
        bet10.classList.add('betButton');
        actionContainer.appendChild(bet10);

        
        let bet20 = document.createElement('button');
        bet20.classList.add('betButton');
        bet20.innerHTML = '20';
        actionContainer.appendChild(bet20);

        let doneButton = document.createElement('button');
        doneButton.classList.add('doneButton');
        doneButton.innerHTML = 'Done';
        actionContainer.appendChild(doneButton);

        //Eventlisteners for betting
        for (let button of document.getElementsByClassName('betButton')) {
            button.addEventListener('click', function() {
                if (player1.money < parseInt(button.innerHTML)) {
                    return;
                }
                else {
                    this.bets += parseInt(button.innerHTML);
                    betAmount.innerHTML = 'Current bet: ' + this.bets;
                    player1.removeMoney(parseInt(button.innerHTML));
                    document.getElementsByClassName('wallet')[0].innerHTML = 'Wallet: ' + player1.money;
                }
            }.bind(this));
        }
        //Eventlistener for done button
        doneButton.addEventListener('click', function() {
            
            //Hide all buttons inside the actionContainer
            for (let button of document.getElementsByClassName('betButton')) {
                button.style.display = 'none';
                
            }
            doneButton.style.display = 'none';


            
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
        this.current_Player_Index = 0;
        this.name = "BlackJack";
        
    }

    startGame() {
        //Clear
        document.body.innerHTML = '';


        this.player_cards = [];
        this.dealer_Cards = [];
        this.deck = this.createDeck();
        this.bets = 0;

        //Display game name
        let gameName = document.createElement('h1');
        gameName.innerHTML = this.name;
        document.body.appendChild(gameName);

        


        this.createActionContainer();

        this.askForBet();
        // deal first card to player
        this.player_cards.push(this.dealCard(this.deck));

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

let games = [
    blackJack1 = new blackJack(),
    poker1 = new pokerGame('Poker')

];

player1 = new player('Kalle', 100);

for (let game of games) {
    game.createGameIcon();
}

//blackJack1.addPlayer(player1);
//blackJack1.startGame();

