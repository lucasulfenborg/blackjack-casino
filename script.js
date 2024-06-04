//variable names should be in snake_case
//Methods and classes should be in camelCase

class player {
    #money;

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

    getMoney() {
        return this.#money;
    }

}


class game {
    constructor(name, main) {
        this.name = name;
        this.main = main;
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

    createGameIcon() {
        let cardElement = document.createElement('div');
        cardElement.classList.add('gameIcon');
        cardElement.innerHTML = this.name;
        document.body.appendChild(cardElement);

        cardElement.addEventListener('click', function() {
            this.startGame();
        }.bind(this));


    }

    startGame() {
        document.body.innerHTML = '';
        document.title = this.name;

        this.createActionContainer();

        this.CreateGameScreen();


    }

    createActionContainer() {
        let actionContainer = document.createElement('div');
        actionContainer.classList.add('actionContainer');
        document.body.appendChild(actionContainer);
        
        //Create info div
        let infoDiv = document.createElement('div');
        infoDiv.classList.add('infoDiv');
        actionContainer.appendChild(infoDiv);

        //Display info above 
        let wallet = document.createElement('span');
        wallet.classList.add('wallet');
        wallet.innerHTML = 'Wallet: ' + this.main.player1.getMoney();
        infoDiv.appendChild(wallet);

        //Display current state of game
        let gameState = document.createElement('div');
        gameState.classList.add('gameState');
        gameState.innerHTML = '...';
        infoDiv.appendChild(gameState);

        let bet_amount = document.createElement('span');
        bet_amount.classList.add('bet_amount');
        bet_amount.innerHTML = 'Current bet: ' + this.bet;
        infoDiv.appendChild(bet_amount);

        
      
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

    createHomeButton() {
        let actionContainer = document.getElementsByClassName('actionContainer')[0];
        let homeButton = document.createElement('button');
        homeButton.classList.add('homeButton');
        homeButton.innerHTML = 'Home';
        homeButton.addEventListener('click', function() {
            this.main.createMainMenu();
        }.bind(this));
        actionContainer.appendChild(homeButton);
    }
    


    askForBet() {
        return new Promise((resolve, reject) => {

        let actionContainer = document.getElementsByClassName('actionContainer')[0];
        let bet_amount = document.getElementsByClassName('bet_amount')[0];
        bet_amount.innerHTML = 'Current bet: ' + this.bet;
        

        //Display div containing bets (5, 10, 20)
        let bet25 = document.createElement('button');
        bet25.classList.add('betButton', 'bet25');
        bet25.innerHTML = '25';
        actionContainer.appendChild(bet25);

        let bet100 = document.createElement('button');
        bet100.innerHTML = '100';
        bet100.classList.add('betButton', 'bet100');
        actionContainer.appendChild(bet100);

        
        let bet500 = document.createElement('button');
        bet500.classList.add('betButton', 'bet500');
        bet500.innerHTML = '500';
        actionContainer.appendChild(bet500);

        let doneButton = document.createElement('button');
        doneButton.classList.add('doneButton');
        doneButton.innerHTML = 'Done';
        actionContainer.appendChild(doneButton);

        //Eventlisteners for betting
        for (let button of document.getElementsByClassName('betButton')) {
            button.addEventListener('click', function() {
                if (this.main.player1.money < parseInt(button.innerHTML)) {
                    return;
                }
                else {
                    this.bet += parseInt(button.innerHTML);
                    bet_amount.innerHTML = 'Current bet: ' + this.bet;
                    this.main.player1.removeMoney(parseInt(button.innerHTML));
                    document.getElementsByClassName('wallet')[0].innerHTML = 'Wallet: ' + this.main.player1.money;
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
    constructor(name, main) {
        super(name, main);
        this.deck = [];
    }


    createDeck() { //Standard poker cards
        this.deck = ['♥A','♥2','♥3','♥4','♥5','♥6','♥7','♥8','♥9','♥10','♥J','♥Q','♥K',
             '♦A','♦2','♦3','♦4','♦5','♦6','♦7','♦8','♦9','♦10','♦J','♦Q','♦K',
             '♣A','♣2','♣3','♣4','♣5','♣6','♣7','♣8','♣9','♣10','♣J','♣Q','♣K',
             '♠A','♠2','♠3','♠4','♠5','♠6','♠7','♠8','♠9','♠10','♠J','♠Q','♠K'];
    }

    dealCard() {
        let card = this.deck[Math.floor(Math.random() * this.deck.length)];
        this.deck.splice(this.deck.indexOf(card), 1);
        return card;
    }

    CreateCardsDisplay() {
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
        player_cards_element.innerHTML = 'Your cards:';
        dealer_cards_element.innerHTML = 'Dealer cards:';

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
    constructor(main) {
        super("BlackJack", main);
        this.current_Player_Index = 0;
        this.name = "BlackJack";

        
    }

    calculateHandValue(cards) {
        let value = 0;
        let aces = 0;
    
        for (let card of cards) {
            let card_value = (card.substring(1));
            if (card_value === 'J' || card_value === 'Q' || card_value === 'K') { // face card
                value += 10;
            } else if (card_value === "A") { // Ace
                value += 11;
                aces += 1;
            } else {
                value += parseInt(card_value);
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

        super.startGame();
        

        this.player_cards = [];
        this.dealer_cards = [];
        this.createDeck();
        this.bet = 0;

        let player_value = 0;
        let dealer_value = 0;
        let payout = 0;
        let bet_amount = this.bet;
        let end_message = "...";
        let game_state_element = document.getElementsByClassName('gameState')[0];
        let player = this.players[this.current_Player_Index];


        this.CreateCardsDisplay();

        let wallet_element = document.getElementsByClassName('wallet')[0];
        wallet_element.innerHTML = 'Wallet: ' + this.main.player1.money;
        let game_state = document.getElementsByClassName('gameState')[0];
        
        game_state.innerHTML = 'Place your bet!';

        //ask for bet
        await this.askForBet();
        bet_amount = this.bet;

        // deal cards
        await game.delay(500);
        this.player_cards.push(this.dealCard());
        this.updateCardsDisplay(this.player_cards, this.dealer_cards);
        await game.delay(500);
        this.player_cards.push(this.dealCard());
        this.updateCardsDisplay(this.player_cards, this.dealer_cards);


        // Deal first card to dealer
        await game.delay(500);
        this.dealer_cards.push(this.dealCard());
        this.updateCardsDisplay(this.player_cards, this.dealer_cards);


        //display cards

        //ask for decision (hit or stand) until stand or bust
        let continueGame = true;
        while(continueGame) {
            let choice = await this.hitOrStand();
            switch(choice) {
                case 'hit':
                    await game.delay(1000);
                    this.player_cards.push(this.dealCard());
                    this.updateCardsDisplay(this.player_cards, this.dealer_cards);
                    if (this.calculateHandValue(this.player_cards) > 21) {
                        continueGame = false;
                    }
                    break;

                case 'stand':
                    continueGame = false;
                    break;
            }
  
       
        }
        //deal cards to dealer
        while(this.calculateHandValue(this.dealer_cards) < 17) {
            this.dealer_cards.push(this.dealCard());
            this.updateCardsDisplay(this.player_cards, this.dealer_cards);
            await game.delay(1000);


        }
        //determine winner
        player_value = this.calculateHandValue(this.player_cards);
        dealer_value = this.calculateHandValue(this.dealer_cards);

        switch(true) {
            case player_value > 21:
                end_message = "You busted! Dealer wins!";
                payout = 0;
                break;

            case player_value == dealer_value:
                end_message = "Push";
                payout = bet_amount;
                break;
            
            case player_value == 21 && this.player_cards.length == 2:
                end_message = "You got a blackjack! You win";
                payout = bet_amount * 2.5;
                break
            case dealer_value == 21 && this.dealer_cards.length == 2:
                end_message = "Dealer got a blackjack! Dealer wins!";
                payout = 0;
                break;
            case dealer_value > 21:
                end_message = "Dealer busted! You win!";
                payout = bet_amount * 2;
                break;
            case player_value > dealer_value:
                payout = bet_amount * 2;
                end_message = "You win!";
                break;
            case player_value < dealer_value:
                end_message = "Dealer wins!";
                payout = 0;
                break;
            
        }

        this.main.player1.addMoney(payout);
        wallet_element.innerHTML = 'Wallet: ' + this.main.player1.money;
        game_state_element.innerHTML = end_message;

        //remove buttons
        document.getElementsByClassName('hitButton')[0].remove();
        document.getElementsByClassName('standButton')[0].remove();
        this.createNewGameButton();
        this.createHomeButton();

        
    }
}

class Main {
    constructor() {
        this.games = [];
        this.player1 = null;
    }

        setup () {
            this.player1 = new player('Player1', 100);

            this.games = [
                new blackJack(this),
            ];

            this.createMainMenu();

            
        }

        createMainMenu () {
            document.body.innerHTML = '';
            //title
            document.title = 'Casino';

            //Casino title
            let title = document.createElement('h1');
            title.innerHTML = 'Welcome';
            document.body.appendChild(title);

            //select game
            let selectgame = document.createElement('h2');
            selectgame.innerHTML = 'Select your game of choice';
            document.body.appendChild(selectgame);

            
            //game icons
            for (let game of this.games) {
                game.createGameIcon();
        }
     }
    }

    

let main = new Main();
main.setup();


