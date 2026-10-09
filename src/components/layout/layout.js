import { createElement } from '../../utils/createElement.js';
import header from '../header/header.js';

export class Layout {
  render() {
    const main = createElement('main', {
      classList: ['main'],
      children: [createElement('div', { classList: ['container'] })],
    });
    document.body.prepend(header.element, main);
  }
}

const layout = new Layout();
export default layout;
