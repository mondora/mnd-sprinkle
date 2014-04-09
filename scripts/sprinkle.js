angular.module("mnd.sprinkle", [])

.factory("MndWordProcessingService", function () {
	var repeat = function (string, times) {
		var result = "";
		for (var i=0; i<times; i++) {
			result += string;
		}
		return result;
	};
	return function (word) {
		var processed = {};
		if (word.length === 2) {
			processed.left = word[0];
			processed.pivot = word[1];
			processed.right = "";
		} else {
			var pivotIndex = Math.ceil((word.length / 2) - 1);
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
})

.factory("MndWordSplittingService", function () {
	return function (text) {
		var words = text.split(/\s+/);
		/*
		var word;
		var left;
		var right;
		var splitPoint;
		for (var i=0; i<words.length; i++) {
			word = words[i];
			if (word.length > 13) {
				splitPoint = Math.floor(word.length / 2);
				left = word.slice(0, splitPoint) + "-";
				right = word.slice(splitPoint);
				words[i] = left;
				words.splice(i+1, 0, right);
				i++;
			}
		}
	   */
		return words;
	};
})

.directive("mndSprinkle", function ($timeout, MndWordSplittingService, MndWordProcessingService) {
	return {
		restrict: "EA",
		templateUrl: "templates/sprinkle.html",
		scope: {
			text: "@",
			wpm: "@"
		},
		link: function ($scope) {
			$scope._words = MndWordSplittingService($scope.text);
			$scope._wordIndex = 0;
			$scope._msPerWord = Math.floor(60000 / parseInt($scope.wpm, 10));

			var next = function () {
				var word = $scope._words[$scope._wordIndex];
				var processed = MndWordProcessingService(word);
				$scope.word = processed;
				var delay = processed.multiplier * $scope._msPerWord;
				$scope._wordIndex++;
				if ($scope._wordIndex < $scope._words.length) {
					$scope._timeout = $timeout(next, delay);
				}
			};

			$scope.start = function () {
				next();
			};
			$scope.pause = function () {
				$timeout.cancel($scope._timeout);
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
});
