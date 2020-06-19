'use strict';
window.wizard = (function (setup, template) {
  var characterSet = {
    names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    surname: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyesColors: ['red', 'blue', 'yellow', 'green', 'black'],
    fireballColors: ['#30a8ee', '#5ce6c0', '#e848d5', '#e6e848', '#ee4830']
  };

  var getOne = function () {
    return {
      name: characterSet.names[window.math.getRandomNumber(characterSet.names.length)] + ' ' + characterSet.surname[window.math.getRandomNumber(characterSet.surname.length)],
      coatColor: characterSet.coatColors[window.math.getRandomNumber(characterSet.coatColors.length)],
      eyesColor: characterSet.eyesColors[window.math.getRandomNumber(characterSet.eyesColors.length)]
    };
  };

  var getTemplate = function (wizard) {
    var character = template.cloneNode(true);

    character.querySelector('.setup-similar-label').textContent = wizard.name;
    character.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    character.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return character;
  };

  var CustomiseCoat = setup.querySelector('.wizard-coat');
  var CustomiseEyes = setup.querySelector('.wizard-eyes');
  var CustomiseFireball = setup.querySelector('.setup-fireball-wrap');
  var CoatInput = setup.querySelector('input[name = "coat-color"]');
  var EyesInput = setup.querySelector('input[name = "eyes-color"]');
  var FireballInput = setup.querySelector('input[name = "fireball-color"]');
  var customiseIndex = 0;

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

  customiseFillColor(CustomiseCoat, characterSet.coatColors, CoatInput, 'fill');
  customiseFillColor(CustomiseEyes, characterSet.eyesColors, EyesInput, 'fill');
  customiseFillColor(CustomiseFireball, characterSet.fireballColors, FireballInput, 'backgroundColor');
  setup.querySelector('.setup-similar').classList.remove('hidden');

  return {
    render: function (quantity, position) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < quantity; i++) {
        fragment.appendChild(getTemplate(getOne()));
      }
      position.appendChild(fragment);
    }
  };

})(document.querySelector('.setup'), document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'));
