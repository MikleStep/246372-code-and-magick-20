'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['red', 'blue', 'yellow', 'green', 'black'];
var WIZARD_FIREBALL_COLORS = ['#30a8ee', '#5ce6c0', '#e848d5', '#e6e848', '#ee4830'];
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var setup = document.querySelector('.setup');

var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

var getWizard = function () {
  var wizard = {
    name: WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAME[getRandomNumber(WIZARD_SURNAME.length)],
    coatColor: WIZARD_COAT_COLORS[getRandomNumber(WIZARD_COAT_COLORS.length)],
    eyesColor: WIZARD_EYES_COLORS[getRandomNumber(WIZARD_EYES_COLORS.length)]
  };
  return wizard;
};

var getWizardTemplate = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (quantity, position) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < quantity; i++) {
    fragment.appendChild(getWizardTemplate(getWizard()));
  }
  position.appendChild(fragment);
};

renderWizards(4, similarListElement);

setup.querySelector('.setup-similar').classList.remove('hidden');

// Задание 4.1 (Открытие и закрытие блоков)
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (userNameInput === document.activeElement) {
    return evt;
  } else {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  }
  return evt;
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  if (setup.classList.contains('hidden')) {
    return;
  } else {
    document.removeEventListener('keydown', onPopupEscPress);
    setup.classList.add('hidden');
  }
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
  document.removeEventListener('keydown', onPopupEscPress);
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});


// Задание 4.1 Проверка валидации

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// Задание 4.1 Обработка и покраска при клике

var wizardCustomiseCoat = setup.querySelector('.wizard-coat');
var wizardCustomiseEyes = setup.querySelector('.wizard-eyes');
var wizardCustomiseFireball = setup.querySelector('.setup-fireball-wrap');
var wizardCoatInput = setup.querySelector('input[name = "coat-color"]');
var wizardEyesInput = setup.querySelector('input[name = "eyes-color"]');
var wizardFireballInput = setup.querySelector('input[name = "fireball-color"]');
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

customiseFillColor(wizardCustomiseCoat, WIZARD_COAT_COLORS, wizardCoatInput, 'fill');
customiseFillColor(wizardCustomiseEyes, WIZARD_EYES_COLORS, wizardEyesInput, 'fill');
customiseFillColor(wizardCustomiseFireball, WIZARD_FIREBALL_COLORS, wizardFireballInput, 'backgroundColor');
