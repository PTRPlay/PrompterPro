app.controller('adminController', [
    '$scope', function ($scope) {

        $scope.isUsersTabActive = false;
        $scope.isDiagnosticsTabActive = false;
        $scope.isHistoryTabActive = false;
        $scope.isActorTabActive = false;



        $scope.makeUserTab = function () {
            $scope.isUsersTabActive = true;
            $scope.isDiagnosticsTabActive = false;
            $scope.isHistoryTabActive = false;
            $scope.isActorTabActive = false;
        };
        $scope.makeDiagnosticsTab = function () {
            $scope.isUsersTabActive = false;
            $scope.isDiagnosticsTabActive = true;
            $scope.isHistoryTabActive = false;
            $scope.isActorTabActive = false;
        };
        $scope.makeHistoryTab = function () {
            $scope.isUsersTabActive = false;
            $scope.isDiagnosticsTabActive = false;
            $scope.isHistoryTabActive = true;
            $scope.isActorTabActive = false;
        };
        $scope.makeActorTab = function () {
            $scope.isUsersTabActive = false;
            $scope.isDiagnosticsTabActive = false;
            $scope.isHistoryTabActive = false;
            $scope.isActorTabActive = true;
        };


        $scope.autoClick = function (name) {
            var elem = document.getElementById(name.toString());
            elem.click();
        };
    }
]);

app.controller('actorsAdminController', [
    '$scope', 'actorRepository', 'userStateControll', 'serverService', 'dialogSevice',
    'manageUserSate', 'manageListOfActors', 'notify', 'notifyType', 'constants', 'icons',
function ($scope, actorRepository, userStateControll, serverService, dialogSevice,
    manageUserSate, manageListOfActors, notify, notifyType, constants, icons) {

    $scope.managedActorslist = new Array();

    $scope.getAllActors = function () {
        serverService.readAllActors($scope);
    };

    $scope.saveAllChanges = function () {
        alert("saving");
    };

    $scope.controlUserColor = userStateControll($scope);

    $scope.openAddDialog = function (size) {
        dialogSevice.openActorAddDialog(size, $scope);
    };

    $scope.setUpdatedState = function (user) {
        manageUserSate.setModifiedState(user);
    };

    $scope.setDeletedState = function (user) {
        manageUserSate.setDeletedState(user);
    };

    $scope.setAddedState = function (user) {
        $scope.actors.push(user);
        manageUserSate.setAddedState(user);
    }

    
    $scope.addMangedUserToList = function (user) {
        manageListOfActors.addToList($scope, user);
    };

    $scope.saveAllChanges = function () {
        if ($scope.managedActorslist.length > 0) {

            serverService.manageActor($scope, $scope.managedActorslist);
            notify(
                 notifyType.success,
                 $scope.managedActorslist.length + constants.successfulChanges,
                 icons.success);

        } else {
            notify(
                 notifyType.danger,
                 constants.noPendingChanges,
                 icons.warning);
        }

    };

}
]);
