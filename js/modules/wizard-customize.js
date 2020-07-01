'use strict';
window.wizardCustomize = (function (setup) {
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

})(document.querySelector('.setup'));
