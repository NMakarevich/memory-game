export function createElement(tag, props) {
  const element = document.createElement(tag);
  const { children, classList, ...restProps } = props;
  element.classList.add(...classList);
  for (let key in restProps) {
    element.setAttribute(key, restProps[key]);
  }
  if (children) {
    element.append(...children);
  }
  return element;
}
