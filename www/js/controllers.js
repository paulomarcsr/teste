/*jshint browser: true, couch: true, node: true*/
    (function(){
        'use stric';
    /* jshint validthis: true */
        var app = angular
    .module('starter.controllers', ['ionic']);



    app.controller('AppCtrl', AppCtrl);

    function AppCtrl($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = [{
                username:"paulo",
                password:"xxx"
            }];

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
    $scope: $scope
    }).then(function(modal) {
    $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
    $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
    $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
    $scope.closeLogin();
    }, 1000);
    };
    }

    app.controller('PlaylistsCtrl', PlaylistsCtrl);
    function PlaylistsCtrl ($scope) {
    $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
    ];
    }

    app.controller('PlaylistCtrl', PlaylistCtrl);
    function PlaylistCtrl($scope, $stateParams) {
    }


    app.controller("ExampleController", ExampleController);
    function ExampleController($scope, $ionicPopup, PouchDBListener) {

        var localDB = new PouchDB("todos");
        var remoteDB = new PouchDB("http://localhost:5984/todos");

        $scope.todos = [];

        $scope.create = function($scope) {

            var json = $scope;

            json.todo = [{
                username:"paulo",
                password:"xxx"
            }]




    //        $ionicPopup.prompt({
    //            title: 'Enter a new TODO item',
    //            inputType: 'text'
    //        })
            .then(function(result) {
                if(result !== "") {
                    if($scope.hasOwnProperty("todos") !== true) {
                        $scope.todos = [];
                    }
                    localDB.post({title: result});
                } else {
                    console.log("Action not completed");
                }
            });
        }

        $scope.$on('add', function(event, todo) {
            $scope.todos.push(todo);
        });

        $scope.$on('delete', function(event, id) {
            for(var i = 0; i < $scope.todos.length; i++) {
                if($scope.todos[i]._id === id) {
                    $scope.todos.splice(i, 1);
                }
            }
        });

    }

    app.factory('PouchDBListener', PouchDBListener, ['$rootScope']); function PouchDBListener($rootScope) {

    var localDB = new PouchDB("todos");
    var remoteDB = new PouchDB("http://localhost:5984/todos");

        localDB.changes({
            continuous: true,
            onChange: function(change) {
                if (!change.deleted) {
                    $rootScope.$apply(function() {
                        localDB.get(change.id, function(err, doc) {
                            $rootScope.$apply(function() {
                                if (err) console.log(err);
                                $rootScope.$broadcast('add', doc);
                            })
                        });
                    })
                } else {
                    $rootScope.$apply(function() {
                        $rootScope.$broadcast('delete', change.id);
                    });
                }
            }
        });

        return true;

    }})();