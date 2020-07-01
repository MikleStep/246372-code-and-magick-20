'use strict';
window.wizard = (function (setup, template) {
  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var characterSet = {
    coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyesColors: ['red', 'blue', 'yellow', 'green', 'black'],
    fireballColors: ['#30a8ee', '#5ce6c0', '#e848d5', '#e6e848', '#ee4830']
  };


  var customiseCoat = setup.querySelector('.wizard-coat');
  var customiseEyes = setup.querySelector('.wizard-eyes');
  var customiseFireball = setup.querySelector('.setup-fireball-wrap');
  var coatInput = setup.querySelector('input[name = "coat-color"]');
  var eyesInput = setup.querySelector('input[name = "eyes-color"]');
  var fireballInput = setup.querySelector('input[name = "fireball-color"]');
  var customiseIndex = 0;
  var similarListElement = setup.querySelector('.setup-similar-list');

  var customiseFillColor = function (target, array, form, styleAttr) {
    target.addEventListener('click', function () {
      customiseIndex += 1;
      if (customiseIndex >= array.length) {
        customiseIndex = 0;
      }
      var color = array[customiseIndex];
      target.style[styleAttr] = color;
      form.value = color;
    });
  };

  customiseFillColor(customiseCoat, characterSet.coatColors, coatInput, 'fill');
  customiseFillColor(customiseEyes, characterSet.eyesColors, eyesInput, 'fill');
  customiseFillColor(customiseFireball, characterSet.fireballColors, fireballInput, 'backgroundColor');

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
