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
    var words = text.split(' ');
    return words;
  };
}).factory('MndTagStrippingService', function () {
  return function (html) {
    var strippedText = html.replace(/(<([^>]+)>)/gi, ' ');
    strippedText = strippedText.replace(/\s+/g, ' ').trim();
    var p = document.createElement('p');
    p.innerHTML = strippedText;
    return p.textContent;
  };
}).factory('MndReadTimeEstimatingService', [
  'MndTagStrippingService',
  function (MndTagStrippingService) {
    return function (wordCount, readingSpeed) {
      return Math.round(wordCount / readingSpeed);
    };
  }
]).directive('mndSprinkle', [
  '$timeout',
  'MndWordSplittingService',
  'MndWordProcessingService',
  'MndTagStrippingService',
  'MndReadTimeEstimatingService',
  function ($timeout, MndWordSplittingService, MndWordProcessingService, MndTagStrippingService, MndReadTimeEstimatingService) {
    return {
      restrict: 'EA',
      templateUrl: 'templates/sprinkle.html',
      scope: {
        text: '@?',
        html: '@?',
        defaultWpm: '@?',
        wpm: '=?',
        time: '=?',
        hideControlBar: '=?',
        autoplay: '@?',
        autoplayDelay: '@?',
        initText: '@?',
        progressPercentage: '=?'
      },
      link: function ($scope) {
        ////////////////////////////////
        // Parse the text to sprinkle //
        ////////////////////////////////
        if ($scope.text) {
          $scope._words = MndWordSplittingService($scope.text);
        } else if ($scope.html) {
          $scope._text = MndTagStrippingService($scope.html);
          $scope._words = MndWordSplittingService($scope._text);
        } else {
          throw new Error('Nothing to display!');
        }
        //////////////////////////////////////////
        // Speed-related properties and methods //
        //////////////////////////////////////////
        $scope.wpm = $scope.wpm || parseInt($scope.defaultWpm || '250', 10);
        $scope.time = MndReadTimeEstimatingService($scope._words.length, $scope.wpm);
        $scope._msPerWord = function () {
          return Math.floor(60000 / $scope.wpm);
        };
        $scope.increaseSpeed = function (n) {
          var cur = $scope.wpm;
          cur += n || 50;
          $scope.wpm = cur;
          $scope.time = MndReadTimeEstimatingService($scope._words.length, $scope.wpm);
        };
        $scope.decreaseSpeed = function (n) {
          var cur = $scope.wpm;
          cur -= n || 50;
          if (cur < 50)
            cur = 50;
          $scope.wpm = cur;
          $scope.time = MndReadTimeEstimatingService($scope._words.length, $scope.wpm);
        };
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
        //////////////////////////////////////////
        // Status-related properties and methods //
        //////////////////////////////////////////
        $scope.neverRun = true;
        $scope.running = false;
        $scope._wordIndex = 0;
        $scope.start = function () {
          $scope.neverRun = false;
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
        $scope.toggle = function () {
          if ($scope.running) {
            $scope.pause();
          } else {
            $scope.start();
          }
        };
        $scope.rewind = function () {
          $scope._wordIndex = 0;
        };
        $scope.stop = function () {
          $scope.pause();
          $scope.rewind();
        };
        if ($scope.autoplay === 'true') {
          var autoplayDelay = parseInt($scope.autoplayDelay, 10);
          var delay = isNaN(autoplayDelay) ? 0 : autoplayDelay;
          $timeout(function () {
            $scope.start();
          }, delay * 1000);
        }
        /////////////////
        // Control bar //
        /////////////////
        $scope.toggleControlBar = function () {
          $scope.hideControlBar = !$scope.hideControlBar;
        };
      }
    };
  }
]);