(function() {
	var e, r;
	e = ["angular", "core/services/tele", "core/services/storage", "background/module", "background/services/server", 
	"background/services/proxyManager", "background/services/userDomains", "background/services/userManager", 
	"background/services/tabsTracker", "background/services/performanceTracker", "background/services/conflictDetector", 
	"background/services/errorPageCustomizer", "background/services/badgeManager", 
	 "background/services/track",
	"background/services/timeService"], r = function(e) {
		return e.module("background").run(function($rootScope, tele, storage, server, proxyManager, userDomains,
			 userManager, tabsTracker, performanceTracker, 
			 conflictDetector, errorPageCustomizer, badgeManager, 
			 track, timeService, ROLES, VER) {
			var e;
			return server.connect(), tele.scope("domains", {
				owner: !0,
				list: !0
			}), tele.scope("deltaTime", {
				owner: !0
			}), tele.scope("conflicts", {
				owner: !0
			}), tele.scope("user", {
				owner: !0
			}), tele.scope("mode", {
				owner: !0
			}), tele.scope("freeDomains", {
				owner: !0
			}), tele.scope("currentTab", {
				owner: !0
			}), tele.scope("blockedDomains", {
				owner: !0
			}),tele.scope("proxyAddr", {
				owner: !0
			}),tele.func({
				"userManager.updateProfile": userManager.updateProfile,
				"userManager.logout": userManager.logout,
				"userManager.checkin": userManager.checkin,
				"userManager.load": userManager.load,
				"userDomains.change": userDomains.change,
				"userDomains.remove": userDomains.remove,
				"userDomains.add": userDomains.add,
				"userDomains.match": userDomains.match,
				"track.event": track.event,
				"track.pv": track.pv,
				"track.tagSession": track.tagSession,
				"track.tagUser": track.tagUser
			}), e = VER, storage.set("ver", e), $rootScope.user.role = ROLES.VIP
		}), e.element(document).ready(function() {
			return e.bootstrap(document, ["background"])
		}), console.log("bootstrapped")
	}, require(["../config"], function() {
		return requireWithRetry(e, r)
	})
}).call(this);