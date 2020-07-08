'use strict';
window.wizardRender = (function (setup, template) {
  var MAX_SIMILAR_WIZARD_COUNT = 4;


  var renderWizard = function (wizard) {
    var character = template.cloneNode(true);
    var wizardElement = character.querySelector('.wizard');

    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    character.querySelector('.setup-similar-label').textContent = wizard.name;

    return character;
  };
  var similar = setup.querySelector('.setup-similar');
  var similarList = setup.querySelector('.setup-similar-list');

  return {
    render: function (data) {
      var takeNumber = data.length > MAX_SIMILAR_WIZARD_COUNT ? MAX_SIMILAR_WIZARD_COUNT : data.length;
      similarList.innerHTML = '';
      for (var i = 0; i < takeNumber; i++) {
        similarList.appendChild(renderWizard(data[i]));
      }

      similar.classList.remove('hidden');
    }

  };

})(document.querySelector('.setup'), document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'));
