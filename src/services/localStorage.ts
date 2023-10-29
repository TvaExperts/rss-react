const KEY_IN_LS = 'module01';
function saveNewQueryInLS(value: string) {
  localStorage.setItem(KEY_IN_LS, value);
}

function getQueryFromLS() {
  return localStorage.getItem(KEY_IN_LS) || '';
}

export { getQueryFromLS, saveNewQueryInLS };
