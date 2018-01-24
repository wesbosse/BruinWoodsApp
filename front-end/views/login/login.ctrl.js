(function() {
    'use strict';

    angular
        .module('webPortal')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['authenticationService', '$rootScope', 'localStorageService'];

    /* @ngInject */
    function LoginCtrl(authenticationService, $rootScope, localStorageService) {
        var vm = this;
        vm.title = 'LoginCtrl';
        vm.login = login;
        vm.facebook = facebook;


        /*activate();

        ////////////////

        function activate() {
        }*/

        function login(username, password) {
            /*localStorageService.remove('authorizationData');*/
        	authenticationService.login(username, password)
                .then(function(response) {
                    console.log("login sucess" +JSON.stringify(response));
                    /*$state.go('home');*/
                },function(err) {
                    console.log("login error" + JSON.stringify(err));
                })        		
        }
        function facebook() {
            authenticationService.facebook().then(
                function(response) {
                    console.log(JSON.stringify(response));
                },
                function(err) {
                }
            );
        }
    }
})();