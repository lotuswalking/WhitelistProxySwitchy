(function() {
	var e, r;
	e = ["angular", "core/services/storage", "core/services/pageUtils", "core/services/tele", "core/services/invitationManager", "options/module"], r = function(e) {
		var r;
		return r = function($scope, $rootScope, $modal, $location, $timeout, storage, invitationManager, pageUtils, tele, SERVER, ROLES, VER) {
			return $rootScope.windowTitle = "WhitelistProxySwitchy " + VER,  $scope.currentState = "", $scope.newInvitationCount = 0, $scope.ver = VER,  $rootScope.isVIP = function() {
				return $rootScope.user.role === ROLES.VIP
			}, $rootScope.isDue = function() {
				return !$rootScope.isVIP() && $rootScope.user.profile.until
			}, $scope.source = function() {
				return $location.search().source
			},  tele.scope("user").then(function() {
				return $rootScope.user.role = ROLES.VIP
			}), tele.scope("freeDomains", {
				list: !0
			}), tele.run("userManager.updateProfile"), storage.get("afterRegister") ? (storage.remove("afterRegister"), pageUtils.openUrl($rootScope.payUrl)) : void 0
		}, e.module("options").controller("OptionsPageController", r)
	}, define(e, r)
}).call(this);