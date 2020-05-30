'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_HEIGHT = 150;
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

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', (CLOUD_WIDTH / 2) + TITLE_GAP, CLOUD_Y + TITLE_GAP);
  ctx.fillText('Список результатов:', (CLOUD_WIDTH / 2) + TITLE_GAP / 2, CLOUD_Y + TITLE_GAP * 2);
  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barPositionX = CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i;
    var barHeight = (BAR_HEIGHT * times[i]) / maxTime;
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], barPositionX, CLOUD_HEIGHT - GAP * 2);
    ctx.fillText(Math.ceil(times[i]), barPositionX, CLOUD_Y + TITLE_HEIGHT + TEXT_HEIGHT + BAR_HEIGHT - barHeight - GAP * 2);
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(barPositionX, CLOUD_Y + TITLE_HEIGHT + TEXT_HEIGHT + BAR_HEIGHT - barHeight, BAR_WIDTH, barHeight);
    } else {
      for (var j = 0; j < players.length; j++) {
        ctx.fillStyle = 'hsl(225,' + (100 - 30 * i) + '%, 50%)';
        ctx.fillRect(barPositionX, CLOUD_Y + TITLE_HEIGHT + TEXT_HEIGHT + BAR_HEIGHT - barHeight, BAR_WIDTH, barHeight);
      }
    }
  }
};
