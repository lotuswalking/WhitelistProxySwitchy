(function(){var s,r;s=["angular","options/module"],r=function(s){var r;return r=function($scope,$rootScope,$http,SERVER){return $scope.oldPassword="",$scope.newPassword="",$scope.rePassword="",$scope.focuses={oldPassword:!0,newPassword:!1},$scope.alert=$scope.$parent.alert,$scope.closeModal=$scope.$parent.closeModal,$scope.submitChangePassword=function(){return $scope.oldPassword?$scope.newPassword?$scope.newPassword!==$scope.rePassword?($scope.alert("2次输入的新密码不一致，请检查并修改"),$scope.focuses.newPassword=!0,!1):($scope.disableInput=!0,$http({method:"POST",url:"https://"+SERVER+"/user/password",params:{old:$scope.oldPassword.trim(),"new":$scope.newPassword.trim(),sid:$rootScope.user.profile.sid},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(s){return $scope.disableInput=!1,s.error?($scope.alert(s.message),"PASSWORD_INVALID"===s.error?$scope.focuses.oldPassword=!0:"NEW_PASSWORD_TOO_SHORT"===s.error?$scope.focuses.newPassword=!0:void 0):($scope.alert("密码已成功修改","success"),$scope.isChangingPassword=!1,$scope.closeModal())}).error(function(){return $scope.disableInput=!1,$scope.isChangingPassword=!1,$scope.alert("网络错误，请稍后重试")}),$scope.disableInput=!1,!0):($scope.focuses.newPassword=!0,$scope.alert("请输入至少6位新密码"),!1):($scope.focuses.oldPassword=!0,$scope.alert("请输入正确的旧密码"),!1)},$scope.cancelChangePassword=function(){return $scope.isChangingPassword=!1,$scope.closeModal()}},s.module("options").controller("ChangePasswordController",r)},define(s,r)}).call(this);