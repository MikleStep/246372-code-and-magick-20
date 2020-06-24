'use strict';

window.math = (function () {
  return {
    getRandomNumber: function (max) {
      return Math.floor(Math.random() * max);
    }
  };
})();
