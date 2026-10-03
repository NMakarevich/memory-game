import { createElement } from '../../utils/createElement.js';
import game from '../../services/game.js';

class Card {
  card = null;

  constructor({ src, id, name, alt }) {
    this.src = src;
    this.id = id;
    this.alt = alt;
    this.name = name;
    this.game = game;
    this.render();
  }

  render() {
    this.card = createElement('div', {
      classList: ['card', 'closed'],
      eventListeners: [
        {
          type: 'click',
          callback: () => this.game.openCard(this.card),
        },
      ],
      'data-id': this.id,
      'data-name': this.name,
      children: [
        createElement('img', {
          classList: ['card-img'],
          src: this.src,
          alt: this.alt,
        }),
      ],
    });
  }

  get element() {
    return this.card;
  }
}

export default Card;
