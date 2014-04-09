angular.module("mnd.spritz", [])

.factory("MndWordProcessingService", function () {
	var repeat = function (string, times) {
		var result = "";
		for (var i=0; i<times; i++) {
			result += string;
		}
		return result;
	};
	return function (word) {
		var MAX_WORD_LENGTH = 27;
		var ret = {};
		var length = word.length;
		if (length < 6) {
			ret.leftPadding = repeat(".", Math.floor((MAX_WORD_LENGTH - length) / 2));
			ret.rightPadding = repeat(".", Math.ceil((MAX_WORD_LENGTH - length) / 2));
		} else {
			ret.leftPadding = repeat(".", 10);
			ret.rightPadding = repeat(".", MAX_WORD_LENGTH - (length + 10));
		}
		var pivotIndex = Math.ceil((length / 2) - 1);
		ret.leftHand = word.slice(0, pivotIndex);
		ret.rightHand = word.slice(pivotIndex + 1);
		ret.pivotLetter = word.slice(pivotIndex, pivotIndex + 1);
		return ret;
	};
})

.factory("MndWordSplittingService", function () {
	return function (text) {
		var MAX_WORD_LENGTH = 27;
		var words = text.split(/\s+/);
		console.log(words);
		var tmpWords = [];
		for (var i=0; i<words.length; i++){
			tmpWords.push(words[i]);
			if (  /[\,\:\-\(]/g.test(words[i])  &&  ! /\./g.test(words[i])  ) {
				tmpWords.push(words[i]);
			}
			if (  /[\!\:\)\.\?\;]/g.test(words[i])  ) {
				tmpWords.push("");
			}
		}
		return tmpWords;
	};
})

.directive("mndSpritz", function ($interval, MndWordSplittingService, MndWordProcessingService) {
	return {
		restrict: "EA",
		templateUrl: "spritz.html",
		scope: {
			text: "@",
			wpm: "@"
		},
		link: function ($scope) {
			$scope._words = MndWordSplittingService($scope.text);
			$scope._wordIndex = 0;
			$scope._msPerWord = Math.floor(60000 / parseInt($scope.wpm, 10));
			$scope.start = function () {
				$scope._interval = $interval(function () {
					var word = $scope._words[$scope._wordIndex];
					$scope.word = MndWordProcessingService(word);
					$scope._wordIndex++;
					if ($scope._wordIndex >= $scope._words.length) {
						$scope.stop();
					}
				}, $scope._msPerWord);
			};
			$scope.pause = function () {
				$interval.cancel($scope._interval);
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
