(function() {
	var n, e;
	n = ["underscore", "debug", "angular", "core/services/storage", "core/services/domainUtils", "background/module", "background/services/server", "background/services/userDomains"], e = function(n, e, t) {
		var i, userDomains;
		return i = e("userDomains"), userDomains = function($rootScope, $timeout, storage, domainUtils, server, userManager, ROLES, GUEST_DOMAINS, DEFAULT_DOMAINS) {
			var e, r, u, o, s, a, c, d, m, l, f, h;
			return u = function() {
				return function() {
					return $rootScope.isSyncing = !1, $rootScope.domains = storage.get("domains", []), $rootScope.$watch("domains", function(n, e) {
						return t.equals(n, e) ? void 0 : (d(), r())
					}, !0), $rootScope.$on("checkin-success", function() {
						var n, e;
						return (null != (n = $rootScope.user) && null != (e = n.profile) ? e.name : void 0) ? (i("forever sync"), d(), m()) : void 0
					}), $rootScope.$on("logout", function() {
						return i("clear domains"), $rootScope.domains = []
					}), server.on("force_sync_domains", function() {
						return d()
					}), i("ready")
				}
			}(this), o = function() {
				var n, e, t, i;
				for (i = [], e = 0, t = DEFAULT_DOMAINS.length; t > e; e++) n = DEFAULT_DOMAINS[e], i.push($rootScope.domains.push({
					name: n,
					_dirty: !0,
					_deleted: !1,
					_mtime: 0,
					_init: !0
				}));
				return i
			}, r = function() {
				return storage.set("domains", t.copy($rootScope.domains))
			}, e = function(e) {
				return n.findWhere($rootScope.domains, e)
			}, h = function(n, e) {
				var t, i, r, u, o;
				for (u = ["name", "_dirty", "_deleted", "_mtime", "_init"], o = [], i = 0, r = u.length; r > i; i++) t = u[i], o.push(n[t] = e[t]);
				return o
			}, s = function(n) {
				var t, i, r, u, o;
				if ((null != n ? n.length : void 0) > 0) {
					for (o = [], r = 0, u = n.length; u > r; r++) t = n[r], i = e({
						_id: t._id
					}), o.push(i ? h(i, t) : $rootScope.domains.push(t));
					return o
				}
			}, f = null, l = null, d = function() {
				return $rootScope.user.role !== ROLES.GUEST ? (f && (clearTimeout(f), f = null), $rootScope.isSyncing ? (f = setTimeout(d, 1e3), i("sync wait")) : (i("sync begin"), $rootScope.isSyncing = !0, clearTimeout(l), l = setTimeout(function() {
					return $rootScope.isSyncing = !1, l = null
				}, 6e4), a(function() {
					return i("sync pulled"), c(function() {
						return setTimeout(function() {
							return $rootScope.isSyncing = !1, i("sync ok!")
						}, 5e3), i("sync cooling down")
					})
				}))) : void 0
			}, a = function() {
				return function(e) {
					var t, r;
					return r = n.max(n.union([0], function() {
						var n, e, i, r;
						for (i = $rootScope.domains, r = [], n = 0, e = i.length; e > n; n++) t = i[n], r.push(t._mtime);
						return r
					}())), i("sync pulling, max_mtime=%s", r), server.emit("sync_domains", {
						mtime: r
					}, function(n) {
						var t;
						return (null != n && null != (t = n.update) ? t.length : void 0) > 0 && s(n.update), 0 === $rootScope.domains.length && o(), e()
					})
				}
			}(this), c = function(e) {
				var t;
				return t = {
					domains: n.where($rootScope.domains, {
						_dirty: !0
					})
				}, t.domains.length ? (i("sync pushing, length=" + t.domains.length), server.emit("dirty_domains", t, function(t) {
					return t.replace && ($rootScope.domains = n.reject($rootScope.domains, function(n) {
						return n._dirty
					}), s(t.replace)), e()
				})) : e()
			}, m = n.once(function() {
				return function() {
					return setInterval(d, 3e5)
				}
			}(this)), this.match = function(e) {
				return function(t) {
					var i, r;
					return i = e.names(), n.any(function() {
						var n, e, u;
						for (u = [], n = 0, e = i.length; e > n; n++) r = i[n], u.push(domainUtils.dnsDomainIs(t, r));
						return u
					}())
				}
			}(this), this.remove = function(n) {
				var t;
				return t = e({
					name: n
				}), t ? (t._dirty = !0, t._deleted = !0, !0) : !1
			}, this.add = function(n) {
				var t;
				return t = e({
					name: n
				}), t ? t._deleted ? (t._dirty = !0, t._deleted = !1, !0) : !1 : ($rootScope.domains.push({
					name: n,
					_dirty: !0,
					_deleted: !1,
					_mtime: 0
				}), !0)
			}, this.change = function(n, t) {
				var i;
				return i = e({
					name: n
				}), i && n !== t ? (i.name = t, i._dirty = !0, !0) : !1
			}, this.names = function() {
				return n.filter(n.pluck(n.where($rootScope.domains, {
					_deleted: !1
				}), "name"), n.identity)
			}, u(), this
		}, t.module("background").service("userDomains", userDomains)
	}, define(n, e)
}).call(this);