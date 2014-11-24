angular.module('starter.controllers', ['ionic', 'mdo-angular-cryptography', 'angular-md5'])

.factory('RSAKeyGen', function($q) {
	var generateKeys = function() {
		var deferred = $q.defer();

		var keySize = 512;

		deferred.resolve(new JSEncrypt({default_key_size: keySize}));

		return deferred.promise;
	};

	return {
		generateKeys: generateKeys
	};
})

.controller('AppCtrl', function($scope, $state, $crypto, md5) {
	$scope.loginData = {};

	$scope.login = function(){
		if(md5.createHash($scope.loginData.key) == localStorage['hash']){
			privkey = $crypto.decrypt(localStorage['privkey'], $scope.loginData.key);
			pubkey = $crypto.decrypt(localStorage['pubkey'], $scope.loginData.key);

			$state.go('app.playlists');
		}
	};
})

.controller('TestCtrl', function() {
	console.log(privkey);
})

.controller('FirstCtrl', function($scope, RSAKeyGen, $ionicLoading, $state, $crypto, md5) {
	$scope.loginData = {};

	$scope.show = function() {
		$ionicLoading.show({
			template: 'Loading...'
		});
	};

	$scope.hide = function(){
		$ionicLoading.hide();
	};

	$scope.register = function() {
		$scope.show();

		RSAKeyGen.generateKeys().then(function(key) {
			localStorage['privkey'] = $crypto.encrypt(key.getPrivateKey(), $scope.loginData.key);
			localStorage['pubkey'] = $crypto.encrypt(key.getPublicKey(), $scope.loginData.key);
			localStorage['hash'] = md5.createHash($scope.loginData.key);
			$scope.hide();

			$state.go('login');
		});
	};
});