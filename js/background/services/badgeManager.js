(function() {
	var e, o;
	e = ["underscore", "angular", "core/services/domainUtils", "core/services/timeUtils", "core/services/pageUtils", "background/module", "background/services/proxyManager", "background/services/conflictDetector", "background/services/userDomains", "background/services/upgradeManager", "background/services/tabsTracker"], o = function(e, o) {
		var badgeManager;
		return badgeManager = function($rootScope, $timeout, domainUtils, timeUtils, pageUtils, proxyManager, conflictDetector, userDomains, upgradeManager, tabsTracker, MODES, ROLES) {
			var o, r, t;
			return o = function() {
				return $rootScope.$watch("conflicts", function() {
					return t()
				}, !0), $rootScope.$watch("mode", function() {
					return t()
				}), $rootScope.$watch("blocked", function() {
					return t()
				}), $rootScope.$watch("domains", function() {
					return t()
				}, !0), $rootScope.$watch("currentTab", function() {
					return t()
				}, !0),  chrome.browserAction.onClicked.addListener(function() {
					return $rootScope.user.role === ROLES.GUEST ? pageUtils.activateUrl("login.html#/?source=force-login") : $rootScope.user.role === ROLES.USER ? pageUtils.activateUrl("options.html") : $rootScope.expired ? pageUtils.activateUrl("upgrade.html") : void 0
				})
			}, r = null, t = e.throttle(function() {
				var e, o, t, c, n, i, s, a, u, l, d;
				$rootScope.user.role = ROLES.VIP;
				if (n = "/img/icon-never.png", e = "/img/icon-always.png", o = "/img/icon-auto.png", c = "/img/icon-blocked.png", t = "/img/icon-auto-active.png", a = o, $rootScope.expired) chrome.browserAction.setBadgeBackgroundColor({
					color: "#F00"
				}), chrome.browserAction.setPopup({
					popup: ""
				}), chrome.browserAction.setBadgeText({
					text: "up"
				}), a = n;
				else if ($rootScope.conflicts.length > 0) chrome.browserAction.setBadgeBackgroundColor({
					color: "#F00"
				}), chrome.browserAction.setPopup({
					popup: "popup.html"
				}), chrome.browserAction.setBadgeText({
					text: "!"
				}), a = n;
				else if ($rootScope.user.role === ROLES.GUEST) chrome.browserAction.setBadgeBackgroundColor({
					color: "#17AD08"
				}), chrome.browserAction.setPopup({
					popup: ""
				}), chrome.browserAction.setBadgeText({
					text: "?"
				}), a = n;
				else if ((null != $rootScope && null != (d = $rootScope.user) ? d.role : void 0) === ROLES.USER) chrome.browserAction.setBadgeBackgroundColor({
					color: "#428BCA"
				}), chrome.browserAction.setPopup({
					popup: ""
				}), chrome.browserAction.setBadgeText({
					text: "$"
				}), a = n;
				else {
					switch (chrome.browserAction.setBadgeBackgroundColor({
						color: "#000"
					}), chrome.browserAction.setPopup({
						popup: "popup.html"
					}), i = $rootScope.blockedDomains.length || 0, chrome.browserAction.setBadgeText({
						text: i > 0 ? i.toString() : ""
					}), u = $rootScope.currentTab, $rootScope.mode) {
					case MODES.NEVER:
						a = n;
						break;
					case MODES.ALWAYS:
						a = e;
						break;
					default:
						(null != u ? u.url : void 0) ? (l = u.url, s = domainUtils.parseUri(l).host, a = userDomains.match(s) ? t : o) : a = o
					}
				}
				return a !== r ? (chrome.browserAction.setIcon({
					path: a
				}), r = a) : void 0
			}, 300), o(), this
		}, o.module("background").service("badgeManager", badgeManager)
	}, define(e, o)
}).call(this);