const MAX_RESULTS_SIZE = 10;

export function getLocalStorage(key) {
  const results = localStorage.getItem(key);
  if (!results) {
    return [];
  } else {
    try {
      return JSON.parse(results).sort((a, b) => a.turns - b.turns || a.date - b.date);
    } catch {
      return [];
    }
  }
}

export function saveToLocalStorage(key, value) {
  let results = getLocalStorage(key);
  results.push(value);
  results = results.sort((a, b) => a.turns - b.turns || a.date - b.date).slice(0, MAX_RESULTS_SIZE);
  localStorage.setItem(key, JSON.stringify(results));
}

export function convertDate(date) {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}
