const doWithThrottle = (() => {
  let throttled = false;
  let pendingRequest = null;

  return function (callback, delay = 700, ...args) {
    if (throttled) {
      pendingRequest = () => { callback(...args) };
      return;
    }

    callback(...args);
    throttled = true;

    setTimeout(() => {
      if (pendingRequest) {
        pendingRequest();
        pendingRequest = null;
      }

      pendingRequest = null;
      throttled = false;
    }, delay);
  };
})();


export { doWithThrottle };