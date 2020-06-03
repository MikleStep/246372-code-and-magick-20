'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var MAX_BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TEXT_HEIGHT = 15;
var TITLE_GAP = 15;
var TITLE_HEIGHT = 70;
var CORNER_RADIUS = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineJoin = 'round';
  ctx.lineWidth = CORNER_RADIUS;
  ctx.strokeRect(x + (CORNER_RADIUS / 2), y + (CORNER_RADIUS / 2), CLOUD_WIDTH - CORNER_RADIUS, CLOUD_HEIGHT - CORNER_RADIUS);
  ctx.fillRect(x + (CORNER_RADIUS / 2), y + (CORNER_RADIUS / 2), CLOUD_WIDTH - CORNER_RADIUS, CLOUD_HEIGHT - CORNER_RADIUS);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';
  ctx.fillText(text, x, y);
};

var getRandomColor = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var renderGraphs = function (ctx, players, times) {
  for (var i = 0; i < players.length; i++) {
    var maxTime = getMaxElement(times);
    var firstGap = (CLOUD_WIDTH - ((BAR_GAP + BAR_WIDTH) * players.length - BAR_WIDTH)) / 2;
    var barPositionX = CLOUD_X + firstGap + (BAR_GAP + BAR_WIDTH) * i;
    var textPositionX = barPositionX + BAR_WIDTH / 2;
    var barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;
    var barPositionY = CLOUD_Y + TITLE_HEIGHT + TEXT_HEIGHT + MAX_BAR_HEIGHT - barHeight;

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(barPositionX, barPositionY, BAR_WIDTH, barHeight);
    } else {

      ctx.fillStyle = 'hsl(225,' + (getRandomColor(100)) + '%, 50%)';
      ctx.fillRect(barPositionX, barPositionY, BAR_WIDTH, barHeight);
    }
    renderText(ctx, players[i], textPositionX, CLOUD_HEIGHT - GAP * 2);
    renderText(ctx, Math.round(times[i]), textPositionX, barPositionY - GAP * 2);
  }
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, 'Ура вы победили!', CLOUD_WIDTH / 2 + CLOUD_X, CLOUD_Y + TITLE_GAP);
  renderText(ctx, 'Список результатов:', CLOUD_WIDTH / 2 + CLOUD_X, CLOUD_Y + TITLE_GAP * 2);
  renderGraphs(ctx, players, times);
};
