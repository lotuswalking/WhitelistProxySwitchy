(function(){var e,n;e=["angular","core/module","core/services/tele","core/services/storage","login/module"],n=function(e){var n;return n=function($rootScope,$scope,$location,tele,storage,LOGIN_EVENT_NAME,SERVER_CERT_INTERVAL){return $rootScope.name=$location.search().name||storage.get("lastLoginName",""),$rootScope.betweenCertInterval=function(){var e;return SERVER_CERT_INTERVAL[0]<(e=new Date)&&e<SERVER_CERT_INTERVAL[1]},$rootScope.goToAccountView=function(){return $location.path("/")},$scope.search=function(){return $location.search()},$rootScope.isVirgin=!storage.get("lastLoginName"),$rootScope.isVirgin&&tele.run("track.event",LOGIN_EVENT_NAME,"visit"),tele.run("track.pv","/chrome-extension/login")},e.module("login").controller("LoginPageController",n)},define(e,n)}).call(this);