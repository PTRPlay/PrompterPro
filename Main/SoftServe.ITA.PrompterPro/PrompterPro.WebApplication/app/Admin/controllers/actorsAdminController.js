app.controller("actorsAdminController", [
    '$scope', "actorRepository",
    function ($scope, actorRepository) {

        $scope.users;

        $scope.getAllActors = function () {
            $scope.users = actorRepository.getall();
        };

        $scope.saveAllChanges = function () {
            alert("saving");
        };

        $scope.openAddDialog = function (lg) {
            alert("adding");
        };
      
    }
]);