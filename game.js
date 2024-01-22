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
    playerCoins.value = 100;
    playerCoins.innerText = playerCoins.value;
    dealerCoins.value = 100;
    dealerCoins.innerText = dealerCoins.value;
  }
  
  console.log(playerCoins.value);
}


function initializeGame() {
    bet();
    hitButton.disabled = true;
    drawButton.disabled = true;
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
    checkWin();
  } else {
    setTimeout("alert('You must bet some coins before starting')");
  }
}

function addBet(){
  console.log("add bet");
  if(checkCoins()){
    playerCoins.value -= 50;
    playerCoins.innerText = playerCoins.value;
    betCoins.value += 50;
    betCoins.innerText = betCoins.value;
    console.log(playerCoins.value);
    console.log(betCoins.value);
  }
  checkCoins();
}

function minusBet(){
  if(betCoins.value != 0){
    console.log("minus bet");
    playerCoins.value += 50;
    playerCoins.innerText = playerCoins.value;
    betCoins.value -= 50;
    betCoins.innerText = betCoins.value;
    console.log(playerCoins.value);
    console.log(betCoins.value);
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
  let CardFile = {src: null};
  let cardImage = document.createElement('img');

  if(hiddenDealerCard.cardID == null){
    hiddenDealerCard.cardID = randomCard;
    console.log("hiddenCard: " + suits[randomCard.suitIndex] + "-" +ranks[randomCard.rankIndex]);
    let HiddenCardFile = hiddenDealerCard.src;
    cardImage.src = HiddenCardFile;
    cardImage.alt = suits[randomCard.suitIndex] + " " + ranks[randomCard.rankIndex];
    //cardImage.className = 'backCard';
  } else {
    console.log("random card: "+ suits[randomCard.suitIndex] + "-" +ranks[randomCard.rankIndex]);
    CardFile.src = "images/cards/"+suitsFile[randomCard.suitIndex] + "-" +ranksFile[randomCard.rankIndex] + ".jpg";
    console.log(CardFile.src);

    cardImage.src = CardFile.src;
    cardImage.alt = suits[randomCard.suitIndex] + " " + ranks[randomCard.rankIndex];
    console.log(randomCard);
  }
  hand.appendChild(cardImage);
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
    //setTimeout("alert('Draw!');", 1);
    clearingAfterGameEnds();
    setTimeout(() => {
      alert('Draw!');
      playerCoins.value += betCoins.value;
      playerCoins.innerText = playerCoins.value;
    }, 3000);
    return false;
  } else if(playerPointsValue > 21){
    flipCard();
    //setTimeout("alert('You lost " + betCoins.value + " points!');", 1);
    clearingAfterGameEnds();
    setTimeout(() => {
      alert("You lost " + betCoins.value + " points!");
      dealerCoins.value += betCoins.value;
      dealerCoins.innerText = dealerCoins.value;
    }, 3000);
    
    return false;
  } else if(playerPointsValue == 21) {
    flipCard();
    //setTimeout("alert('You win " + betCoins.value*2 + " points!');", 1);
    clearingAfterGameEnds();
    setTimeout(() => {
      alert("You win " + betCoins.value*2 + " points!");
      playerCoins.value += betCoins.value * 2;
      playerCoins.innerText = playerCoins.value;
    }, 3000);

    return false;
  } else if(dealerPointsValue == 21) {
    flipCard();
    //setTimeout("alert('You lost " + betCoins.value + " points!');", 1);
    clearingAfterGameEnds();
    setTimeout(() => {
      alert("You lost " + betCoins.value + " points!");
      dealerCoins.value += betCoins.value;
      dealerCoins.innerText = dealerCoins.value;
    }, 3000);
    
    return false;
  } else if(dealerPointsValue > 21) {
    flipCard();
    //setTimeout("alert('You win " + betCoins.value*2 + " points!');", 1);
    clearingAfterGameEnds();
    setTimeout(() => {
      alert("You win " + betCoins.value*2 + " points!");
      playerCoins.value += betCoins.value * 2;
      playerCoins.innerText = playerCoins.value;
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
      dealerPoints.innerText = '';
      playerPoints.innerText = '';
      dealerPointsValue = 0;
      playerPointsValue = 0;
      betCoins.value = 0;
      betCoins.innerText = betCoins.value;
      flipped = true;
    }, 3500);
    
}

async function dealerAfterDraw(){
  do{
    await sleep(600);
    pointsCounter(dealCard(dealerHand), true);
    await sleep(200);
  }while(checkWin())
}

function flipCard(){
  if(flipped){
  dealerHand.removeChild(dealerHand.firstChild);
  let backCard = document.createElement('img');
  let actualCard = dealerHand.firstChild;
  let BackCardSrc = "images/cards/" + suitsFile[hiddenDealerCard.cardID.suitIndex] + "-" + ranksFile[hiddenDealerCard.cardID.rankIndex] + ".jpg";

  dealerPointsValue += ranksValues[hiddenDealerCard.cardID.rankIndex];

  actualCard.style.transition = "transform 1s ease";
  actualCard.style.transform = "rotateY(90deg)";
  setTimeout(() => {
    backCard.src = BackCardSrc;
    dealerHand.replaceChild(backCard, dealerHand.firstChild);
    backCard.style.transition = "transform 1.1s ease";
    backCard.style.transform = "rotateY(90deg)";
    setTimeout(() => {
      backCard.style.transform = "rotateY(0deg)";
    }, 20);
  }, 2000);
  console.log(backCard);
  console.log("card flipped");
  flipped = false;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}