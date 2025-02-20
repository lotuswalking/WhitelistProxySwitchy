(function() {
	var t, o;
	t = ["underscore", "angular", "core/services/tele", "core/services/corruptDetector", "popup/module", "popup/controllers/AddController", "popup/controllers/ConflictController", "popup/controllers/MenuController"], o = function(t, o) {
		return o.module("popup").config(function($compileProvider, $routeProvider) {
			return $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome):/), $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome):/), $routeProvider.when("/menu", {
				templateUrl: "/partials/popup/menu.html",
				controller: "MenuController",
				resolve: {
					mode: function(tele) {
						return tele.scope("mode")
					},
					currentTab: function(tele) {
						return tele.scope("currentTab")
					},
					blockedDomains: function(tele) {
						return tele.scope("blockedDomains")
					}
				}
			}).when("/add/:name", {
				templateUrl: "/partials/popup/add.html",
				controller: "AddController"
			}).when("/conflict", {
				templateUrl: "/partials/popup/conflicts.html",
				controller: "ConflictController"
			}).otherwise({
				redirectTo: "/menu"
			})
		}).run(function($location, $rootScope, $timeout, tele) {
			return $timeout(function() {
				return tele.run("track.pv", "/chrome-extension/popup")
			}, 500), $timeout(function() {
				return tele.scope("conflicts")
			}, 10), $rootScope.$watch("conflicts", function(t) {
				return (null != t ? t.length : void 0) > 0 && "/conflict" !== $location.path() ? $location.path("/conflict") : "/conflict" === $location.path() ? $location.path("/menu") : void 0
			}, !0)
		}), o.element(document).ready(function() {
			return o.bootstrap(document, ["popup"])
		})
	}, require(["../config"], function() {
		return requireWithRetry(t, o)
	})
}).call(this);