const intervalId = function simulateInterval(callback, interval) {
    let timerId = null;
  
    function fn() {
      callback();
      const prevTimmerId = timerId;
      timerId = setTimeout(fn, interval);
      clearTimeout(prevTimmerId);
    }
    
    return setTimeout(fn, interval);
};