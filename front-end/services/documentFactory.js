(function() {
    'use strict';

    angular
        .module('webPortal')
        .factory('documentFactory', documentFactory);

  documentFactory.$inject = ['$http', '$q', '$log'];

    /* @ngInject */
    function documentFactory($http, $q, $log) {

        var service = {
            getDocument: getDocument,
            postDocument: postDocument,
            putDocument: putDocument,
            deleteDocument: deleteDocument
        };
        return service;

        function getDocument() {
            var defer = $q.defer();
            $http.get("http://localhost:55833/api/todomodels").then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject(response)
                    }
                },
                // failure
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;
        };


        function postDocument(newNode) {

            var data = newNode;

            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            var defer = $q.defer();
            $http.post("http://localhost:55833/api/todomodels/post", data, config).then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject(response)
                    }
                },

                function(error) {
                    defer.reject(error);
                });

            return defer.promise;
        };

        function putDocument(newNode) {

            var data = angular.toJson(newNode);

            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(data);
            var defer = $q.defer();
            $http.put("http://localhost:55833/api/todomodels/put?id=" + newNode.id, data, config).then(function(response) {
                    if (response.data === "") {
                        defer.resolve(response);
                    } else {
                        defer.reject(response)
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;
        };


        function deleteDocument(id) {

            var data = "";

            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            var defer = $q.defer();
            $http.delete("http://localhost:55833/api/todomodels/delete?id=" + id, data, config).then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject(response)
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;
        }

    };
})();
