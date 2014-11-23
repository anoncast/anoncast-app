angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {

		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('login', {
			url: "/login",
			templateUrl: "templates/login.html",
			controller: 'AppCtrl'
		})

		.state('register', {
			url: "/register",
			templateUrl: "templates/register.html",
			controller: 'FirstCtrl'
		})

		.state('app', {
			url: "/app",
			abstract: true,
			templateUrl: "templates/menu.html",
			controller: 'AppCtrl'
		})

		.state('app.playlists', {
			url: "/app/playlists",
			views: {
				'menuContent' :{
					templateUrl: "templates/playlists.html",
				}
			}
		});

	if(typeof localStorage['pubkey'] != 'undefined' && typeof localStorage['privkey']  != 'undefined') {
		$urlRouterProvider.otherwise('/login');
	} else {
		$urlRouterProvider.otherwise('/register');
	}
});

