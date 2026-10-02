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
    this.eventListeners();
  }

  render() {
    this.card = createElement('div', {
      classList: ['card', 'closed'],
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

  eventListeners = () => {
    this.card.addEventListener('click', () => this.game.openCard(this.card));
  };

  get element() {
    return this.card;
  }
}

export default Card;
