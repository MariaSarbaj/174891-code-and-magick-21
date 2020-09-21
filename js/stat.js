'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const BAR_GAP = 50;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const FONT_HEIGHT = 20;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (times) {
  let maxElement = times[0];

  for (let i = 1; i < times.length; i++) {
    if (times[i] > maxElement) {
      maxElement = times[i];
    }
  }

  return maxElement;
};

const getRandomHSL = function () {
  return `hsl(240, ` + Math.floor(Math.random() * 100) + `%, 50%)`;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;

  const maxTime = getMaxElement(times);

  ctx.fillText(
      `Список результатов:`,
      CLOUD_X + GAP * 2,
      CLOUD_Y + GAP + FONT_HEIGHT * 2
  );

  ctx.fillText(
      `Ура вы победили!`,
      CLOUD_X + GAP * 2,
      CLOUD_Y + GAP + FONT_HEIGHT
  );

  for (let i = 0; i < names.length; i++) {

    let time = times[i];

    ctx.fillText(
        time.toFixed(0),
        CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - GAP * 2 - ((BAR_HEIGHT * times[i]) / maxTime) - FONT_HEIGHT
    );

    ctx.fillStyle = (names[i] === `Вы`) ? `rgba(255, 0, 0, 1)` : getRandomHSL();

    ctx.fillRect(
        CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - GAP - FONT_HEIGHT,
        BAR_WIDTH,
        -(BAR_HEIGHT * times[i]) / maxTime
    );

    ctx.fillStyle = `#000000`;

    ctx.fillText(
        names[i],
        CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - GAP
    );
  }
};
