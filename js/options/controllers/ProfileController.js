
(function() {
	var e, t;
	e = ["angular", "core/services/validate", "core/services/generate", "core/services/tele", "options/module","core/services/storage","core/services/pageUtils"], t = function(e) {
		var t;
		
		var removeFromStorage = function(storage,proxy){
		    var storedProxy = getProxyHis(storage);
			var index = storedProxy.indexOf(proxy);
			
			if (index > -1) {
				storedProxy.splice(index, 1);
				storage.set("proxyHis",JSON.stringify(storedProxy));
			}
		};
		
		var addToStorage = function(storage,proxy){
		    var storedProxy = getProxyHis(storage);
			var index = storedProxy.indexOf(proxy);
			
			if (index < 0) {
				storedProxy.push(proxy);
				storage.set("proxyHis",JSON.stringify(storedProxy));
			}
		};
		
		var getProxyHis = function(storage){
		  var storedProxyStr = storage.get("proxyHis");
		  
		  if(storedProxyStr){
		     return JSON.parse(storedProxyStr);
		  }
		  
		  return [];
		};
		
		return t = function($scope, $rootScope, $http, $timeout, $interval, validate, generate, tele,storage,pageUtils) {
			tele.scope("proxyAddr");
			$scope.proxyAddr =  storage.get("proxyAddr");
			$rootScope.proxyAddr = $scope.proxyAddr;
			$scope.pacScript = storage.get("pacScript");
			$scope.proxyAddrHis = getProxyHis(storage);
			$rootScope.downloadPacScript=function(){
				  var bb = new Blob([storage.get("pacScript")],{type:'text/plain'}); 
				  var a = document.createElement("a");
				  document.body.appendChild(a);
				  a.target = "_blank";
					a.style = "display: none";
					 a.href = window.URL.createObjectURL(bb);
					  a.click();
               };
			   
			$rootScope.removeFromHistory = function($event){
			  var proxyAddr = $event.srcElement.parentElement.attributes["proxyvalue"].value;
			  removeFromStorage(storage,proxyAddr);
			  pageUtils.reloadCurrentTab();
			};
			
			$rootScope.reuse = function($event){
			  var proxyAddr = $event.srcElement.parentElement.attributes["proxyvalue"].value;
			  $scope.proxyAddr = proxyAddr;
			  
			  if($scope.proxyAddr){
				  	      addToStorage(storage,$scope.proxyAddr);
						 
						  storage.set("proxyAddr",$scope.proxyAddr);
						   tele.scope("proxyAddr").then(function() {
						return $rootScope.proxyAddr = $scope.proxyAddr;
					});
				  
				}
				
				pageUtils.reloadCurrentTab();
			};
			
			return $rootScope.setProxy=function(){
			    if($scope.proxyAddr){
				  	      addToStorage(storage,$scope.proxyAddr);
						 
						  storage.set("proxyAddr",$scope.proxyAddr);
						   tele.scope("proxyAddr").then(function() {
						return $rootScope.proxyAddr = $scope.proxyAddr;
					});
				  
				}
		
               };			
		}, e.module("options").controller("ProfileController", t)
	}, define(e, t)
}).call(this);