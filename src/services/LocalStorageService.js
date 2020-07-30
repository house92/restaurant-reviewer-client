export function saveState(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

export function loadState() {
  const item = localStorage.getItem('state');
  if (!item) {
    return {};
  }

  return JSON.parse(item);
}