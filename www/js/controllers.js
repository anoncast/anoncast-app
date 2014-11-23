angular.module('starter.controllers', ['ionic', 'mdo-angular-cryptography'])

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

.controller('AppCtrl', function($scope, $state) {
	$scope.login = function(){
		$state.go('app.playlists');
	};
})

.controller('FirstCtrl', function($scope, RSAKeyGen, $ionicLoading, $state) {
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
			localStorage['privkey'] = key.getPrivateKey();
			localStorage['pubkey'] = key.getPublicKey();
			$scope.hide();

			$state.go('login');
		});
	};
});