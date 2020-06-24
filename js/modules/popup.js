'use strict';

window.popup = (function (setup, setupOpen) {
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');


  var onPopupEscPress = function (input, modal) {
    return function (evt) {
      if (input === document.activeElement) {
        return evt;
      } else {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          closePopup(modal);
        }
      }
      return evt;
    };
  };

  var openPopup = function (modal, input) {
    modal.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress(input, modal));
  };

  var closePopup = function (modal, input) {
    if (modal.classList.contains('hidden')) {
      return;
    } else {
      document.removeEventListener('keydown', onPopupEscPress(input, modal));
      modal.classList.add('hidden');
      setup.removeAttribute('style');
    }
  };
  setupOpen.addEventListener('click', function () {
    openPopup(setup, userNameInput);
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup(setup, userNameInput);
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup(setup);
    document.removeEventListener('keydown', onPopupEscPress(setup, userNameInput));
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closePopup(setup, userNameInput);
    }
  });

})(document.querySelector('.setup'), document.querySelector('.setup-open'));
