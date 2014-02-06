'use strict';

angular.module('mobi.config', []).value('mobi.config', {});
angular.module('mobi.events', ['mobi.config']);
angular.module('mobi.swipe', ['mobi.config']);
angular.module('mobi.pinch', ['mobi.config']);
angular.module('mobi.rotate', ['mobi.config']);
angular.module('mobi', ['mobi.events', 'mobi.swipe', 'mobi.pinch', 'mobi.rotate']);

/**
 * Loops thru the various passed directive names and assigns to `QuoJs` touch event
 */
angular.forEach('mobiHold:hold mobiTap:tap mobiSingletap:singleTap mobiDoubletap:doubleTap'.split(' '), function(name) {

	var directive = name.split(':')
		, directiveName = directive[0]
		, eventName = directive[1];

	angular.module('mobi.events')
		.directive(directiveName, ['$parse', function($parse) {
			return function(scope, elm, attr) {
				var fn = $parse(attr[directiveName]);
				$$(elm[0]).bind(eventName, function(event) {
					scope.$apply(function() {
						fn(scope, {$event: event});
					});
				});
			};
		}]);
});

/**
 * Loops thru the various passed directive names and assigns to `QuoJs` swipe gesture
 */
angular.forEach('mobiSwipe:swipe mobiSwiping:swiping mobiSwipeleft:swipeLeft mobiSwiperight:swipeRight mobiSwipedown:swipeDown mobiSwipeup:swipeUp'.split(' '), function(name) {

	var directive = name.split(':')
		, directiveName = directive[0]
		, eventName = directive[1];

	angular.module('mobi.swipe')
		.directive(directiveName, ['$parse', function($parse) {
			return function(scope, elm, attr) {
				var fn = $parse(attr[directiveName]);
				$$(elm[0]).bind(eventName, function(event) {
					scope.$apply(function() {
						fn(scope, {$event: event});
					});
				});
			};
		}]);
});

/**
 * Loops thru the various passed directive names and assigns to `QuoJs` pinch gesture
 */
angular.forEach('mobiPinch:pinch mobiPinching:pinching mobiPinchin:pinchIn mobiPinchout:pinchOut'.split(' '), function(name) {

	var directive = name.split(':')
		, directiveName = directive[0]
		, eventName = directive[1];

	angular.module('mobi.pinch')
		.directive(directiveName, ['$parse', function($parse) {
			return function(scope, elm, attr) {
				var fn = $parse(attr[directiveName]);
				$$(elm[0]).bind(eventName, function(event) {
					scope.$apply(function() {
						fn(scope, {$event: event});
					});
				});
			};
		}]);
});

/**
 * Loops thru the various passed directive names and assigns to `QuoJs` rotate gesture
 */
angular.forEach('mobiRotate:rotate mobiRotating:rotating mobiRotateleft:rotateLeft mobiRotateright:rotateRight'.split(' '), function(name) {

	var directive = name.split(':')
		, directiveName = directive[0]
		, eventName = directive[1];

	angular.module('mobi.rotate')
		.directive(directiveName, ['$parse', function($parse) {
			return function(scope, elm, attr) {
				var fn = $parse(attr[directiveName]);
				$$(elm[0]).bind(eventName, function(event) {
					scope.$apply(function() {
						fn(scope, {$event: event});
					});
				});
			};
		}]);
});



// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'mobi'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
