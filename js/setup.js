'use strict';
const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COATS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYES = [`black`, `red`, `blue`, `yellow`, `green`];

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

const similarList = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

const randomWizardsList = [];

let getRandomWizard = function () {
  const getRandomWizardName = function (names, surnames) {
    return `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`;
  };

  const getRandomWizardCoat = function (colors) {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomWizardEyes = function (eyes) {
    return eyes[Math.floor(Math.random() * eyes.length)];
  };

  const randomWizardCount = 4;

  for (let i = 0; i < randomWizardCount; i++) {
    let randomWizard = {
      name: getRandomWizardName(WIZARD_NAMES, WIZARD_SURNAMES),
      coatColor: getRandomWizardCoat(WIZARD_COATS),
      eyeColor: getRandomWizardEyes(WIZARD_EYES)
    };

    randomWizardsList.push(randomWizard);
  }

  return randomWizardsList;
};

getRandomWizard();

const renderWizard = function (wizard) {
  let wizardContent = similarWizardTemplate.cloneNode(true);

  wizardContent.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardContent.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardContent.querySelector(`.wizard-eyes`).style.fill = wizard.eyeColor;

  return wizardContent;
};

const feelingFragment = function () {
  const fragment = document.createDocumentFragment();

  randomWizardsList.forEach(function (item) {
    fragment.appendChild(renderWizard(item));
  });

  similarList.appendChild(fragment);
};

feelingFragment();

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
