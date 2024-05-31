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
        return new Promise((resolve, reject) => {

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
        let ace = 0;
        for (let card of cards) {
            if (card[0] == 'h' || card[0] == 'd' || card[0] == 'c') {
                if (card[1] == '1' || card[1] == '11' || card[1] == '12' || card[1] == '13') { //Kings, queens and jacks are worth 10
                    value += 10;
                }
                else {
                    value += parseInt(card[1]);
                }
            }
            else {
                if (card[1] == '1') {
                    ace++;
                }
                else {
                    value += parseInt(card[1]);
                }
            }
        }
        for (let i = 0; i < ace; i++) { //Ace worth either 1 or 11
            if (value + 11 <= 21) {
                value += 11;
            }
            else {
                value += 1;
            }
        }
        return value;

    }

    async startGame() {
        //Clear
        document.body.innerHTML = '';

        this.player_cards = [];
        this.dealer_Cards = [];
        this.deck = this.createDeck();
        this.bets = 0;

        this.createActionContainer();

        //ask for bet
        await this.askForBet();

        // deal first card to player
        this.player_cards.push(this.dealCard(this.deck));
        console.log("Your cards: ", this.player_cards);

        // Deal first card to dealer
        this.dealer_Cards.push(this.dealCard(this.deck));
        console.log("Dealer cards: ", this.dealer_Cards);

        //display cards

        // ask for decision (hit or stand) untill stand or bust
        while(true) {
            let choice = await this.hitOrStand();
            switch(choice) {
                case 'hit':
                    this.player_cards.push(this.dealCard(this.deck));
                    console.log("Your cards: ", this.player_cards);
                    if (this.calculateHandValue(this.player_cards) > 21) {
                        console.log("You busted! Dealer wins!");
                        break;
                    }

                case 'stand':
                    break;
            }
            break
        }
        // deal cards to dealer
        while(this.calculateHandValue(this.dealer_Cards) < 17) {
            this.dealer_Cards.push(this.dealCard(this.deck));
            console.log("Dealer cards: ", this.dealer_Cards);
        }
        // determine winner
        let playerValue = this.calculateHandValue(this.player_cards);
        let dealerValue = this.calculateHandValue(this.dealer_Cards);
        switch(true) {
            case dealerValue > 21:
                console.log("Dealer busted! You win!");
                break;
            case playerValue > dealerValue:
                console.log("You win!");
                break;
            case playerValue < dealerValue:
                console.log("Dealer wins!");
                break;
            case playerValue == dealerValue:
                console.log("Push");
                break;
        }



    }
}

let games = [
    blackJack1 = new blackJack(),
];

player1 = new player('Kalle', 100);

for (let game of games) {
    game.createGameIcon();
}

//blackJack1.addPlayer(player1);
//blackJack1.startGame();

