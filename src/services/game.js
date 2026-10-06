import cards from '../data/cards.json' with { type: 'json' };
import { getRandomNumber } from '../utils/randomNumber.js';
import modal from '../components/modal/modal.js';
import WinMessage from '../components/winMessage/winMessage.js';
import { getLocalStorage, saveToLocalStorage } from '../utils/localStorage.js';

const CLOSE_CARDS_DELAY = 1000;
const MAX_RESULTS_LENGTH = 10;

class Game {
  turns = 0;
  turnsIndicator = null;
  pairs = 0;
  pairsIndicator = null;
  cards = null;
  openedCards = [];
  disableOpen = false;
  resetGameField = null;
  modal = null;

  constructor() {
    this.modal = modal;
    this.init();
    document.addEventListener('transitionend', this.enableOpen);
  }

  set resetGameFieldMethod(resetGameField) {
    this.resetGameField = resetGameField;
  }

  set turnsIndicatorRef(element) {
    this.turnsIndicator = element;
  }

  set pairsIndicatorRef(element) {
    this.pairsIndicator = element;
  }

  get isDisableOpen() {
    return this.disableOpen;
  }

  init() {
    this.turns = 0;
    this.pairs = 0;
    this.cards = cards;
    this.openedCards = [];
    this.disableOpen = false;
  }

  reset() {
    if (this.resetGameField) {
      this.init();
      this.turnsIndicator.textContent = this.turns.toString();
      this.pairsIndicator.textContent = this.pairs.toString();
      this.resetGameField();
    }
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
    return this.shuffleCards();
  }

  openCard(card) {
    if (this.openedCards.some((openedCard) => card.id === openedCard.id)) return;
    this.openedCards.push(card);
    if (this.openedCards.length === 2) {
      this.disableOpen = true;
      this.turns += 1;
      this.turnsIndicator.textContent = this.turns.toString();
      this.checkPair();
    }
  }

  enableOpen = () => {
    if (this.openedCards.length === 0) {
      this.disableOpen = false;
    }
  };

  saveResultToLS() {
    const results = getLocalStorage('mg-results');
    const date = new Date().toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const result = {
      turns: this.turns,
      date,
    };
    if (results.length < MAX_RESULTS_LENGTH) {
      results.push(result);
    } else {
      if (results[results.length - 1].turns > this.turns) {
        results.splice(results.length - 1, 1, result);
      }
    }
    saveToLocalStorage('mg-results', results);
  }

  checkEndGame = () => {
    if (this.pairs === this.cards.length) {
      this.modal.openModal(new WinMessage(this.turns).element);
      this.saveResultToLS();
    }
  };

  checkPair() {
    const [card1, card2] = this.openedCards;
    if (card1.name === card2.name) {
      this.pairs += 1;
      this.pairsIndicator.textContent = this.pairs.toString();
      this.openedCards = [];
      this.checkEndGame();
    } else {
      setTimeout(() => {
        this.openedCards.forEach((card) => card.closeCard());
        this.openedCards = [];
      }, CLOSE_CARDS_DELAY);
    }
  }
}

const game = new Game();
export default game;
