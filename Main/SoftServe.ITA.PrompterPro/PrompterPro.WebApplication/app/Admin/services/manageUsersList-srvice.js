app.factory('manageListOfUsers', [
    function () {
       return {
           addToList: function ($scope, user) {
               $scope.managedUserslist.push(user);
           },
           removeFromList: function ($scope, user) {
               $scope.users.splice($scope.users.indexOf(user), 1);
           }
        };
    }
]);
app.factory('manageListOfActors', [
    function () {
        return {
            addToList: function ($scope, actor) {
                $scope.managedActorslist.push(actor);
            },
            removeFromList: function ($scope, actor) {
                $scope.actors.splice($scope.actors.indexOf(actor), 1);
            }
        };
    }
]);