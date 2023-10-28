const KEY_IN_LS = 'test';

function getFromLSValue() {
  return localStorage.getItem(KEY_IN_LS) || '';
}

function setNewValueInLS(value: string) {
  localStorage.setItem(KEY_IN_LS, value);
}

export { getFromLSValue, setNewValueInLS };
