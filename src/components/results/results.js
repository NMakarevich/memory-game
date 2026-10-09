import { convertDate, getLocalStorage } from '../../utils/localStorage.js';
import { createElement } from '../../utils/createElement.js';
import Button from '../button/button.js';
import modal from '../modal/modal.js';

class Results {
  constructor() {
    this.results = getLocalStorage('mg-results');
    this.modal = modal;
    this.element = null;
    this.render();
  }

  render() {
    this.element = createElement('div', {
      classList: ['results'],
      children: [
        createElement('h3', { classList: ['results-title'], children: ['Результаты'] }),
        this.results.length > 0
          ? createElement('ul', {
              classList: ['results-list'],
              children: [
                createElement('li', {
                  classList: ['results-list_item', 'item-heading'],
                  children: [
                    createElement('span', { classList: ['item-index'], children: ['Место'] }),
                    createElement('span', { classList: ['item-date'], children: ['Дата'] }),
                    createElement('span', { classList: ['item-turns'], children: ['Ходы'] }),
                  ],
                }),
                ...this.results.map((result, index) =>
                  createElement('li', {
                    classList: ['results-list_item', 'item'],
                    children: [
                      createElement('span', { classList: ['item-index'], children: [index + 1] }),
                      createElement('span', {
                        classList: ['item-date'],
                        children: [convertDate(result.date)],
                      }),
                      createElement('span', {
                        classList: ['item-turns'],
                        children: [result.turns],
                      }),
                    ],
                  })
                ),
              ],
            })
          : createElement('span', {
              classList: ['results-empty'],
              children: ['Не сыграно ни одной игры'],
            }),
        new Button({
          title: 'Закрыть',
          type: 'button',
          classList: [],
          ariaLabel: 'Закрыть',
          onClick: this.modal.closeModal,
        }).element,
      ],
    });
  }
}

export default Results;
