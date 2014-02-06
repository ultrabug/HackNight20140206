'use strict';

/* Directives */


angular.module('myApp.directives', []).
  .directive('chicken', function(){
  	return function(scope, elm, attrs){
  		elm.txt('kikoooooooochicken');
  	}
  })
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
