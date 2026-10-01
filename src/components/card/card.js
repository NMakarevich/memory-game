import { createElement } from '../../utils/createElement.js';

class Card {
  card = null;

  constructor({ src, id, name, alt }) {
    this.src = src;
    this.id = id;
    this.alt = alt;
    this.name = name;
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
    this.card.addEventListener('click', () => {
      if (this.card.classList.contains('closed')) {
        this.card.classList.remove('closed');
        setTimeout(() => this.card.classList.add('opened'), 400);
      }
    });
  };

  get element() {
    return this.card;
  }
}

export default Card;
