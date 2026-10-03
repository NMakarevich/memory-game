import { createElement } from '../../utils/createElement.js';
import { Button } from '../button/button.js';
import game from '../../services/game.js';
import modal from '../modal/modal.js';
import { Results } from '../results/results.js';

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
      'aria-label': 'Новая игра',
      classList: [],
      'data-id': 'test',
    });
    const leadersTableButton = new Button({
      title: 'Таблица лидеров',
      type: 'button',
      onClick: () => this.modal.openModal(new Results().element),
      'aria-label': 'Таблица лидеров',
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
