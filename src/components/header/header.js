import { createElement } from '../../utils/createElement.js';
import Button from '../button/button.js';
import game from '../../services/game.js';
import modal from '../modal/modal.js';
import Results from '../results/results.js';

class Header {
  header = null;

  constructor() {
    this.render();
    this.modal = modal;
  }

  render() {
    const newGameButton = new Button({
      title: 'Новая игра',
      type: 'button',
      onClick: () => game.reset(),
      ariaLabel: 'Новая игра',
      classList: [],
    });
    const leadersTableButton = new Button({
      title: 'Таблица лидеров',
      type: 'button',
      onClick: () => this.modal.openModal(new Results().element),
      ariaLabel: 'Таблица лидеров',
      classList: [],
    });
    const container = createElement('div', {
      children: [newGameButton.element, leadersTableButton.element],
      classList: ['container'],
    });
    this.header = createElement('header', { children: [container], classList: ['header'] });
  }

  get element() {
    return this.header;
  }
}

const header = new Header();
export default header;
