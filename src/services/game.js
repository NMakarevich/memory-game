import cards from '../data/cards.json' with { type: 'json' };
import { getRandomNumber } from '../utils/randomNumber.js';

const CLOSE_CARDS_DELAY = 1000;
const TRANSITION_DELAY = 400;

class Game {
  turns = 0;
  pairs = 0;
  cards = null;
  _shuffledCards = null;
  openedCards = null;
  disableOpen = false;

  constructor() {
    this.init();
  }

  get turnsIndicator() {
    return document.querySelector('.turns-count');
  }

  get pairsIndicator() {
    return document.querySelector('.pairs-count');
  }

  init() {
    this.turns = 0;
    this.pairs = 0;
    this.cards = cards;
    this.openedCards = [];
    this._shuffledCards = this.shuffleCards();
    this.disableOpen = false;
  }

  resetGame() {
    this.init();
    this.turnsIndicator.textContent = this.turns.toString();
    this.pairsIndicator.textContent = this.pairs.toString();
  }

  shuffleCards() {
    const cardsQuantity = this.cards.length;
    const indexes = [];
    for (let i = 0; i < cardsQuantity * 2; i++) {
      indexes.push(getRandomNumber(0, cardsQuantity * 2 - 1, indexes));
    }
    return indexes.map((index) => this.cards[Math.floor(index / 2)]);
  }

  get shuffledCards() {
    return this._shuffledCards;
  }

  openCard(card) {
    if (this.disableOpen || card.classList.contains('opened')) return;
    card.classList.remove('closed');
    setTimeout(() => {
      card.classList.add('opened');
      card.querySelector('.card-img').style.display = 'block';
    }, TRANSITION_DELAY);
    this.openedCards.push(card);
    if (this.openedCards.length === 2) {
      this.disableOpen = true;
      this.turns += 1;
      this.turnsIndicator.textContent = this.turns.toString();
      this.checkPair();
    }
  }

  closeCard(card) {
    card.classList.remove('opened');
    setTimeout(() => {
      card.classList.add('closed');
      card.querySelector('.card-img').style.display = 'none';
    }, TRANSITION_DELAY);
  }

  checkPair() {
    const [card1, card2] = this.openedCards;
    if (card1.dataset.name === card2.dataset.name) {
      this.pairs += 1;
      this.pairsIndicator.textContent = this.pairs.toString();
      this.openedCards = [];
      this.disableOpen = false;
    } else {
      setTimeout(() => {
        this.openedCards.forEach(this.closeCard);
        this.openedCards = [];
        this.disableOpen = false;
      }, CLOSE_CARDS_DELAY);
    }
  }
}

const game = new Game();
export default game;
