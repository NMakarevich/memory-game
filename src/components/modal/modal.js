import { createElement } from '../../utils/createElement.js';

class Modal {
  modal = null;
  modalContainer = null;
  modalOverlay = null;
  isOpen = false;

  render() {
    this.modal = createElement('div', {
      classList: ['modal'],
      children: [
        createElement('div', { classList: ['modal-overlay'] }),
        createElement('div', {
          classList: ['modal-container'],
        }),
      ],
    });
    this.modalContainer = this.modal.querySelector('.modal-container');
    this.modalOverlay = this.modal.querySelector('.modal-overlay');
    document.body.appendChild(this.modal);
    this.eventListeners();
  }

  openModal = (content) => {
    if (!this.isOpen) {
      this.render();
      this.modalContainer.appendChild(content);
      this.isOpen = true;
      setTimeout(() => this.modal.classList.add('open'), 0);
    }
  };

  handleModalEvents = (event) => {
    if (
      this.isOpen &&
      ((event.type === 'keyup' && event.key === 'Escape') || event.type === 'click')
    ) {
      this.closeModal();
    }
  };

  closeModal = () => {
    this.modal.classList.remove('open');
    this.isOpen = false;
  };

  handleTransitionEnd = () => {
    if (!this.isOpen) {
      this.modal.remove();
    }
  };

  eventListeners = () => {
    this.modalOverlay.addEventListener('click', this.handleModalEvents);
    document.addEventListener('keyup', this.handleModalEvents);
    this.modal.addEventListener('transitionend', this.handleTransitionEnd);
  };
}

const modal = new Modal();
export default modal;
