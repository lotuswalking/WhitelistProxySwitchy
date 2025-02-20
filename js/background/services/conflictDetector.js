(function() {
	var n, e, r = [].indexOf ||
	function(n) {
		for (var e = 0, r = this.length; r > e; e++) if (e in this && this[e] === n) return e;
		return -1
	};
	n = ["underscore", "debug", "angular", "background/module"], e = function(n, e, t) {
		var conflictDetector, o;
		return o = e("conflictDetector"), conflictDetector = function($rootScope) {
			var e;
			return $rootScope.conflicts = [], e = function() {
				return chrome.proxy.settings.get({}, function(e) {
					return "controlled_by_other_extensions" === e.levelOfControl ? chrome.management.getAll(function(e) {
						var t, o, i, c;
						for (o = [], i = 0, c = e.length; c > i; i++) t = e[i], t.enabled && r.call(t.permissions, "proxy") >= 0 && t.id !== chrome.runtime.id && o.push({
							id: t.id,
							name: t.name,
							iconUrl: t.icons[0].url
						});
						return n.sortBy(o, function(n) {
							return n.id
						}), $rootScope.conflicts = o
					}) : $rootScope.conflicts = [], $rootScope.$apply()
				})
			}, setInterval(e, 1e3), o("ready"), this
		}, t.module("background").service("conflictDetector", conflictDetector)
	}, define(n, e)
}).call(this);