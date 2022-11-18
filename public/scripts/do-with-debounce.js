const doWithDebounce = (() => {
  let timeoutId = null;

  return function (callback, delay = 500, ...args) {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(callback, delay, ...args);
  }
})()


export { doWithDebounce };