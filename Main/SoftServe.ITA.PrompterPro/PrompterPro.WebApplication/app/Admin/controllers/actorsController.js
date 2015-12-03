app.controller("actorsAdminController", [
    "$scope",
    "actorsRepository", //repo
    function ($scope, actorsRepository) {

        $scope.getAllActors = function () {
            return actorsRepository.obj.getall(); // maybe obj. needless
        }

    }
]);