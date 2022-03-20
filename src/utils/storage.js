const saveToLocalStorage = (data) => {
  window.localStorage.setItem('axiSvgContent', JSON.stringify(data));
};

const getFromLocalStorage = (key) => {
  const data = JSON.parse(window.localStorage.getItem(key));
  return data || {};
}

export {
  saveToLocalStorage,
  getFromLocalStorage,
}
