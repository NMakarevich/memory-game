import { createElement } from '../../utils/createElement.js';
import Card from '../card/card.js';
import game from '../../services/game.js';

class GameField {
  constructor() {
    this.cards = game.shuffledCards;
    this.gameContainer = null;
  }

  render() {
    const sectionHeader = createElement('header', {
      classList: ['game-header'],
      children: [
        createElement('h2', {
          classList: ['turns'],
          children: [
            'Ходов: ',
            createElement('span', { classList: ['turns-count'], children: ['0'] }),
          ],
        }),
        createElement('h2', {
          classList: ['pairs'],
          children: [
            'Найдено пар: ',
            createElement('span', { classList: ['pairs-count'], children: ['0'] }),
            ` из ${this.cards.length / 2}`,
          ],
        }),
      ],
    });
    this.gameContainer = createElement('section', {
      classList: ['section', 'game'],
      children: [
        sectionHeader,
        createElement('ul', {
          classList: ['cards-list'],
          children: this.cards.map(({ name, src }, index) =>
            createElement('li', {
              classList: ['cards-list_item'],
              children: [new Card({ src, name, alt: name, id: index }).element],
            })
          ),
        }),
      ],
    });
    document.querySelector('.main .container').append(this.gameContainer);
  }
}

const gameField = new GameField();
export default gameField;
