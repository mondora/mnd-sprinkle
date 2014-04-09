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
    '</div>\n' +
    '<br />\n' +
    '<br />\n' +
    '<br />\n' +
    '<button ng-click="start()">Start</button>\n' +
    '<br />\n' +
    '<button ng-click="pause()">Pause</button>\n' +
    '<br />\n' +
    '<button ng-click="stop()">Stop</button>\n' +
    '<br />\n' +
    '<button ng-click="rewind()">Rewind</button>\n' +
    '');
}]);
})();
