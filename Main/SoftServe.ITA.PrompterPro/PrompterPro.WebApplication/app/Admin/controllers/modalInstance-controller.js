app.controller('modalEditInstanceController',
    [ '$scope', '$modalInstance','userForEditing',
    function ($scope, $modalInstance, userForEditing) {

    $scope.userForEditing = userForEditing;

    $scope.ok = function () {
        $modalInstance.close($scope.userForEditing);
    };

    $scope.cancel = function () {
        $modalInstance.close($scope.copy);
    };
    }]);

app.controller('actorModalEditInstanceController',
    ['$scope', '$modalInstance', 'actorForEditing',
    function ($scope, $modalInstance, actorForEditing) {

        $scope.actorForEditing = actorForEditing;

        $scope.ok = function () {
            $modalInstance.close($scope.actorForEditing);
        };

        $scope.cancel = function () {
            $modalInstance.close($scope.copy);
        };
    }]);
//app.controller('modalAddInstanceController',
//    ['$scope', '$modalInstance','newUser',
//        function ($scope, $modalInstance, newUser) {

//    $scope.newUser = angular.clone(newUser);
    
//    $scope.ok = function () {
//        $modalInstance.close($scope.newUser);
//    };

//    $scope.cancel = function () {
//        $modalInstance.dismiss('cancel');
//    };
//}]);
app.controller('modalAddInstanceController',
    ['$scope', '$modalInstance', 'newUser',
    function ($scope, $modalInstance, newUser) {

    $scope.newUser = newUser;
    
    $scope.ok = function () {
        $modalInstance.close($scope.newUser);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    }]);

app.controller('actorModalAddInstanceController',
    ['$scope', '$modalInstance', 'newActor',
    function ($scope, $modalInstance, newActor) {

        $scope.newActor = newActor;

        $scope.ok = function () {
            $modalInstance.close($scope.newActor);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
