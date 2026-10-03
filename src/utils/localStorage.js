export function getLocalStorage(key) {
  const results = localStorage.getItem(key);
  if (!results) {
    return [];
  } else {
    return JSON.parse(results);
  }
}

export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
