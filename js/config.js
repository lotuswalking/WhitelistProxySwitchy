(function() {
	requirejs.config({
		baseUrl: "/js",
		paths: {
			underscore: "libs/underscore-min",
			angular: "libs/angular/angular.full",
			ngMock: "libs/angular/angular-mocks",
			ngRoute: "libs/angular/angular-route",
			ngAnimate: "libs/angular/angular-animate",
			ngSanitize: "libs/angular/angular-sanitize",
			"ui.router": "libs/angular/angular-ui-router",
			"ui.utils": "libs/angular/ui-utils",
			"ui.keypress": "libs/angular/angular-ui-keypress",
			raven: "libs/raven",
			"angular-raven": "libs/angular/angular-raven",
			"mgcrea.ngStrap": "libs/angular/angular-strap.tpl",
			_angular_strap: "libs/angular/angular-strap",
			md5: "libs/md5",
			debug: "libs/debug",
			jasmine: "/tests/lib/jasmine-2.0.1/jasmine",
			"jasmine-html": "/tests/lib/jasmine-2.0.1/jasmine-html",
			boot: "/tests/lib/jasmine-2.0.1/boot"
		},
		shim: {
			underscore: {
				exports: "_"
			},
			raven: {
				exports: "Raven"
			},
			angular: {
				exports: "angular"
			},
			md5: {
				exports: "md5"
			},
			ngMock: {
				deps: ["angular"]
			},
			"angular-raven": {
				deps: ["angular", "raven"]
			},
			ngRoute: {
				deps: ["angular"]
			},
			"ui.router": {
				deps: ["angular"]
			},
			"ui.keypress": {
				deps: ["angular"]
			},
			"ui.utils": {
				deps: ["angular"]
			},
			ngSanitize: {
				deps: ["angular"]
			},
			ngAnimate: {
				deps: ["angular"]
			},
			_angular_strap: {
				deps: ["angular", "ngAnimate"]
			},
			"mgcrea.ngStrap": {
				deps: ["_angular_strap"]
			},
			jasmine: {
				exports: "window.jasmineRequire"
			},
			"jasmine-html": {
				deps: ["jasmine"],
				exports: "window.jasmineRequire"
			},
			boot: {
				deps: ["jasmine", "jasmine-html"],
				exports: "window.jasmineRequire"
			}
		}
	}), this.requireWithRetry = function(a, e) {
		var n, r, s;
		return r = null, n = function() {
			return r ? void 0 : r = setTimeout(function() {
				return location.reload()
			}, 3e3)
		}, s = function() {
			return n()
		}, require(a, e, s)
	}, chrome.runtime.onMessage || (chrome.runtime.onMessage = chrome.extension.onMessage, chrome.runtime.sendMessage = chrome.extension.sendMessage)
}).call(this);