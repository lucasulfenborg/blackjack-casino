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

    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
        betAmount.innerHTML = 'Current bet: ' + this.bet;
        infoDiv.appendChild(betAmount);
      
    }

    CreateGameScreen() {
        let gameScreen = document.createElement('div');
        gameScreen.classList.add('gameScreen');
        document.body.appendChild(gameScreen);
    }


    createNewGameButton() { //inside actionContainer
        let actionContainer = document.getElementsByClassName('actionContainer')[0];
        let newGameButton = document.createElement('button');
        newGameButton.classList.add('newGameButton');
        newGameButton.innerHTML = 'New Game';
        newGameButton.addEventListener('click', function() {
            this.startGame();
        }.bind(this));
        actionContainer.appendChild(newGameButton);
    }


    askForBet() {
        return new Promise((resolve, reject) => {

        let actionContainer = document.getElementsByClassName('actionContainer')[0];
        let betAmount = document.getElementsByClassName('betAmount')[0];
        betAmount.innerHTML = 'Current bet: ' + this.bet;
        

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
                    this.bet += parseInt(button.innerHTML);
                    betAmount.innerHTML = 'Current bet: ' + this.bet;
                    player1.removeMoney(parseInt(button.innerHTML));
                    document.getElementsByClassName('wallet')[0].innerHTML = 'Wallet: ' + player1.money;
                }
            }.bind(this));
        }
        //Eventlistener for done button
        doneButton.addEventListener('click', () => {

            
            //Hide all buttons inside the actionContainer
            for (let button of document.getElementsByClassName('betButton')) {
                button.style.display = 'none';
                
            }
            doneButton.style.display = 'none';

            resolve();

            });
            
        });
            
    }};


                
    


class pokerGame extends game {
    constructor() {
        super();
        this.deck = [];
    }


    createDeck() { //Standard poker cards
        this.deck = ['h1','h2','h3','h4','h5','h6','h7','h8','h9','h10','h11','h12','h13',
                    'd1','d2','d3','d4','d5','d6','d7','d8','d9','d10','d11','d12','d13',
                    'c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12','c13',
                    's1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13'];                
    }

    dealCard() {
        let card = this.deck[Math.floor(Math.random() * this.deck.length)];
        this.deck.splice(this.deck.indexOf(card), 1);
        return card;
    }

    CreateCardsDisplay() {
        //add cards to gamescreen
        let gameScreen = document.getElementsByClassName('gameScreen')[0];
        
        let player_cards_element = document.createElement('div');
        let dealer_cards_element = document.createElement('div');
        
        dealer_cards_element.classList.add('dealer_cards');
        player_cards_element.classList.add('player_cards');
    
        gameScreen.appendChild(dealer_cards_element);
        gameScreen.appendChild(player_cards_element);

    }

    updateCardsDisplay(player_cards, dealer_cards) {
        let player_cards_element = document.getElementsByClassName('player_cards')[0];
        let dealer_cards_element = document.getElementsByClassName('dealer_cards')[0];

        //remove all cards
        player_cards_element.innerHTML = '';
        dealer_cards_element.innerHTML = '';

        for (let card of player_cards) {
            let player_card = document.createElement('div');
            player_card.innerHTML = card;
            player_card.classList.add('card');
            player_cards_element.appendChild(player_card);
        }

        for (let card of dealer_cards) {
            let dealer_card = document.createElement('div');
            dealer_card.innerHTML = card;
            dealer_card.classList.add('card');
            dealer_cards_element.appendChild(dealer_card);
        }

     

        //player_cards_element.innerHTML = player_cards.join(' ');
        //dealer_cards_element.innerHTML = dealer_cards.join(' ');




    }


    hitOrStand() {
        return new Promise((resolve, reject) => {

            //if theres allredy buttons, remove them
            if (document.getElementsByClassName('hitButton')[0]) {
                document.getElementsByClassName('hitButton')[0].remove();
            }
            if (document.getElementsByClassName('standButton')[0]) {
                document.getElementsByClassName('standButton')[0].remove();
            }

            let actionContainer = document.getElementsByClassName('actionContainer')[0];
            let gameState = document.getElementsByClassName('gameState')[0];
            gameState.innerHTML = 'Hit or stand?';
            let hitButton = document.createElement('button');
            hitButton.classList.add('hitButton');
            hitButton.innerHTML = 'Hit';
            actionContainer.appendChild(hitButton);

            let standButton = document.createElement('button');
            standButton.classList.add('standButton');
            standButton.innerHTML = 'Stand';
            actionContainer.appendChild(standButton);

            //Eventlisteners for hit or stand
            hitButton.addEventListener('click', () => {
                resolve('hit');
            });

            standButton.addEventListener('click', () => {
                resolve('stand');
            });

        });
    }
}

class blackJack extends pokerGame {
    constructor() {
        super();
        this.current_Player_Index = 0;
        this.name = "BlackJack";

        
    }

    calculateHandValue(cards) {
        let value = 0;
        let aces = 0;
    
        for (let card of cards) {
            let cardValue = parseInt(card.substring(1));
            if (cardValue > 10) { // face card
                value += 10;
            } else if (cardValue === 1) { // Ace
                value += 11;
                aces += 1;
            } else {
                value += cardValue;
            }
        }
    
        // If value is over 21 and there's an ace counted as 11, reduce the value
        while (value > 21 && aces > 0) {
            value -= 10;
            aces -= 1;
        }
    
        return value;
    }

    async startGame() {
        //Clear
        document.body.innerHTML = '';

        this.player_cards = [];
        this.dealer_cards = [];
        this.createDeck();
        this.bet = 0;
        let playerValue = 0;
        let dealerValue = 0;
        let payout = 0;
        let betAmount = this.bet;
        let end_message = "...";
        let game_state_element = document.getElementsByClassName('gameState')[0];
        let player = this.players[this.current_Player_Index];

        this.CreateGameScreen();
        this.CreateCardsDisplay();
        this.createActionContainer();

        //ask for bet
        await this.askForBet();

        // deal first card to player
        await game.delay(500);
        this.player_cards.push(this.dealCard());
        this.updateCardsDisplay(this.player_cards, this.dealer_cards);


        // Deal first card to dealer
        await game.delay(500);
        this.dealer_cards.push(this.dealCard());
        this.updateCardsDisplay(this.player_cards, this.dealer_cards);


        //display cards

        // ask for decision (hit or stand) untill stand or bust
        let continueGame = true;
        while(continueGame) {
            let choice = await this.hitOrStand();
            switch(choice) {
                case 'hit':
                    await game.delay(1000);
                    this.player_cards.push(this.dealCard());
                    this.updateCardsDisplay(this.player_cards, this.dealer_cards);
                    if (this.calculateHandValue(this.player_cards) > 21) {
                        end_message = "You busted! Dealer wins!";
                        continueGame = false;
                    }
                    break;

                case 'stand':
                    continueGame = false;
                    break;
            }
  
       
        }
        // deal cards to dealer
        while(this.calculateHandValue(this.dealer_cards) < 17) {
            this.dealer_cards.push(this.dealCard());
            this.updateCardsDisplay(this.player_cards, this.dealer_cards);
            await game.delay(1000);


        }
        // determine winner
        playerValue = this.calculateHandValue(this.player_cards);
        dealerValue = this.calculateHandValue(this.dealer_cards);

        switch(true) {
            case playerValue == 21 && this.player_cards.length == 2:
                end_message = "You got a blackjack! You win";
                payout = betAmount * 2.5;
                break
            case dealerValue == 21 && this.dealer_cards.length == 2:
                end_message = "Dealer got a blackjack! Dealer wins!";
                payout = 0;
                break;
            case dealerValue > 21:
                end_message = "Dealer busted! You win!";
                payout = betAmount * 2;
                break;
            case playerValue > dealerValue:
                payout = betAmount * 2;
                end_message = "You win!";
                break;
            case playerValue < dealerValue:
                end_message = "Dealer wins!";
                payout = 0;
                break;
            case playerValue == dealerValue:
                end_message = "Push";
                payout = betAmount;
                break;
        }

        player1.addMoney(payout);
        document.getElementsByClassName('wallet')[0].innerHTML = 'Wallet: ' + player1.money;
        document.getElementsByClassName('gameState')[0].innerHTML = end_message;

        //remove buttons
        document.getElementsByClassName('hitButton')[0].remove();
        document.getElementsByClassName('standButton')[0].remove();
        this.createNewGameButton();

        
    }
}

class blackJackWithPush extends blackJack {
    constructor() {
        super();
        this.name = "BlackJack with push";
    }

    //Override
    

}


let games = [
    new blackJack(),
];

let player1 = new player('Spelare1', 1000);

for (let game of games) {
    game.createGameIcon();
}

//blackJack1.addPlayer(player1);
//blackJack1.startGame();

