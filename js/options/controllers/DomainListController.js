(function() {
	var r, e, n = [].indexOf ||
	function(r) {
		for (var e = 0, n = this.length; n > e; e++) if (e in this && this[e] === r) return e;
		return -1
	};
	r = ["debug", "angular", "core/services/tele", "core/services/domainUtils", "core/services/validate", "options/module"], e = function(r, e) {
		var o, i;
		return i = r("DomainListController"), o = function($scope, $rootScope, tele, domainUtils, validate, GUEST_DOMAINS) {
			var r;
			return tele.scope("domains", {
				list: !0
			}), $scope.domainToAdd = "", $scope.filteredDomains = [], $scope.sorter = "name", $scope.error = "", $scope.dropdown = [{
				text: "按字母排序",
				click: "setSorter('name')"
			}, {
				text: "按时间排序",
				click: "setSorter('-_mtime')"
			}], r = function() {
				var r;
				return $rootScope.isVIP() ? void 0 : ($scope.guestDomains = function() {
					var e, n, o;
					for (o = [], e = 0, n = GUEST_DOMAINS.length; n > e; e++) r = GUEST_DOMAINS[e], o.push({
						name: r
					});
					return o
				}(), $scope.filteredDomains = _.filter($rootScope.domains, function(r) {
					var e;
					return !r._deleted && (e = r.name, n.call(GUEST_DOMAINS, e) < 0)
				}))
			}, r(), $scope.addDomain = function() {
				var r, e;
				return $rootScope.isVIP() ? (r = domainUtils.trimDomain($scope.domainToAdd), r ? validate.domain(r) ? (e = _.findWhere($rootScope.domains, {
					name: r
				}), e ? $scope.error = "此域名已经被添加，无需再添加" : (tele.run("userDomains.add", r), $scope.domainToAdd = "")) : $scope.error = "域名格式不正确" : $scope.error = "请输入域名") : void 0
			}, $scope.clearError = function() {
				return $scope.error = ""
			}, $scope.setSorter = function(r) {
				return $scope.sorter = r
			}
		}, e.module("options").controller("DomainListController", o)
	}, define(r, e)
}).call(this);