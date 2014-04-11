angular.module('mnd.sprinkle', []).factory('MndWordProcessingService', function () {
  var repeat = function (string, times) {
    var result = '';
    for (var i = 0; i < times; i++) {
      result += string;
    }
    return result;
  };
  return function (word) {
    var processed = {};
    if (word.length === 2) {
      processed.left = word[0];
      processed.pivot = word[1];
      processed.right = '';
    } else {
      var pivotIndex = Math.ceil(word.length / 2 - 1);
      processed.left = word.slice(0, pivotIndex);
      processed.right = word.slice(pivotIndex + 1);
      processed.pivot = word.slice(pivotIndex, pivotIndex + 1);
    }
    if (/[\,\:\;]$/g.test(word)) {
      processed.multiplier = 1.5;
    } else if (/[\.\!\?]$/g.test(word)) {
      processed.multiplier = 2;
    } else {
      processed.multiplier = 1;
    }
    return processed;
  };
}).factory('MndWordSplittingService', function () {
  return function (text) {
    var words = text.split(/\s+/);
    return words;
  };
}).directive('mndSprinkle', [
  '$timeout',
  'MndWordSplittingService',
  'MndWordProcessingService',
  function ($timeout, MndWordSplittingService, MndWordProcessingService) {
    return {
      restrict: 'EA',
      templateUrl: 'templates/sprinkle.html',
      scope: {
        text: '@',
        defaultWpm: '@?',
        progressPercentage: '=?'
      },
      link: function ($scope) {
        $scope._words = MndWordSplittingService($scope.text);
        $scope._wordIndex = 0;
        $scope._msPerWord = function () {
          return Math.floor(60000 / $scope.wpm);
        };
        $scope.increaseSpeed = function (n) {
          var cur = $scope.wpm;
          cur += n || 50;
          $scope.wpm = cur;
        };
        $scope.decreaseSpeed = function (n) {
          var cur = $scope.wpm;
          cur -= n || 50;
          if (cur < 50)
            cur = 50;
          $scope.wpm = cur;
        };
        $scope.wpm = parseInt($scope.defaultWpm || '250', 10);
        var next = function () {
          var word = $scope._words[$scope._wordIndex];
          var processed = MndWordProcessingService(word);
          $scope.word = processed;
          var delay = processed.multiplier * $scope._msPerWord();
          $scope._wordIndex++;
          $scope.progressPercentage = $scope._wordIndex / $scope._words.length * 100;
          if ($scope._wordIndex < $scope._words.length) {
            $scope._timeout = $timeout(next, delay);
          } else {
            $scope.running = false;
            $scope._wordIndex = 0;
          }
        };
        $scope.running = false;
        $scope.start = function () {
          if ($scope.running)
            return;
          $scope.running = true;
          next();
        };
        $scope.pause = function () {
          if (!$scope.running)
            return;
          $timeout.cancel($scope._timeout);
          $scope.running = false;
        };
        $scope.rewind = function () {
          $scope._wordIndex = 0;
        };
        $scope.stop = function () {
          $scope.pause();
          $scope.rewind();
        };
      }
    };
  }
]);
(function(module) {
try {
  module = angular.module('mnd.sprinkle');
} catch (e) {
  module = angular.module('mnd.sprinkle', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/sprinkle.html',
    '<div class="spray-container">\n' +
    '	<div class="spray-result">\n' +
    '		<div class="sprinkle-center-line"></div>\n' +
    '		<span class="spray-left">\n' +
    '			&nbsp;\n' +
    '			{{word.left}}\n' +
    '		</span>\n' +
    '		<span class="spray-pivot">\n' +
    '			{{word.pivot}}\n' +
    '		</span>\n' +
    '		<span class="spray-right">\n' +
    '			{{word.right}}\n' +
    '		</span>\n' +
    '	</div>\n' +
    '	<div class="sprinkle-control-bar">\n' +
    '		<div class="sprinkle-control-bar-left">\n' +
    '			<div class="sprinkle-control-btn" ng-click="rewind()"><i class="fa fa-fast-backward"></i></div>\n' +
    '			<div class="sprinkle-control-btn" ng-click="stop()"><i class="fa fa-stop"></i></div>\n' +
    '			<div class="sprinkle-control-btn" ng-click="pause()"><i class="fa fa-pause"></i></div>\n' +
    '			<div class="sprinkle-control-btn" ng-click="start()"><i class="fa fa-play"></i></div>\n' +
    '		</div>\n' +
    '		<div class="sprinkle-control-bar-right">\n' +
    '			<div class="sprinkle-control-btn" ng-click="decreaseSpeed()"><i class="fa fa-minus"></i></div>\n' +
    '			<div class="sprinkle-control-btn wpm-btn">{{wpm}} wpm </div>\n' +
    '			<div class="sprinkle-control-btn" ng-click="increaseSpeed()"><i class="fa fa-plus"></i></div>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '<br />\n' +
    '<br />\n' +
    '<br />\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
})();
