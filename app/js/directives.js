'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('chicken', function($parse){
  	return {
  		controller: function($scope, $element, $attrs){
  			$scope.getText = function()
  			{
  				return 'test';
  			};
  		},
      scope : {
        'chicken' : '=chicken'
      },
  		link : function(scope, elm, attrs, ctrl){
  			// elm.text(scope.getText())
  			elm.css('background-color', 'red');

        console.log('kikooo');
        console.log('kikooo');
        console.log(scope.chicken);
        
        scope.$watch("chicken", function(newv) {
          console.log('NEW CHICKEN');
          console.log(newv);
          elm.css('top', newv["top"] +'px');
          elm.css('left', newv["left"]+'px');
        }, true);
        elm.css('top', scope.chicken["top"] +'px');
        elm.css('left', scope.chicken["left"]+'px');
  			// elm.text('kikoooooooochicken');
  		        elm.css('position', 'absolute');
      }
  }
  })
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
