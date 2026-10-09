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
    this.cardImg = null;
    this.isOpened = false;
    this.render();

    this.card.addEventListener('transitionend', this.handleTransitionEnd);
  }

  render() {
    this.card = createElement('div', {
      classList: ['card', 'closed'],
      eventListeners: [
        {
          type: 'click',
          callback: () => this.openCard(this.card),
        },
      ],
      'data-id': this.id,
      'data-name': this.name,
      children: [
        createElement('img', {
          classList: ['card-img', 'closed'],
          src: this.src,
          alt: this.alt,
          setRef: (element) => {
            this.cardImg = element;
          },
        }),
      ],
    });
  }

  handleTransitionEnd = () => {
    if (this.isOpened) {
      this.card.classList.add('opened');
      this.cardImg.classList.remove('closed');
    } else {
      this.card.classList.add('closed');
      this.cardImg.classList.add('closed');
    }
  };

  openCard() {
    if (this.game.isDisableOpen || this.isOpened) return;
    this.isOpened = true;
    this.card.classList.remove('closed');
    this.game.openCard(this);
  }

  closeCard = () => {
    this.isOpened = false;
    this.card.classList.remove('opened');
  };

  get element() {
    return this.card;
  }
}

export default Card;
