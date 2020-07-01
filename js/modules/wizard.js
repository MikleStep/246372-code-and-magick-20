'use strict';
window.wizard = (function (setup, template) {
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var similarListElement = setup.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var character = template.cloneNode(true);

    character.querySelector('.setup-similar-label').textContent = wizard.name;
    character.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    character.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return character;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    var counter = window.math.getRandomNumber(wizards.length);
    if (counter >= wizards.length - MAX_SIMILAR_WIZARD_COUNT) {
      counter -= wizards.length + MAX_SIMILAR_WIZARD_COUNT - counter;
    }
    for (var i = counter; i < counter + MAX_SIMILAR_WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var form = setup.querySelector('.setup-wizard-form');

  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    });
    evt.preventDefault();
  };

  form.addEventListener('submit', submitHandler);

})(document.querySelector('.setup'), document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'));
