(function() {
    'use strict';

    angular
        .module('webPortal')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$q', '$location', 'localStorageService'];

    /* @ngInject */
    function authInterceptor($q, $location, localStorageService) {
        var service = {
            request: request,
            response: response,
            requestError: requestError,
            responseError: responseError
        };
        return service;

        function request(config) {
            // grabs headers if they exist assigns empty object if they don't
            config.headers = config.headers || {};
            var authData = localStorageService.get('authorizationData');

            if (authData) {
                config.headers.access_token = authData;
            }

            return config;
        }

        function response(response) {
            return response || $q.when(response);
        }

        function requestError(rejection) {
            return $q.reject(rejection);
        }

        function responseError(rejection) {
            if (rejection.status === 401) {
                localStorageService.remove("authorizationData");
                $location.path('login');
            }
            return $q.reject(rejection);
        }
    }
})();
