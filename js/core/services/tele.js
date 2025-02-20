(function() {
	var e, r, n = [].slice;
	e = ["debug", "angular", "core/module", "core/services/generate"], r = function(e, r) {
		var tele;
		return tele = function($rootScope, $q, $timeout, generate) {
			var t, o, s, u, i, d, l, a, c, f, m, y, p, v, h, g, k, w;
			return k = generate.randomId(8), c = e("tele [" + k + "]"), 
			i = e("tele [" + k + "]"), 
			i.log = console.error.bind(console), 
			l = {}, p = {}, 
			
			f = function(e, r) {
				var n;
				return n = {
					senderId: k,
					id: generate.randomId(8),
					command: "tele.run",
					type: "request",
					name: e,
					args: r
				}, chrome.runtime.sendMessage(n), c("~f> [%s] %s(%o)", n.id, e, r), n
			}, g = function(e, r) {
				var n;
				return n = {
					senderId: k,
					id: e.id,
					command: "tele.run",
					type: "response"
				}, r.error ? (n.error = r.error, i("=f> [%s] %o", e.id, n.error)) : (n.result = r.result, c("=f> [%s] %o", e.id, n.result)), chrome.runtime.sendMessage(n), n
			}, v = function(e) {
				var r, n, t;
				t = [];
				for (n in e) r = e[n], "scope" !== n && "func" !== n ? (l[n] = r, t.push(c("+ %s()", n))) : i("invalid func name: %s (= reserved names)", n);
				return t
			}, d = function() {
				var e, r, t, o;
				return t = arguments[0], e = 2 <= arguments.length ? n.call(arguments, 1) : [], o = f(t, e), r = $q.defer(), p[o.id] = {
					request: o,
					deferred: r
				}, $timeout(function() {
					return p[o.id] ? (delete p[o.id], r.reject("timeout"), i("=f> %o", o.id, "timeout")) : void 0
				}, 3e3), r.promise
			}, h = {}, t = function(e) {
				var r;
				return r = {
					senderId: k,
					command: "tele.scope",
					type: "ask",
					key: e
				}, chrome.runtime.sendMessage(r), c("~s> [%s]", e)
			}, u = function(e, r) {
				var n;
				return n = {
					senderId: k,
					command: "tele.scope",
					type: "emit",
					key: e,
					value: r
				}, chrome.runtime.sendMessage(n), c("=s> [%s] %o", e, r)
			}, s = function(e, r) {
				var n;
				return n = {
					senderId: k,
					command: "tele.scope",
					type: "emit",
					key: e,
					delta: r
				}, chrome.runtime.sendMessage(n), c("=s> [%s %o", e, r)
			}, a = function(e, n) {
				var t, o, s, u, i, d, l, a, c, f, m;
				for (d = {}, u = {}, a = 0, f = n.length; f > a; a++) t = n[a], d[JSON.stringify(r.copy(t))] = t;
				for (c = 0, m = e.length; m > c; c++) t = e[c], u[JSON.stringify(r.copy(t))] = t;
				i = [], s = [];
				for (o in d) l = d[o], void 0 === u[o] && i.push(l);
				for (o in u) l = u[o], void 0 === d[o] && s.push(l);
				return {
					old: i,
					"new": s
				}
			}, y = function(e, n) {
				var t, o, s, u, i, d, l, a, c, f, m;
				for (a = n.old, s = 0, d = a.length; d > s; s++) for (o = a[s], t = u = c = e.length - 1; 0 >= c ? 0 >= u : u >= 0; t = 0 >= c ? ++u : --u) r.equals(e[t], o) && e.splice(t, 1);
				for (f = n["new"], m = [], i = 0, l = f.length; l > i; i++) o = f[i], m.push(e.push(o));
				return m
			}, w = function(e) {
				var n;
				return n = h[e], n.unwatch ? void 0 : (n.unwatch = $rootScope.$watch(e, function(t, o) {
					if (!r.equals(t, o)) if (n.list) {
						if (!n.mute) return s(e, a(t, o))
					} else if (!n.mute) return u(e, t)
				}, !0), setTimeout(function() {
					return $rootScope.$apply()
				}))
			}, o = function(e, r) {
				var n, o;
				return null == r && (r = void 0), n = $q.defer(), null == h[e] && (h[e] = {
					ready: !1,
					defers: [],
					owner: (null != r ? r.owner : void 0) || !1,
					list: (null != r ? r.list : void 0) || !1,
					unwatch: null,
					mute: !1
				}), o = h[e], o.ready ? (setTimeout(function() {
					return n.resolve($rootScope[e])
				}), w(e)) : o.owner ? (o.ready = !0, setTimeout(function() {
					return n.resolve($rootScope[e]), u(e, $rootScope[e])
				}), w(e)) : (o.defers.length || t(e), o.defers.push(n)), n.promise
			}, chrome.runtime.onMessage.addListener(function(e) {
				var r, n, t, o, s, d, a, f, m, v, I, q, M;
				if (e.senderId !== k && ("tele.run" === (I = e.command) || "tele.scope" === I)) {
					if ("tele.run" === e.command) {
						if ("request" === e.type && l[e.name]) {
							c("<f~ [%s] %s(%o)", e.id, e.name, e.args), o = l[e.name];
							try {
								f = o.apply(null, e.args)
							} catch ($) {
								return t = $, i("=f= %o", t), g(e, {
									error: t
								})
							}
							d = $q.when(f), d.then(function(r) {
								return g(e, {
									result: r
								})
							}, function(r) {
								return g(e, {
									error: r
								})
							})
						}
						"response" === e.type && p[e.id] && (q = p[e.id], a = q.request, n = q.deferred, delete p[e.id], e.error ? (i("<f= [%s] %o", e.id, e.error), n.reject(e.error)) : (c("<f= [%s] %o", e.id, e.result), n.resolve(e.result)))
					} else if ("tele.scope" === e.command && h[e.key] && (s = h[e.key], "ask" === e.type && s.owner && (c("<s~ [%s]", e.key), u(e.key, $rootScope[e.key])), "emit" === e.type)) try {
						if (s.mute = !0, e.delta ? (c("<s= [%s] %o", e.key, e.delta), y($rootScope[e.key], e.delta)) : (c("<s= [%s] %o", e.key, e.value), $rootScope[e.key] = e.value), $rootScope.$apply(), s.mute = !1, s = h[e.key], s.defers.length) {
							for (M = s.defers, m = 0, v = M.length; v > m; m++) r = M[m], r.resolve($rootScope[e.key]);
							s.defers = [], s.ready = !0, w(e.key)
						}
					} catch ($) {
						t = $, i(t)
					}
					return $rootScope.$apply()
				}
			}), m = {
				func: v,
				run: d,
				scope: o
			}
		}, r.module("core").factory("tele", tele)
	}, define(e, r)
}).call(this);