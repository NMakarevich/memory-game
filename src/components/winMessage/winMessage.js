import { createElement } from '../../utils/createElement.js';
import { Button } from '../button/button.js';
import modal from '../modal/modal.js';
import game from '../../services/game.js';

export class WinMessage {
  constructor(turns) {
    this.turns = turns;
    this.modal = modal;
    this.game = game;
    this.element = null;
    this.render();
  }

  resetGame() {
    this.modal.closeModal();
    this.game.reset();
  }

  render() {
    this.element = createElement('div', {
      classList: ['win'],
      children: [
        createElement('div', {
          classList: ['win-message'],
          children: [
            createElement('h2', { classList: ['win-message_title'], children: ['Победа!'] }),
            createElement('p', {
              classList: ['win-message_desc'],
              children: [`Совершено ходов: ${this.turns}`],
            }),
          ],
        }),
        createElement('div', {
          classList: ['modal-controls'],
          children: [
            new Button({
              title: 'Новая игра',
              type: 'button',
              onClick: () => this.resetGame(),
              classList: [],
              ariaLabel: 'Новая игра',
            }).element,
            new Button({
              title: 'Закрыть',
              type: 'button',
              onClick: () => this.modal.closeModal(),
              classList: [],
              ariaLabel: 'Закрыть',
            }).element,
          ],
        }),
      ],
    });
  }
}
