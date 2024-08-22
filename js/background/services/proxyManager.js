(function() {
	var e, r, t = [].indexOf ||
	function(e) {
		for (var r = 0, t = this.length; t > r; r++) if (r in this && this[r] === e) return r;
		return -1
	};
	e = ["underscore", "debug", "angular", "core/services/storage", "core/services/timeUtils", "background/module", "background/services/server", "background/services/userDomains", "background/services/userManager"], r = function(e, r, n) {
		var o, proxyManager;
		return o = r("proxyManager"), proxyManager = function($rootScope, storage, timeUtils, server, userDomains, userManager, MODES, ROLES, VER, WHITE_LIST_DOMAINS) {
			var r, i, s, u, a, l, p, h, c, f, d, g, m;
			return p = timeUtils.time(), a = function() {
			  
				return $rootScope.proxies = m(storage.get("proxies", [])), $rootScope.mode = storage.get("mode", MODES.AUTO), $rootScope.urlRules = {}, 
				$rootScope.freeDomains = [], 
				$rootScope.proxyAddr = "",
				$rootScope.averageStability = 1, 
				$rootScope.blocked = l(), s(), server.on("free_domains", function(r) {
					return e.isArray(r) && !r.error && ($rootScope.freeDomains = r), !0
				}),$rootScope.$watch("mode", function(e) {
					return s(), storage.set("mode", e)
				}), $rootScope.$watch("domains", function() {
					return s()
				}, !0), $rootScope.$watch("freeDomains", function() {
					return s()
				}, !0), $rootScope.$watch("urlRules", function(e) {
					return o("[changed] urlRules, %s", JSON.stringify(e)), s()
				}, !0), $rootScope.$watch("proxyAddr", function(e) {
				    //alert("Proxy address has already been changed.");
					return s()
				}, !0), chrome.proxy.onProxyError.addListener(d), o("ready")
			},
			f = function() {
				var o, i, u, a, h, f;
				
				return $rootScope.blocked = l(), 
				$rootScope.averageStability = r(), 
				o = t.call(e.pluck($rootScope.proxies, "stability"), -1) < 0, 
				o && (a = e.pluck($rootScope.proxies, "host"), 
				g(), 
				u = e.pluck($rootScope.proxies, "host"),
				n.equals(a, u) ? (i = e.min(function() {
					var e, r, t, n;
					for (t = $rootScope.proxies, n = [], e = 0, r = t.length; r > e; e++) h = t[e], n.push(Math.abs(h.fail));
					return n
				}()), 
				f = Math.min(300, 10 + 300 * Math.pow(i / 5, 2)), 
				p + f < timeUtils.time() && (server.emit("pxs", c()), 
				p = timeUtils.time())) : 
				(s(), server.emit("pxs", c()), p = timeUtils.time())), 
				storage.set("proxies", n.copy($rootScope.proxies))
			}, d = function(e) {
				var r, t;
				if ("net::ERR_PROXY_CONNECTION_FAILED" !== (t = e.error) && "net::ERR_TUNNEL_CONNECTION_FAILED" !== t) return r = $rootScope.proxies[0], chrome.proxy.settings.get({}, function(t) {
					return chrome.management.getAll(function(n) {
						var o, i, s, u, a, l, p;
						for (i = [], u = 0, a = n.length; a > u; u++) o = n[u], o.enabled && o.id !== chrome.runtime.id && "extension" === o.type && i.push(o.name);
						return s = null != (l = t.value) && null != (p = l.pacScript) ? p.data.slice(-1e3) : void 0, Raven.captureMessage("" + e.error, {
							extra: {
								details: e.details,
								level: t.levelOfControl,
								extensions: i,
								script: s
							},
							tags: {
								fatal: e.fatal,
								ver: VER,
								proxy: null != r ? r.name : void 0
							}
						})
					})
				})
			}, m = function(r) {
				var t, n, o, i, s, u, a, l, p, h, c, f, d;
				for (o = 0, a = r.length; a > o; o++) {
					for (n = r[o], c = ["name", "group", "scheme", "host"], i = 0, l = c.length; l > i; i++) t = c[i], e.isString(n[t]) || (n[t] = "");
					for (f = ["port", "fail"], s = 0, p = f.length; p > s; s++) t = f[s], e.isNumber(n[t]) || (n[t] = 0);
					for (d = ["latency", "speed", "stability"], u = 0, h = d.length; h > u; u++) t = d[u], e.isNumber(n[t]) || (n[t] = -1)
				}
				return r
			}, h = function(r) {
			
				var t, n, o, i, s, u, a, l, p;
				for (i = m(r), s = 0, a = i.length; a > s; s++) if (o = i[s], n = e.findWhere($rootScope.proxies, {
					name: o.name
				})) for (p = ["group", "host", "port", "scheme", "latency", "fail", "stability", "speed"], u = 0, l = p.length; l > u; u++) t = p[u], o[t] = n[t];
				
				return $rootScope.proxies = i, g(), setTimeout(function() {
					return $rootScope.$apply()
				})
			}, r = function() {
				var r;
				return r = e.map(e.pluck($rootScope.proxies, "stability"), function(e) {
					return -1 === e ? 1 : e
				}), r.length ? e.reduce(r, function(e, r) {
					return e + r
				}) / r.length : 1
			}, i = function(e) {
				var r, t, n, o, i;
				return i = Math.pow(e.stability, 2), n = e.speed, r = e.latency, o = n ? n > 500 ? 1 : 1 - Math.pow(1 - n / 500, 2) : .5, t = r ? 1e3 >= r ? 1 - Math.pow(r / 1e3, 2) / 3 : 3e3 > r ? 2 * Math.pow((3e3 - r) / 2e3, 2) / 3 : 0 : .5, parseFloat(((.6 * o + .4 * t) * i).toFixed(2))
			}, g = function() {
				return $rootScope.proxies = e.sortBy($rootScope.proxies, function(e) {
					return -i(e)
				})
			}, c = function() {
				var e, r;
				return o("make pxs info, last report time: %s s ago", timeUtils.time() - p), r = $rootScope.proxies, [function() {
					var t, n, o;
					for (o = [], t = 0, n = r.length; n > t; t++) e = r[t], o.push(e.name);
					return o
				}(), function() {
					var t, n, o;
					for (o = [], t = 0, n = r.length; n > t; t++) e = r[t], o.push(parseFloat(e.stability.toFixed(2)));
					return o
				}(), function() {
					var t, n, o;
					for (o = [], t = 0, n = r.length; n > t; t++) e = r[t], o.push(e.fail);
					return o
				}(), function() {
					var t, n, o;
					for (o = [], t = 0, n = r.length; n > t; t++) e = r[t], o.push(e.latency);
					return o
				}(), function() {
					var t, n, o;
					for (o = [], t = 0, n = r.length; n > t; t++) e = r[t], o.push(parseFloat(e.speed.toFixed(2)));
					return o
				}(), function() {
					var t, n, o;
					for (o = [], t = 0, n = r.length; n > t; t++) e = r[t], o.push(i(e));
					return o
				}()]
			}, l = function() {
				return e.all($rootScope.proxies, function(e) {
					return e.fail > 0
				}) || 0 === $rootScope.proxies.length
			}, s = e.throttle(function() {
				var e, r;
           if($rootScope.mode !== MODES.NEVER || (null != (r = $rootScope.freeDomains) ? r.length : void 0) > 0 || "{}" !== JSON.stringify($rootScope.urlRules))
  
    		{
			    e = {
					mode: "pac_script",
					pacScript: {
						data: u(),
						mandatory: !0
					}
				};
                storage.set("pacScript", e.pacScript.data);
				chrome.proxy.settings.set({
					value: e,
					scope: "regular"
				}, function() {
					return function() {
						return null
					}
				}(this)) 

				// var config = {
				// 	mode: "fixed_servers",
				// 	rules: {
				// 	  proxyForHttp: {
				// 		scheme: "http",
				// 		host: "127.0.0.1",
				// 		port:"1080"
				// 	  },
				// 	  bypassList: ["foobar.com"]
				// 	}
				//   };
				//   chrome.proxy.settings.set(
				// 	  {value: config, scope: 'regular'},
				// 	  function() {
				// 			return function() {
				// 				return null
				// 			}
				// 		}(this));
				
				}
				else {
				  chrome.proxy.settings.clear({});
				  o("_generateAndApplyConfig");
				 } 
			}, 500), u = function() {
			 
				var e, r, t, n, o, i, s, u, a, l, p, h, c, f, d, g, m, x, v, y, b, D, O, w, N;
				
				/*for (o = $rootScope.mode, o !== MODES.AUTO && o !== MODES.ALWAYS && (o = MODES.AUTO), 
				p = [], 
				D = ($rootScope.proxies || []).slice(0, 2), d = 0, v = D.length; v > d; d++)
				s = D[d],

s = {scheme:"http",host:"localhost",port:"8787"},

				p.push("" + s.scheme + " " + s.host + ":" + s.port); */
				
				//addby xu
				o = $rootScope.mode, o !== MODES.AUTO && o !== MODES.ALWAYS && (o = MODES.AUTO), 
				p = [];
				var proxyAddr = storage.get("proxyAddr");
				
				 s = {scheme:"PROXY",host:"localhost",port:"8787"};
				 
				 if(proxyAddr){
				 
				   var spliteByScheme = proxyAddr.split("://");
				   
				   if(spliteByScheme.length > 1){
				      if(spliteByScheme[0] == "https"){
					    s.scheme = "HTTPS";
					  }
					  proxyAddr = spliteByScheme[1];
				   }
				   
				   var hostAndPort = proxyAddr.split(":");
				   s.host = hostAndPort[0];
				   
				   if(hostAndPort.length > 1){
				     s.port = hostAndPort[1];
				   }
				   else{
				    if(s.scheme == "HTTPS"){
					  s.port = "443";
					}
					else{
					   s.port = null;
					 }
				   }
				 }
				 
				  p.push("" + s.scheme + " " + s.host + ":" + s.port);
				
				l = p.join(";"), n = [], n.push(["function Find", "roxyForURL(url, host) {\n"].join("P")), n.push('var D = "DIRECT";'), n.push("var p='" + l + "';\n"), n.push("if (shExpMatch(host, '10.[0-9]+.[0-9]+.[0-9]+')) return D;"), n.push("if (shExpMatch(host, '172.[0-9]+.[0-9]+.[0-9]+')) return D;"), n.push("if (shExpMatch(host, '192.168.[0-9]+.[0-9]+')) return D;"), O = $rootScope.urlRules || {};
				for (f in O) s = O[f], n.push("if (url == '" + f + "') return '" + s.scheme + " " + s.host + ":" + s.port + "';");
				for (
				  n.push("var i = url.indexOf('_HXPROXY=');"),  
				  n.push("if (i >= 0) return url.substr(i+9).replace('+', ' ');\n"), g = 0, y = WHITE_LIST_DOMAINS.length; y > g; g++) e = WHITE_LIST_DOMAINS[g], n.push("if (dnsDomainIs(host, '" + e + "')) return D;");
				if (n.push("\n"), r = [], r = r.concat(o === MODES.AUTO && (null != $rootScope && null != (w = $rootScope.user) ? w.role : void 0) === ROLES.VIP ? userDomains.names() : $rootScope.freeDomains), o !== MODES.ALWAYS) {
					for (h = {}, m = 0, b = r.length; b > m; m++) for (e = r[m], i = h, a = e.toLowerCase().split(".").reverse(), t = x = 0, N = a.length - 1; N >= 0 ? N >= x : x >= N; t = N >= 0 ? ++x : --x) if (u = a[t], t === a.length - 1) i[u] = 1;
					else {
						if (1 === i[u]) break;
						null == i[u] && (i[u] = {}), i = i[u]
					}
					n.push("var node = " + JSON.stringify(h) + ";"), n.push("var hostParts = host.toLowerCase().split('.');"), n.push("for (var i=hostParts.length - 1; i >= 0; i --) {"), n.push("    var part = hostParts[i];"), n.push("    node = node[part];"), n.push("    if (node == undefined || node == 1) break;"), n.push("}"), n.push("if (node == 1)"), n.push("    return p;\n")
				} else n.push("return p;");
				 n.push("return D;"); n.push("}");
				 c = n.join("\n");
				 return c;
			}, this.updateSpeed = function(e, r) {
				return -1 === e.speed && (e.speed = r), e.speed = parseInt(.75 * e.speed + .25 * r)
			}, this.updateLatency = function(e, r) {
				return -1 === e.latency && (e.latency = r), e.latency = parseInt(.75 * e.latency + .25 * r)
			}, this.updateStability = function(e, r) {
				return -1 === e.stability && (e.stability = r), e.stability = parseFloat((.75 * e.stability + .25 * r).toFixed(3))
			}, this.getProxyByName = function(r) {
				return e.findWhere($rootScope.proxies, {
					name: r
				})
			}, a(), window.showProxies = function() {
				var r, t;
				return t = function() {
					var t, n, o, i;
					for (o = $rootScope.proxies, i = [], t = 0, n = o.length; n > t; t++) r = o[t], i.push(e.omit(r, "host", "port"));
					return i
				}(), console.table(t)
			}, this
		}, n.module("background").service("proxyManager", proxyManager)
	}, define(e, r)
}).call(this);