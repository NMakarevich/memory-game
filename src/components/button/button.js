import { createElement } from '../../utils/createElement.js';

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
      eventListeners: [
        {
          type: 'click',
          callback: this.onClick,
        },
      ],
      type: this.type,
      'aria-label': this.ariaLabel,
      children: [this.title],
    });
  }

  get element() {
    return this.button;
  }
}
