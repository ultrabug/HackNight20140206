'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('chicken', function(){
  	return {
  		controller: function($scope, $element, $attrs){
  			$scope.getText = function()
  			{
  				return 'test';
  			};
  		},
      scope : {
        'data' : '='
      },
  		link : function(scope, elm, attrs, ctrl){
  			elm.text(scope.getText())
  			elm.css('background-color', 'red');
        console.log('kikooo');
        console.log(scope);

        elm.css('top', '100px');
        elm.css('left', '100px');
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
