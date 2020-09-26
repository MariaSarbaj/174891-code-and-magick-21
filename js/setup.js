'use strict';
const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COAT = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYES = [`black`, `red`, `blue`, `yellow`, `green`];

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

let randomWizardList = [];

let getRandomWizard = function () {
  let getRandomWizardName = function (names, surnames) {
    return (names[Math.floor(Math.random() * names.length)] + ` ` + surnames[Math.floor(Math.random() * surnames.length)]);
  };

  let getRandomWizardCoat = function (colors) {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  let getRandomWizardEyes = function (eyes) {
    return eyes[Math.floor(Math.random() * eyes.length)];
  };

  for (let i = 0; i < 4; i++) {
    let randomWizard = {
      name: getRandomWizardName(WIZARD_NAMES, WIZARD_SURNAMES),
      coatColor: getRandomWizardCoat(WIZARD_COAT),
      eyeColor: getRandomWizardEyes(WIZARD_EYES)
    };

    randomWizardList.push(randomWizard);
  }

  return randomWizardList;
};

getRandomWizard();

let renderWizard = function (wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyeColor;

  return wizardElement;
};

let fragment = document.createDocumentFragment();

for (let i = 0; i < randomWizardList.length; i++) {
  fragment.appendChild(renderWizard(randomWizardList[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
