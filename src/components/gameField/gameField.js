import { createElement } from '../../utils/createElement.js';
import Card from '../card/card.js';
import game from '../../services/game.js';

class GameField {
  constructor() {
    this.game = game;
    this.cards = this.game.shuffledCards;
    this.cardsList = null;
    this.game.resetGameFieldMethod = this.resetGameField;
  }

  renderCards = () => {
    return this.cards.map(({ name, src }, index) =>
      createElement('li', {
        classList: ['cards-list_item'],
        children: [new Card({ src, name, alt: name, id: index }).element],
      })
    );
  };

  resetGameField = () => {
    this.cards = this.game.shuffledCards;
    this.cardsList.replaceChildren(...this.renderCards());
  };

  render() {
    const sectionContainer = createElement('section', {
      classList: ['section', 'game'],
      children: [
        createElement('header', {
          classList: ['game-header'],
          children: [
            createElement('h2', {
              classList: ['turns'],
              children: [
                'Ходов: ',
                createElement('span', {
                  classList: ['turns-count'],
                  children: ['0'],
                  setRef: (element) => {
                    this.game.turnsIndicatorRef = element;
                  },
                }),
              ],
            }),
            createElement('h2', {
              classList: ['pairs'],
              children: [
                'Найдено пар: ',
                createElement('span', {
                  classList: ['pairs-count'],
                  children: ['0'],
                  setRef: (element) => {
                    this.game.pairsIndicatorRef = element;
                  },
                }),
                ` из ${this.cards.length / 2}`,
              ],
            }),
          ],
        }),
        createElement('ul', {
          classList: ['cards-list'],
          children: [...this.renderCards()],
          setRef: (element) => {
            this.cardsList = element;
          },
        }),
      ],
    });
    document.querySelector('.main .container').append(sectionContainer);
  }
}

const gameField = new GameField();
export default gameField;
