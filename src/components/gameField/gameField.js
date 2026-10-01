import cards from '../../data/cards.json' with { type: 'json' };
import { createElement } from '../../utils/createElement.js';
import Card from '../card/card.js';

class GameField {
  constructor() {
    this.cards = cards;
    this.gameContainer = null;
  }

  render() {
    this.gameContainer = createElement('section', {
      classList: ['section', 'game'],
      children: [
        createElement('ul', {
          classList: ['cards-list'],
          children: [...cards, ...cards].map(({ name, src }, index) =>
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
