(function() {
	var t, n, r = [].indexOf ||
	function(t) {
		for (var n = 0, r = this.length; r > n; n++) if (n in this && this[n] === t) return n;
		return -1
	};
	t = ["angular", "core/module", "core/services/validate"], n = function(t) {
		var domainUtils;
		return domainUtils = function(validate) {
			var t, n;
			return this.dnsDomainIs = function(t, n) {
				var r, e;
				return t === n ? !0 : (r = t.lastIndexOf(n), 0 >= r ? !1 : (e = t.length - (r + n.length), "." === t[r - 1] && 0 >= e ? !0 : !1))
			}, t = document.createElement("a"), this.parseUri = function(n) {
				var r, e;
				return n ? (t.href = n, e = t.search, r = {}, e && (e = e.slice(1), e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(t, n, e) {
					return t ? r[n] = e : void 0
				})), {
					protocol: t.protocol.slice(0, -1),
					user: t.username,
					password: t.password,
					host: t.hostname,
					port: t.port,
					path: t.pathname,
					hash: t.hash,
					query: r
				}) : {}
			}, n = function(t) {
				return t.replace(/[^0-9a-zA-Z\-\.]/gi, "")
			}, this.trimDomain = function(t) {
				return t = n(t), t ? t.trim() : ""
			}, this.topDomain = function(t) {
				return function(n) {
					var e, i, a, s, m, o;
					if (n = t.trimDomain(n), !n) return n;
					if (/^\d+\.\d+\.\d+\.\d+$/.test(n)) return n;
					if (!validate.domain(n)) return n;
					for (i = ["ac", "ad", "ae", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bu", "bv", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cs", "cu", "cv", "cx", "cy", "cz", "dd", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "st", "su", "sv", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "um", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "ye", "yt", "yu", "za", "zm", "zr", "zw", "com", "net", "org", "mil", "gov", "edu", "nato", "info", "int", "name", "biz", "mobi", "museum", "pro", "tel", "asia", "xxx"], s = n.split("."), m = [], e = o = s.length - 1; o >= 0; e = o += -1) {
						if (a = s[e], !(r.call(i, a) >= 0 || e === s.length - 1)) {
							m.unshift(a);
							break
						}
						m.unshift(a)
					}
					return m.join(".")
				}
			}(this), this
		}, t.module("core").service("domainUtils", domainUtils)
	}, define(t, n)
}).call(this);