import { createElement } from '../../utils/createElement.js';

class Modal {
  modal = null;
  modalContainer = null;
  modalOverlay = null;
  isOpen = false;

  render() {
    this.modal = createElement('div', {
      classList: ['modal'],
      eventListeners: [
        {
          type: 'transitionend',
          callback: this.handleTransitionEnd,
        },
      ],
      children: [
        createElement('div', {
          classList: ['modal-overlay'],
          eventListeners: [{ type: 'click', callback: this.handleModalEvents }],
          setRef: (element) => {
            this.modalOverlay = element;
          },
        }),
        createElement('div', {
          classList: ['modal-container'],
          setRef: (element) => {
            this.modalContainer = element;
          },
        }),
      ],
    });
    document.body.appendChild(this.modal);
    this.eventListeners();
  }

  openModal = (content) => {
    if (!this.isOpen) {
      this.render();
      this.modalContainer.appendChild(content);
      this.isOpen = true;
      setTimeout(() => this.modal.classList.add('open'), 0);
      this.disableScroll();
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
    this.enableScroll();
  };

  handleTransitionEnd = () => {
    if (!this.isOpen) {
      this.modal.remove();
    }
  };

  handleScroll(event) {
    event.preventDefault();
  }

  enableScroll() {
    document.removeEventListener('wheel', this.handleScroll);
    document.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('touchmove', this.handleScroll);
  }

  disableScroll() {
    document.addEventListener('scroll', this.handleScroll, { passive: false });
    document.addEventListener('wheel', this.handleScroll, { passive: false });
    document.addEventListener('touchmove', this.handleScroll, { passive: false });
  }

  eventListeners = () => {
    document.addEventListener('keyup', this.handleModalEvents);
  };
}

const modal = new Modal();
export default modal;
