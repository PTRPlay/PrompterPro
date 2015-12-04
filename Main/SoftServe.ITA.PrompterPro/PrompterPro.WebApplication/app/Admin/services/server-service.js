app.factory('serverService',
    [
    'userRepository', 'actorRepository', function (userRepository, actorRepository) {
        return {
            readAllActors: function($scope) {
                actorRepository
                    .getall()
                    .then(function(actors) {
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
                        $scope.managedUserslist.length = 0;
                    });
            }
        };
    }
]);