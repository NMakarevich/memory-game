export function getLocalStorage(key) {
  const results = localStorage.getItem(key);
  if (!results) {
    return [];
  } else {
    return JSON.parse(results)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .sort((a, b) => a.turns - b.turns);
  }
}

export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
