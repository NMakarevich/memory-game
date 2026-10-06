export function createElement(tag, props = {}) {
  const element = document.createElement(tag);
  const { children = [], classList = [], eventListeners = [], setRef, ...restProps } = props;
  if (classList.length > 0) {
    element.classList.add(...classList);
  }
  for (let key in restProps) {
    element.setAttribute(key, restProps[key]);
  }
  if (children.length > 0) {
    element.append(...children);
  }
  if (setRef) {
    setRef(element);
  }
  if (eventListeners.length > 0) {
    for (let eventListener of eventListeners) {
      element.addEventListener(eventListener.type, eventListener.callback);
    }
  }
  return element;
}
