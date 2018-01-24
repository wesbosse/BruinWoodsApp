(function() {
    'use strict';

    angular
        .module('webPortal')
        .controller('WebPortalCtrl', WebPortalCtrl);

    WebPortalCtrl.$inject = ['webPortalFactory'];

    /* @ngInject */
    function WebPortalCtrl(webPortalFactory) {
        var vm = this;
        vm.title = 'WebPortalCtrl';
        vm.addFile = addFile;
        vm.deleteFile = deleteFile;
        vm.editFile = editFile;
        vm.deleteEvent = deleteEvent;
        vm.activeDocs = [];
        vm.inactiveDocs = [];
        vm.schedules = [];

        activate();

        ////////////////

        function activate() {
            getDocs();
            getSchedules();
        }

        function getSchedules() {
            webPortalFactory.getSchedules()
                .then(function(response) {
                    vm.schedules = response.data;
                    vm.schedules.forEach(function(schedule) {
                        schedule.startDate = new Date(schedule.startDate).toLocaleString();
                        schedule.endDate = new Date(schedule.endDate).toLocaleString();
                        schedule.eventIds.forEach(function(event) {
                            event.startTime = new Date(event.startTime).toLocaleString();
                            event.endTime = new Date(event.endTime).toLocaleString();
                        })
                    })
                }, function(err) {
                    console.log(err);
                });
        }

        function getDocs() {
            webPortalFactory.getDocs()
                .then(function(response) {
                    console.log(response);
                    response.data.forEach(function(doc) {
                        doc.created_date = new Date(doc.created_date).toLocaleString();
                        if (doc.active) {
                            vm.activeDocs.push(doc);
                            console.log(doc);
                        } else {
                            vm.inactiveDocs.push(doc);
                        }
                    })
                })
        }

        function addFile(file) {
            console.log(file);
            webPortalFactory.addFile(file)
                .then(function(response) {
                    if (file.active) {
                        vm.activeDocs.push(response.data);
                    } else {
                        vm.inactiveDocs.push(response.data)
                    }
                }, function(err) {
                    console.log(err);
                });
        }

        function deleteFile(id, index) {
            var r = confirm("Are you sure you want to delete this document?");
            if (r) {
                webPortalFactory.deleteFile(id)
                    .then(function(response) {
                        vm.activeDocs.forEach(function(doc) {
                            if (doc._id == id) {
                                vm.activeDocs.splice(index, 1);
                            }
                        });
                        vm.inactiveDocs.forEach(function(doc) {
                            if (doc._id == id) {
                                vm.inactiveDocs.splice(index, 1);
                            }
                        });
                        alert("Deleted!");
                    }, function(err) {
                        console.log(err);
                    });
            } else {
                return;
            }

        }

        function editFile(file, id, index) {
            vm.activeDocs.forEach(function(document) {
                if(id == document._id) {

                    if(!file.description) {
                        file.description = document.description;
                    }
                    if (!file.name) {
                        file.name = document.name;
                    }
                    if (!file.url) {
                        file.url = document.url;
                    }
                    if (typeof file.active === 'undefined' || typeof file.active === 'null') {
                        file.active = document.active;
                    }
                    file.schedules = [];  
                }
            })
            vm.inactiveDocs.forEach(function(document) {
                if(id == document._id) {
                    if(!file.description) {
                        file.description = document.description;
                    }
                    if (!file.name) {
                        file.name = document.name;
                    }
                    if (!file.url) {
                        file.url = document.url;
                    }
                    if (typeof file.active === 'undefined' || typeof file.active === 'null') {
                        file.active = document.active;
                    }
                  
                }
            })
            webPortalFactory.editFile(file, id)
                .then(function(response) {
                    vm.activeDocs.forEach(function(doc) {
                        if (doc._id == id) {
                            doc.name = angular.copy(file.name);
                            doc.description = angular.copy(file.description);
                            doc.url = angular.copy(file.url);
                            doc.active = angular.copy(file.active);
                        }
                        if (!doc.active) {
                            vm.activeDocs.splice(index, 1);
                            vm.inactiveDocs.push(doc);
                        }
                    });
                    vm.inactiveDocs.forEach(function(doc) {
                        if (doc._id == id) {
                            doc.name = angular.copy(file.name);
                            doc.description = angular.copy(file.description);
                            doc.url = angular.copy(file.url);
                            doc.active = angular.copy(file.active);
                        }
                        if (doc.active) {
                            vm.inactiveDocs.splice(index, 1);
                            vm.activeDocs.push(doc);
                        }
                    });
                    file = {};
                }, function(err) {
                    console.log(err);
                });

        }
        function deleteEvent(id, index, scheduleId) {
            webPortalFactory.deleteEvent(id)
                .then(function(response) {
                    vm.schedules.forEach(function(schedule) {
                        if(scheduleId == schedule._id) {
                            schedule.eventIds.splice(index, 1);
                        };
                    });
                });
        }
    }
})();
