(function(module) {
try {
  module = angular.module('mnd.sprinkle');
} catch (e) {
  module = angular.module('mnd.sprinkle', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/sprinkle.html',
    '<div class="sprinkle-container">\n' +
    '	<div class="sprinkle-result">\n' +
    '		\n' +
    '		<span class="sprinkle-left">\n' +
    '			&nbsp;\n' +
    '			{{word.left}}\n' +
    '		</span>\n' +
    '		<span class="sprinkle-pivot">\n' +
    '			<div class="sprinkle-center-line-top"></div>\n' +
    '			<div class="sprinkle-center-line-center"></div>\n' +
    '			<div class="sprinkle-center-line-bottom"></div>	\n' +
    '			{{word.pivot}}\n' +
    '		</span>\n' +
    '		<span class="sprinkle-right">\n' +
    '			{{word.right}}\n' +
    '		</span>\n' +
    '	</div>\n' +
    '	<div class="sprinkle-control-bar">\n' +
    '		<div class="sprinkle-control-bar-left">\n' +
    '			<div class="sprinkle-control-btn" ng-click="rewind()"><i class="fa fa-refresh"></i></div>\n' +
    '			<div class="sprinkle-control-btn" ng-if="running" ng-click="pause()"><i class="fa fa-pause"></i></div>\n' +
    '			<div class="sprinkle-control-btn" ng-if="!running" ng-click="start()"><i class="fa fa-play"></i></div>\n' +
    '		</div>\n' +
    '		<div class="sprinkle-control-bar-right">\n' +
    '			<div class="sprinkle-control-btn" ng-click="decreaseSpeed()"><i class="fa fa-minus"></i></div>\n' +
    '			<div class="sprinkle-control-wpm">{{wpm}} wpm </div>\n' +
    '			<div class="sprinkle-control-btn" ng-click="increaseSpeed()"><i class="fa fa-plus"></i></div>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '</div>\n' +
    '');
}]);
})();
