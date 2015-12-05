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

    $scope.showOkRemove = false;
    $scope.showEditDelete = true;
    $scope.showOddAndEven = true;
    $scope.showPrompterStatus = false;
    $scope.isEdited = false;
    $scope.isDeleted = false;

    $scope.managedActorslist = new Array();
    $scope.deletedActorslist = new Array();

    $scope.removeFromList = function (user) {
        manageListOfActors.removeFromList($scope, user);
    }

    $scope.getAllActors = function () {
        serverService.readAllActors($scope);
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

    $scope.deleteActors = function () {
        var deletedlenght = $scope.deletedActorslist.length;
        var ids = new String();
        for (var i = 0; i < $scope.deletedActorslist.length; i++) {
            ids += $scope.deletedActorslist[i].Id + "+";
            $scope.actors.splice($scope.actors.indexOf($scope.deletedActorslist[i]), 1);
        }
        $scope.deletedActorslist.splice(0, deletedlenght);
        actorRepository.del(ids);
        return deletedlenght;
    }

    $scope.saveAllChanges = function () { 
        var somethingDone = false
        if ($scope.managedActorslist.length > 0) {
            serverService.manageActor($scope, $scope.managedActorslist);
            notify(
                 notifyType.success,
                 $scope.managedActorslist.length + constants.successfulChanges,
                 icons.success);
            somethingDone = true;

        }
        if ($scope.deletedActorslist.length > 0) {
            var deletedlenght = $scope.deleteActors();
                notify(
                     notifyType.success,
                     deletedlenght + constants.successfulChanges,
                     icons.success);
                somethingDone = true; 
        }
        if (somethingDone == false)
            notify(
                    notifyType.danger,
                    constants.cantDeleteAdmin,
                    icons.warning);

    };

    $scope.deleteCurrentActor = function (user) {
        $scope.deletedActorslist.push(user);
        $scope.setDeletedState(user);
    };

    $scope.openEditDialog = function (size, user) {
        /* dialogSevice.openEditDialog(size, user, $scope);*/
    };

}
]);
