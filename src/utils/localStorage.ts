export const KEY_IN_LS = 'rss-react-course';

function saveNewQueryInLS(value: string) {
  localStorage.setItem(KEY_IN_LS, value);
}

function getQueryFromLS() {
  return localStorage.getItem(KEY_IN_LS) || '';
}

export { getQueryFromLS, saveNewQueryInLS };
