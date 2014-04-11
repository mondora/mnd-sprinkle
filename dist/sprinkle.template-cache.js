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
