(function() {
    'use strict';

    angular
        .module('webPortal', [
            'ui.router',
            'LocalStorageModule'
        ])
        .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
            // For any unmatched url, redirect to /state1
            $urlRouterProvider.otherwise("login");
            //
            // Now set up the states
            $stateProvider
                .state('login', {
                    url: "",
                    templateUrl: "views/login/login.html",
                    controller: "LoginCtrl as login"
                })
                .state('home', {
                    url: "/home",
                    templateUrl: "views/home/home.html",
                    controller: "WebPortalCtrl as portal"
                })
        })
        .value('apiUrl', 'http://localhost:3000/');
})();
