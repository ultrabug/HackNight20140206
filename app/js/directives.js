'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('chicken', function(){
  	return {
  		controller: function(scope){
  			scope.getText = function()
  			{
  				return 'test';
  			};
  		},
  		link : function(scope, elm, attrs, ctrl){
  			elm.text(scope.getText())
  			// elm.text('kikoooooooochicken');
  		}
  }
  })
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
