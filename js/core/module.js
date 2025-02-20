(function() {
	var API_URL, DEFAULT_DOMAINS, ERROR_PAGE_PROXY, GA_ACCOUNT, GUEST_DOMAINS, LOG_URL, MODES, ROLES, RavenConfig, SERVER, SERVER_CERT_INTERVAL, WHITE_LIST_DOMAINS, o;
	o = chrome.runtime.getManifest(), RavenConfig = {
		ravenUrl: "",
	}, 
	
	  MODES = {
		AUTO: "auto",
		ALWAYS: "always",
		NEVER: "never"
	}, ROLES = {
		GUEST: "guest",
		USER: "user",
		VIP: "VIP"
	}, GUEST_DOMAINS = ["akamaihd.net", "facebook.com", "facebook.net", "fbcdn.net", "twitter.com", "t.co", "twimg.com", "google.com", "google.com.hk", "googleusercontent.com", "googleapis.com", "gstatic.com", "gmail.com"], DEFAULT_DOMAINS = GUEST_DOMAINS.concat(["cloudfront.net", "tumblr.com", "sstatic.net", "appspot.com", "s3.amazonaws.com", "blogspot.com", "blogger.com", "mediafire.com", "ytimg.com", "youtube.com", "googlevideo.com", "youtube-nocookie.com", "wordpress.com", "vimeo.com", "bit.ly", "googlesyndication.com", "youtu.be", "ggpht.com", "doubleclick.net", "2mdn.net", "imgur.com", "googleadservices.com", "cloudflare.com"]), WHITE_LIST_DOMAINS = ["0.0.0.0", "127.0.0.1", "localhost", SERVER], define(["angular", "raven", "angular-raven"], function(e, t) {
		var n;
		return t.config(RavenConfig.ravenUrl, {
			logger: "hongx-js-" + (null != o ? o.version : void 0)
		}).install(), n = e.module("core", ["angular-raven"]).constant({
			RavenConfig: RavenConfig,
			VER: o.version,
			GA_ACCOUNT: GA_ACCOUNT,
			SERVER: SERVER,
			API_URL: API_URL,
			LOG_URL: LOG_URL,
			MODES: MODES,
			ROLES: ROLES,
			GUEST_DOMAINS: GUEST_DOMAINS,
			DEFAULT_DOMAINS: DEFAULT_DOMAINS,
			WHITE_LIST_DOMAINS: WHITE_LIST_DOMAINS,
			ERROR_PAGE_PROXY: ERROR_PAGE_PROXY,
			SERVER_CERT_INTERVAL: SERVER_CERT_INTERVAL
		}).run(function($rootScope) {
			return localStorage.debug ? window.$rootScope = $rootScope : void 0
		})
	})
}).call(this);