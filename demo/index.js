angular.module("SpritzDemo", ["mnd.spritz"])

.controller("MainController", function ($scope) {
	$scope.text = "Some text to test Spritz with. Akjsdnf aksjn asjdn  ., sdf sd.f s.d,fs";
	$scope.wpm = "300";
});
