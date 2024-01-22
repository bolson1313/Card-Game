// objects for cards
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
//objects for cards values
const ranksValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];

//objects for cards img sources
const suitsFile =['kier', 'karo', 'trefl', 'pik'];
const ranksFile = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'd', 'k', 'as'];

//coins values
let playerCoins = document.getElementById('playerPoints');
let dealerCoins = document.getElementById('dealerPoints');
let betCoins = document.getElementById('spanBet');
betCoins.value = 0;
betCoins.innerText = betCoins.value;

//buttons
const addButton = document.getElementById('addBet');
const minusButton = document.getElementById('minusBet');
const hitButton = document.getElementById('hit');
const drawButton = document.getElementById('draw');
const startButton = document.getElementById('start');

//player and dealer hands
const playerHand = document.getElementById('playerHand');
const dealerHand = document.getElementById('dealerHand');

//hidden dealer card
let hiddenDealerCard ={src: "images/cards/back.jpg", cardID: null};

let flipped = true;

//points and cards values
const dealerPoints = document.getElementById('dealerSum');
const playerPoints = document.getElementById('playerSum');
let dealerPointsValue = 0;
let playerPointsValue = 0;

function getRandomCard() {
  let suitIndex = Math.floor(Math.random() * suits.length)
  let rankIndex = Math.floor(Math.random() * ranks.length)
  return {suitIndex, rankIndex};
}

function bet(){
  if(playerCoins.innerText == ''){
    playerCoins.value = parseInt(localStorage.getItem('playerCoins')) || 500;
    playerCoins.innerText = playerCoins.value;
    dealerCoins.value = parseInt(localStorage.getItem('dealerCoins')) || 500;
    dealerCoins.innerText = dealerCoins.value;
    console.log("restart game");
  }
}

function initializeGame() {
    bet();
    hitButton.disabled = true;
    drawButton.disabled = true;
    betCoins.innerText = betCoins.value;
    console.log("initialize game");
}

function hit() {
  pointsCounter(dealCard(playerHand), false);
  setTimeout(() => {
    checkWin();
  }, 100);
}

function stand(){
  console.log("stand");

  flipCard();

  dealerPoints.innerText = dealerPointsValue;
  drawButton.disabled = true;
  hitButton.disabled = true;

    setTimeout(() => {
      dealerAfterDraw();
    }, 2100);
}

function startGame() {
  if(betCoins.value != 0){
    console.log("game started");
    hitButton.disabled = false;
    drawButton.disabled = false;
    addButton.disabled = true;
    minusButton.disabled = true;
    startButton.disabled = true;

    pointsCounter(dealCard(dealerHand), true);
    dealerPointsValue = 0;
    pointsCounter(dealCard(dealerHand), true);
    pointsCounter(dealCard(playerHand), false);
    pointsCounter(dealCard(playerHand), false);
  } else {
    setTimeout("alert('You must bet some coins before starting')");
  }
}

function addBet(){
  if(checkCoins()){
    playerCoins.value -= 50;
    playerCoins.innerText = playerCoins.value;
    betCoins.value = parseInt(betCoins.value) + 50;
    betCoins.innerText = betCoins.value;
  }
  checkCoins();
}

function minusBet(){
  if(betCoins.value != 0){
    playerCoins.value += 50;
    playerCoins.innerText = playerCoins.value;
    betCoins.value = parseInt(betCoins.value) - 50;
    betCoins.innerText = betCoins.value;
    checkCoins();
  }
}

function checkCoins(){
  if(playerCoins.value == 0){
    addButton.disabled = true;
    return false;
  } else {
    addButton.disabled = false;
    return true;
  }
}


function dealCard(hand) {
  let randomCard = getRandomCard();
  let CardFile = { src: null };
  let cardImage = document.createElement('img');

  if (hiddenDealerCard.cardID == null) {
    hiddenDealerCard.cardID = randomCard;
    console.log("hiddenCard: " + suits[randomCard.suitIndex] + "-" + ranks[randomCard.rankIndex]);
    let HiddenCardFile = hiddenDealerCard.src;
    cardImage.src = HiddenCardFile;
    cardImage.alt = suits[randomCard.suitIndex] + " " + ranks[randomCard.rankIndex];
  } else {
    console.log("random card: " + suits[randomCard.suitIndex] + "-" + ranks[randomCard.rankIndex]);
    CardFile.src = "images/cards/" + suitsFile[randomCard.suitIndex] + "-" + ranksFile[randomCard.rankIndex] + ".jpg";
    console.log(CardFile.src);

    cardImage.src = CardFile.src;
    cardImage.alt = suits[randomCard.suitIndex] + " " + ranks[randomCard.rankIndex];
    console.log(randomCard);
  }
  
  cardAnimation(cardImage, hand);
  return randomCard;
}

function pointsCounter(card, playerType){
  if(playerType){
    //dealer
      //checking if ace could fit into the dealer hand
      if(card.rankIndex == 12 && dealerPointsValue+11 > 21){
        dealerPointsValue += 1;
        dealerPoints.innerText = dealerPointsValue;
      } else {
        dealerPointsValue += ranksValues[card.rankIndex];
        dealerPoints.innerText = dealerPointsValue;
      }
  } else {
    //player
      //checking if ace could fit into the player hand
      if(card.rankIndex == 12 && dealerPointsValue+11 > 21){
        playerPointsValue += 1;
        playerPoints.innerText = playerPointsValue;
      } else {
        playerPointsValue += ranksValues[card.rankIndex];
        playerPoints.innerText = playerPointsValue;
      }
  }
}

function checkWin(){
  if(playerPointsValue == 21 && playerPointsValue == dealerPointsValue){
    flipCard();
    clearingAfterGameEnds();
    setTimeout(() => {
      alert('Draw!');
      playerCoins.value += betCoins.value;
      playerCoins.innerText = playerCoins.value;
    }, 3000);
    return false;
  } else if(playerPointsValue > 21){
    flipCard();
    clearingAfterGameEnds();
    setTimeout(() => {
      alert("You lost " + betCoins.value + " points!");
      dealerCoins.value += betCoins.value;
      dealerCoins.innerText = dealerCoins.value;
    }, 3000);
    
    return false;
  } else if(playerPointsValue == 21) {
    flipCard();
    clearingAfterGameEnds();
    setTimeout(() => {
      alert("You win " + betCoins.value*2 + " points!");
      playerCoins.value += betCoins.value * 2;
      playerCoins.innerText = playerCoins.value;
      dealerCoins.value -= betCoins.value;
      dealerCoins.innerText = dealerCoins.value;
    }, 3000);

    return false;
  } else if(dealerPointsValue == 21) {
    flipCard();
    clearingAfterGameEnds();
    setTimeout(() => {
      alert("You lost " + betCoins.value + " points!");
      dealerCoins.value += betCoins.value;
      dealerCoins.innerText = dealerCoins.value;
    }, 3000);
    
    return false;
  } else if(dealerPointsValue > 21) {
    flipCard();
    clearingAfterGameEnds();
    setTimeout(() => {
      alert("You win " + betCoins.value*2 + " points!");
      playerCoins.value += betCoins.value * 2;
      playerCoins.innerText = playerCoins.value;
      dealerCoins.value -= betCoins.value;
      dealerCoins.innerText = dealerCoins.value;
    }, 3000);

    return false;
  }
  return true;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function clearingAfterGameEnds(){

    setTimeout(() => {
      dealerPointsValue = 0;
      playerPointsValue = 0;
      playerPoints.innerText = '';
      dealerPoints.innerText = '';

      console.log(playerCoins.value + " | " + dealerCoins.value);
      localStorage.setItem('playerCoins', parseInt(playerCoins.value));
      localStorage.setItem('dealerCoins', parseInt(dealerCoins.value));
      console.log("saved: dealer: "+localStorage.getItem('dealerCoins')+ " player: "+localStorage.getItem('playerCoins'));
    }, 3020);
    
    hiddenDealerCard.cardID = null;
    hitButton.disabled = true;
    drawButton.disabled = true;
    hitButton.disabled = true;
    drawButton.disabled = true;

    setTimeout(() => {
      removeAllChildNodes(playerHand);
      removeAllChildNodes(dealerHand);
      addButton.disabled = false;
      minusButton.disabled = false;
      startButton.disabled = false;
      betCoins.value = 0;
      betCoins.innerText = betCoins.value;
      flipped = true;
    }, 3500);
    outOfCoins();
}

function outOfCoins(){
  if(playerCoins.value <= 0){
    setTimeout(() => {
      alert("Game Over! You lost!");
      localStorage.clear();
      console.log("restart! dealer: "+localStorage.getItem('dealerCoins')+" player: "+localStorage.getItem('playerCoins'));
      window.location.reload();
    }, 3200);
  } else if(dealerCoins.value <= 0){
    setTimeout(() => {
      alert("Game Over! You You Won!");
      localStorage.clear();
      console.log("restart: "+localStorage.getItem('dealerCoins')+" player: "+localStorage.getItem('playerCoins'));
      window.location.reload();
    }, 3200);
  }
}

async function dealerAfterDraw(){
  while(checkWin()){ 
    await sleep(1000);
    if(dealerPointsValue > playerPointsValue && dealerPointsValue <= 21){
        clearingAfterGameEnds();
        setTimeout(() => {
          alert("You lost " + betCoins.value + " points!");
          dealerCoins.value += betCoins.value;
          dealerCoins.innerText = dealerCoins.value;
        }, 3000);
        break;
    }
    pointsCounter(dealCard(dealerHand), true);
    await sleep(300);
  }
}

function flipCard(){
  
  if(flipped){
  let backCard = document.createElement('img');
  let actualCard = dealerHand.getElementsByTagName('img')[0];
  let BackCardSrc = "images/cards/" + suitsFile[hiddenDealerCard.cardID.suitIndex] + "-" + ranksFile[hiddenDealerCard.cardID.rankIndex] + ".jpg";
  
  dealerPointsValue += ranksValues[hiddenDealerCard.cardID.rankIndex];
  dealerPoints.innerText = dealerPointsValue;

  actualCard.style.transition = "transform 1s ease";
  actualCard.style.transform = "rotateY(90deg) translateX(-20%)";
  setTimeout(() => {
    backCard.src = BackCardSrc;
    dealerHand.replaceChild(backCard, actualCard);
    
    backCard.style.transition = "transform 1.1s ease";
    backCard.style.transform = "rotateY(90deg)  translateX(-20%)";
    setTimeout(() => {
      backCard.style.transform = "rotateY(0deg)  translateX(-20%)";
    }, 20);
  }, 2000);
  console.log("card flipped");
  flipped = false;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function stackCards(hand) {
  let cards = hand.getElementsByTagName('img');
  cards[0].style.transition = "transform 0.4s ease";
  cards[0].style.transform = "translateX(-20%)";
  for (let i = 1; i < cards.length; i++) {
      cards[i].style.transition = "transform 0.4s ease";
      cards[i].style.transform = 'translateX('+(i-1)*20+'%)';
  }
}

function cardAnimation(cardImage, hand) {
  hand.appendChild(cardImage);
  let startPos = window.innerWidth;
  cardImage.style.transform = 'translateX('+startPos+'px)';
  cardImage.style.transition = 'transform 1s ease'; 


  let cards = hand.getElementsByTagName('img');

  setTimeout(() => {
    cardImage.style.transform = 'translateX(0)';
  }, 100);

  setTimeout(() => {
    stackCards(hand);
  }, 1100);
}