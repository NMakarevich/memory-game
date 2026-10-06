import { createElement } from '../../utils/createElement.js';
import game from '../../services/game.js';

const TRANSITION_DELAY = 400;

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
          classList: ['card-img'],
          src: this.src,
          alt: this.alt,
          setRef: (element) => {
            this.cardImg = element;
          },
        }),
      ],
    });
  }

  openCard() {
    if (this.game.isDisableOpen || this.isOpened) return;
    this.isOpened = true;
    this.card.classList.remove('closed');
    setTimeout(() => {
      this.card.classList.add('opened');
      this.cardImg.style.display = 'block';
    }, TRANSITION_DELAY);
    this.game.openCard(this);
  }

  closeCard = () => {
    this.card.classList.remove('opened');
    setTimeout(() => {
      this.card.classList.add('closed');
      this.cardImg.style.display = 'none';
      this.isOpened = false;
    }, TRANSITION_DELAY);
  };

  get element() {
    return this.card;
  }
}

export default Card;
