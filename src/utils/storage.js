const saveToLocalStorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = (key) => {
  const data = JSON.parse(window.localStorage.getItem(key));
  return data || {};
}

export {
  saveToLocalStorage,
  getFromLocalStorage,
}
