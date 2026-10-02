export function createElement(tag, props) {
  const element = document.createElement(tag);
  const { children = [], classList = [], ...restProps } = props || {};
  if (classList.length > 0) {
    element.classList.add(...classList);
  }
  for (let key in restProps) {
    element.setAttribute(key, restProps[key]);
  }
  if (children.length > 0) {
    element.append(...children);
  }
  return element;
}
