const saveToLocalStorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    try {
      const data = JSON.parse(window.localStorage.getItem(key));
      return data;
    } catch (e) {
      // do nothing
    }
  }

  return {};
}

export {
  saveToLocalStorage,
  getFromLocalStorage,
}
