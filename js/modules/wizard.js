'use strict';
window.wizard = (function (setup) {

  var wizards = [];
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

  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.wizardRender.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  var customiseFillColor = function (target, array, form, styleAttr) {
    target.addEventListener('click', function () {
      customiseIndex += 1;
      if (customiseIndex >= array.length) {
        customiseIndex = 0;
      }
      var color = array[customiseIndex];
      target.style[styleAttr] = color;
      form.value = color;

      if (target === customiseCoat) {
        coatColor = color;
      }
      if (target === customiseEyes) {
        eyesColor = color;
      }
      window.debounce.setTimeout(updateWizards)();
    });
  };

  customiseFillColor(customiseCoat, characterSet.coatColors, coatInput, 'fill');
  customiseFillColor(customiseEyes, characterSet.eyesColors, eyesInput, 'fill');
  customiseFillColor(customiseFireball, characterSet.fireballColors, fireballInput, 'backgroundColor');

  var successHandler = function (data) {
    wizards = data;
    window.wizardRender.render(wizards);
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


})(document.querySelector('.setup'));
