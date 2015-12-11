app.factory('serverService',
    [
    'userRepository', 'actorRepository', 'preferenceRepository', function (userRepository, actorRepository, preferenceRepository) {
        return {
            readAllActors: function($scope) {
                actorRepository
                    .getall()
                    .then(function (actors) {
                       /* for (var i = 0; i < actors.length;i++) {
                            if (actors[i].LastScriptId === undefined || actors[i].LastScriptId == null) {
                                actors[i].LastScript = "None";
                            }
                            else
                                actors[i].LastScript = scriptRepository.getid(actors[i].LastScriptId).Title;
                        }*/
                        $scope.actors = actors;
                    });
            },
            readAllUsers: function($scope) {
                userRepository
                    .get()
                    .then(function(users) {
                        $scope.users = users;
                    });
            },
            getUserByLogin: function ($scope, login) {
                userRepository
                    .getByLogin(login)
                    .then(function(result) {
                        $scope.result = result;
                    });
            },
            manageUser: function($scope, usersList) {
                userRepository.post(usersList)
                    .then(function(users) {
                        $scope.users = users;
                        $scope.managedUserslist.length = 0;
                    });
            },
            manageActor: function ($scope, actorsList) {
                        actorRepository.post(actorsList)
                            .then(function (actors) {
                                $scope.actors = actors;
                                $scope.managedActorslist.length = 0;
                            });
            },
            getPreference : function (actorId, scriptId)
            {
                preferenceRepository.get(actorId, scriptId)
                             .then(function (data) {
                                 window.preference = data;
                                 return data;
                             });
            }
        };
    }
]);