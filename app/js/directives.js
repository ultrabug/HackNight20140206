'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('chicken', function($parse, $swipe){
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
  			// elm.css('background-color', 'red');
        console.log('kikooo');
        console.log('kikooo');
        console.log(scope.chicken);
        
      $swipe.bind(elm, {

        start: function(data){

        },
        end : function(end){
          elm.css('top', end.y +'px');
          elm.css('left', end.x+'px');

        }
      });
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
