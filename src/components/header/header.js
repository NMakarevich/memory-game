import { createElement } from '../../utils/createElement.js';
import { Button } from '../button/button.js';

class Header {
  header = null;

  constructor() {
    this.render();
  }

  render() {
    const newGameButton = new Button({
      title: 'Новая игра',
      type: 'button',
      onClick: () => {},
      'aria-label': 'Новая игра',
      classList: [],
      'data-id': 'test',
    });
    const leadersTableButton = new Button({
      title: 'Таблица лидеров',
      type: 'button',
      onClick: () => {},
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
