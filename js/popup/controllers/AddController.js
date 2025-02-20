(function() {
	var n, e, r = [].indexOf ||
	function(n) {
		for (var e = 0, r = this.length; r > e; e++) if (e in this && this[e] === n) return e;
		return -1
	};
	n = ["angular", "core/services/pageUtils", "core/services/tele", "popup/module"], e = function(n) {
		var e;
		return e = function($scope, $routeParams, $location, pageUtils, tele) {
			return $scope.name = $routeParams.name, $scope.routeToMenu = function() {
				return function() {
					return $location.path("/menu")
				}
			}(this), $scope.addDomain = function() {
				return function() {
					return $scope.name && r.call($scope.name, ".") >= 0 ? tele.run("userDomains.add", $scope.name).then(function() {
						return pageUtils.reloadCurrentTab(window.close)
					}) : void 0
				}
			}(this)
		}, n.module("popup").controller("AddController", e)
	}, define(n, e)
}).call(this);