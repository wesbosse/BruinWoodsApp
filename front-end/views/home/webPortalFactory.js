(function() {
    'use strict';

    angular
        .module('webPortal')
        .factory('webPortalFactory', webPortalFactory);

    webPortalFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function webPortalFactory($http, $q, apiUrl) {
        var service = {
            addFile: addFile,
            getDocs: getDocs,
            getSchedules: getSchedules,
            deleteFile: deleteFile,
            editFile: editFile,
            deleteEvent: deleteEvent
        };
        return service;

        ////////////////

        function addFile(file) {
        	var defer = $q.defer();
        	$http({
        		method: 'POST',
        		url: apiUrl + 'api/infos',
        		data: file
        	}).then(function(response) {
        		defer.resolve(response);
        	},function(err){
        		defer.reject(err);
        	})
        	return defer.promise;
        }

        function getDocs() {
        	var defer = $q.defer();
        	$http({
        		method: 'GET',
        		url: apiUrl + 'api/infos'
        	}).then(function(response){
        		defer.resolve(response);
        	}, function(err){
        		defer.reject(err);
        	})
        	return defer.promise;
        }

        function getSchedules() {
        	var defer = $q.defer();
        	$http({
        		method: 'GET',
        		url: apiUrl + 'api/schedules'
        	}).then(function(response){
        		defer.resolve(response);
        	},function(err){
        		defer.reject(err)
        	})
        	return defer.promise;
        }

        function deleteFile(id) {
            var defer = $q.defer();
            $http({
                method: 'DELETE',
                url: apiUrl + 'api/infos/' + id
            }).then(function(response) {
                defer.resolve(response);
            }, function(err) {
                defer.reject(err)
            })
            return defer.promise;
        }

        function editFile (file, id) {
            var defer = $q.defer();
            $http({
                method: "PUT",
                url: apiUrl + 'api/infos/' + id,
                data: file
            }).then(function(response) {
                defer.resolve(response);
            }, function(err) {
                defer.reject(err)
            })
            return defer.promise;
        }

        function deleteEvent (id) {
            var defer = $q.defer();
            $http({
                method: "DELETE",
                url: apiUrl + "api/events/" + id
            }).then(function(response) {
                defer.resolve(response);
            }, function(err) {
                defer.reject(err);
            })
            return defer.promise;
        }
    }
})();