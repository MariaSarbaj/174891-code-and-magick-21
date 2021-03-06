'use strict';

// Constants

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COATS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYES = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARD_FIREBALLS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

const ENTER_BUTTON = `Enter`;
const ESCAPE_BUTTON = `Escape`;


// Create Wizards

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

// Wizard Settings

const setupOpen = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupClose = setup.querySelector(`.setup-close`);
const userNameInput = setup.querySelector(`.setup-user-name`);

const setupPlayer = document.querySelector(`.setup-player`);
const wizardCoat = setupPlayer.querySelector(`.wizard-coat`);
const wizardEyes = setupPlayer.querySelector(`.wizard-eyes`);
const wizardFireballWrap = setupPlayer.querySelector(`.setup-fireball-wrap`);
const wizardFireball = setupPlayer.querySelector(`.setup-fireball`);

const getRandomArrayItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const onSetupPlayerClick = (evt) => {
  const userTarget = evt.target;
  if (userTarget === wizardCoat) {
    wizardCoat.style.fill = getRandomArrayItem(WIZARD_COATS);
  } else if (userTarget === wizardEyes) {
    wizardEyes.style.fill = getRandomArrayItem(WIZARD_EYES);
  } else if (userTarget === wizardFireball) {
    wizardFireballWrap.style.background = getRandomArrayItem(WIZARD_FIREBALLS);
  }
};

const onEscKeydown = (evt) => {
  if (evt.key === ESCAPE_BUTTON && evt.target !== userNameInput) {
    evt.preventDefault();
    closePopup();
  }
};

const onEnterKeydown = (evt, action) => {
  if (evt.key === ENTER_BUTTON) {
    action();
  }
};

const openPopup = () => {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onEscKeydown);
  setupPlayer.addEventListener(`click`, onSetupPlayerClick);
};

const closePopup = () => {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onEscKeydown);
  setupPlayer.removeEventListener(`click`, onSetupPlayerClick);
};

setupOpen.addEventListener(`click`, () => {
  openPopup();
});

setupOpen.addEventListener(`keydown`, (evt) => {
  onEnterKeydown(evt, openPopup);
});

setupClose.addEventListener(`click`, () => {
  closePopup();
});

setupClose.addEventListener(`keydown`, (evt) => {
  onEnterKeydown(evt, closePopup);
});

userNameInput.addEventListener(`input`, () => {
  const valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }

  userNameInput.reportValidity();
});
