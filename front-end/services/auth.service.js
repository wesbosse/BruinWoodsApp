(function() {
    'use strict';

    angular
        .module('webPortal')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', '$q', 'apiUrl', '$location', 'localStorageService'];

    /* @ngInject */
    function authenticationService($http, $q, apiUrl, $location, localStorageService) {
        var service = {
            login: login,
            signup: signup,
            facebook: facebook,
            logout: logout,
            init: init
        };
        return service;


        ////////////////

        function signup(newUser) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: apiUrl + 'auth/signup',
                data: newUser
            }).then(function(res) {
                if (res.data.state == 'success') {
                    defer.resolve(res.data.user);
                } else {
                    defer.reject(res);
                }
            }, function(err) {
                console.log(JSON.stringify(err))
                defer.reject(err);
            });
            return defer.promise;
        }

        function login(username, password) {
            /*logout();*/

            var defer = $q.defer();
            var data = 'grant_type=password&username=' + username + '&password=' + password;
            $http({
                method: 'POST',
                url: apiUrl + 'auth/login',
                data: data,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function(res) {
                console.log("reached!");
                if (res.data.state == 'success') {
                    localStorageService.set('username', username);
                    localStorageService.set('authorizationData', res.data.token);
                    $location.path('home');
                    defer.resolve(res.data);
                } else {
                    console.log("didn't work!")
                    $location.path('login');
                    defer.reject(res);
                }
                
            },function(err){
                console.log("in Auth Service" + JSON.stringify(err));
            });
            return defer.promise;
        }

        function facebook() {
            var defer = $q.defer();
            facebookConnectPlugin.login(['public_profile', 'email'],
                function(res) {        
                    localStorageService.set('authorizationData', res.authResponse.accessToken);
                    $location.path('home');
                    defer.resolve(res);
                },
                function(err) {
                    defer.reject(err);
                }
            );

            return defer.promise;
        }


        function logout() {
            localStorageService.remove('authorizationData');
            $location.path('login');
        }

        function init() {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                $location.path('home');
            }
        }

    }
})();
