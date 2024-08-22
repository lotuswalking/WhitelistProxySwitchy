(function() {
	var n, t, e = [].slice;
	n = ["underscore", "debug"], t = function(n, t) {
		var r, EasySocket, u, i, o, c, s, l, a, f, h, g, d;
		return g = t("EasySocket"), h = t("EasySocket"), h.log = console.error.bind(console), r = 5e3, u = 8e3, i = 17e3, c = 0, l = 2, s = 3, o = 4, f = function() {
			return function(n, t, e, r) {
				return null == t && (t = ""), null == e && (e = ""), null == r && (r = ""), n === l ? "2" : JSON.stringify([n, t, e, r])
			}
		}(this), a = function() {
			return function(n) {
				if ("2" === n) return [l, "", "", ""];
				try {
					return JSON.parse(n)
				} catch (t) {
					return h = t, [l, "", "", ""]
				}
			}
		}(this), d = function() {
			return (new Date).getTime()
		}, EasySocket = function() {
			var n, t;
			return t = null, this.setUrl = function(n) {
				return t ? h("url is already set: %s", t) : t = n
			}, this.$get = function($rootScope) {
				return new n($rootScope)
			}, n = function($rootScope) {
				var n, y, p, v, m, S, J, N, O, $, k, w, T, b, x;
				return x = null, S = {
					connect: [],
					connecting: [],
					reconnect: [],
					reconnecting: [],
					disconnect: []
				}, n = {}, O = 0, v = -1, k = -1, b = null, J = function() {
					return setInterval(function() {
						return y() && w(f(l)), d() - O > i && k > -1 ? $() : void 0
					}, u)
				}, p = function() {
					return function() {}
				}(this), $ = function() {
					var n;
					if (!b) return k += 1, n = Math.min(500 * Math.pow(2, k - 1), 2e4), b = setTimeout(p, n), g("~" + k + "~ " + n + " ms later")
				}, m = function() {
					return k = -1, null != x ? x.close() : void 0
				}, w = function(n) {
					return y() ? x.send(n) : "2" !== n ? g("not alive, cannot send %o, state=%s", n, x.readyState) : void 0
				}, T = function(n, t) {
					var e;
					return e = f(o, n, null, t), g("-ack> [%s] %s", n, JSON.stringify(t)), w(e)
				}, y = function() {
					return x && 1 === x.readyState
				}, N = function(n, t) {
					var e, r, u, i, o;
					for (i = S[n] || [], o = [], r = 0, u = i.length; u > r; r++) e = i[r], o.push(e(t));
					return o
				}, this.alive = function() {
					return function() {
						return y()
					}
				}(this), this.connect = function() {
					return function() {
						return k = 0, p()
					}
				}(this), this.disconnect = function() {
					return function() {
						return m()
					}
				}(this), this.emit = function() {
					return function() {
						var t, u, i, o, c, l;
						c = arguments[0], l = 2 <= arguments.length ? e.call(arguments, 1) : [];
						try {
							return i = "", u = void 0, l.length >= 2 ? (i = l[0], u = l[1]) : 1 === l.length && ("function" == typeof l[0] ? u = l[0] : i = l[0]), t = v += 2, u && (n[t] = u, setTimeout(function() {
								return delete n[t]
							}, r)), o = f(s, t, c, i), g("-evt> [%s] %s %s", t, c, JSON.stringify(i)), w(o)
						} catch (a) {}
					}
				}(this), this.on = function() {
					return function(n, t) {
						return null == S[n] && (S[n] = []), S[n].push(t)
					}
				}(this), J(), this
			}, this
		}
	}, define(n, t)
}).call(this);