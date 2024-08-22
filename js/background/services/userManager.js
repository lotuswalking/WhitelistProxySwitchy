(function() {
	var e, n;
	e = ["debug", "angular", "core/services/pageUtils", "core/services/storage", "background/module", "background/services/server"], n = function(e, n) {
		var r, userManager;
		return r = e("userManager"), userManager = function($rootScope, pageUtils, storage, server, ROLES, VER) {
			var e, o, u, i, t, s;
			return u = {
				sid: "1111",
				name: "nowall",
				until: null,
				level: "",
				no_password: !1,
				anonymous: !1
			}, i = {
				profile: u,
				role: ROLES.VIP
			}, s = function(o) {
				return function() {
					return $rootScope.user = n.copy(i), storage.get("user") ? (o.load(storage.get("user")), t(), storage.remove("user")) : storage.get("profile") && o.load(storage.get("profile")), e(), r("ready")
				}
			}(this), e = function(e) {
				return function() {
				}
			}(this), t = function() {
				return storage.set("profile", n.copy($rootScope.user.profile))
			}, o = function() {
				return $rootScope.user = n.copy(i), storage.remove("disableNotifyRenewVIP")
			}, this.load = function(e) {
			    
				return $rootScope.user.profile.sid = e.sid, $rootScope.user.profile.name = "nowall", $rootScope.user.profile.anonymous = e.anonymous, $rootScope.user.profile.no_password = e.no_password || !1, $rootScope.user.profile.until = e.until, $rootScope.user.profile.level = 10, $rootScope.user.role = ROLES.VIP
			}, this.checkin = function() {
				return function() {
					var e, n;
					return e = {
						ver: VER,
						sid: $rootScope.user.profile.sid,
						proxies: $rootScope.proxies,
						ext_id: ("undefined" != typeof chrome && null !== chrome && null != (n = chrome.runtime) ? n.id : void 0) || ""
					}, server.emit("checkin", e, function() {
						return r("checkin successful"), $rootScope.$emit("checkin-success")
					})
				}
			}(this), this.updateProfile = function() {
				return server.emit("update_profile", null, function() {
					return r("update profile successful")
				})
			}, this.logout = function(e) {
				return function() {
					o(), e.checkin(), $rootScope.$emit("logout")
				}
			}(this), s(), this
		}, n.module("background").service("userManager", userManager)
	}, define(e, n)
}).call(this);