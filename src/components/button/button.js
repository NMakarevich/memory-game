import { createElement } from '../../utils/createElement.js';

import './button.scss';

export class Button {
  title = null;
  type = null;
  onClick = null;
  ariaLabel = null;
  classList = [];
  button = null;

  constructor({ title, type, onClick, ariaLabel, classList }) {
    this.title = title;
    this.type = type ?? 'button';
    this.onClick = onClick;
    this.ariaLabel = ariaLabel;
    this.classList = classList;
    this.render();
  }

  render() {
    this.button = createElement('button', {
      classList: ['button', ...this.classList],
      type: this.type,
      ariaLabel: this.ariaLabel,
    });
    this.button.textContent = this.title;
    this.button.addEventListener('click', this.onClick);
  }

  get element() {
    return this.button;
  }
}
