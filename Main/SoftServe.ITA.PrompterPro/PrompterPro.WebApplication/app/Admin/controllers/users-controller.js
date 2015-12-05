app.controller('usersController', [
    '$scope', '$modal', '$log','userRepository', 'serverService',
    'dialogSevice', 'entityState', 'role', 'manageListOfUsers',
    'manageUserSate', 'notify', 'notifyType',
    'icons', 'constants', 'userStateControll','validationService',
    function ($scope, $modal, $log, userRepository, serverService, dialogSevice,
        entityState, role, manageListOfUsers, manageUserSate, notify,
        notifyType, icons, constants, userStateControll, validationService) {

        $scope.showOkRemove = false;
        $scope.showEditDelete = true;
        $scope.showOddAndEven = true;
        $scope.showPrompterStatus = false;
        $scope.isEdited = false;
        $scope.isDeleted = false;
        $scope.managedUserslist = new Array();
        $scope.deletedUserslist = new Array();

        
        $scope.setIsDeleted = function() {
            $scope.isDeleted = true;
        };

        $scope.setIsEdited = function(value) {
            $scope.isEdited = value;
        };

        $scope.setShowOddAndEven = function(value) {
            $scope.showOddAndEven = value;
        };
        $scope.setShowPrompterStatus = function (value) {
            $scope.showPrompterStatus = value;
        };

        $scope.setShowEditDelete = function (value) {
            $scope.showEditDelete = value;
        };

        $scope.setShowOkRemove = function (value) {
            $scope.showOkRemove = value;
        };

        $scope.showPromStatus = function (name) {
            if (name === role.Prompter.Name) {
                $scope.showPrompterStatus = true;
            } else {
                $scope.showPrompterStatus = false;
            }
        };

        
        $scope.setUpdatedState = function(user) {
            manageUserSate.setModifiedState(user);
        };

        $scope.setDeletedState = function (user) {
            manageUserSate.setDeletedState(user);
        };

        $scope.setAddedState = function (user) {
            $scope.users.push(user);
            manageUserSate.setAddedState(user);
        }

        
        $scope.deleteCurrentUser = function (user) {
            /*if (!validationService.checkIfAdmin(user)) {
                if ($scope.managedUserslist.indexOf(user) !== -1 &&
                    $scope.managedUserslist[$scope.managedUserslist.indexOf(user)]
                    .EntityState === entityState.Added) {
                    $scope.removeFromList(user);
                    $scope.removeFromList(user);

                } else {
                    $scope.setDeletedState(user);
                    $scope.addMangedUserToList(user);

                }
            } else {
                notify(
                    notifyType.danger,
                    constants.cantDeleteAdmin,
                    icons.warning);
            }
            */
            $scope.deletedUserslist.push(user);
            $scope.setDeletedState(user);
        };

        $scope.deleteUsers = function () {
            var deletedlenght = $scope.deletedUserslist.length;
            var ids = new String();
            for (var i = 0; i < $scope.deletedUserslist.length; i++) {
                ids += $scope.deletedUserslist[i].UserId + "+";
                $scope.users.splice($scope.users.indexOf($scope.deletedUserslist[i]), 1);
            }
            $scope.deletedUserslist.splice(0, deletedlenght);
            userRepository.del(ids);
            return deletedlenght;
        }

        $scope.openEditDialog = function(size, user) {
            dialogSevice.openEditDialog(size, user, $scope);
        };

        $scope.openAddDialog = function (size) {
            dialogSevice.openAddDialog(size, $scope);
        };

        $scope.addMangedUserToList = function (user) {
            manageListOfUsers.addToList($scope, user);
        };

        $scope.removeFromList = function (user) {
            manageListOfUsers.removeFromList($scope, user);
        }

        $scope.getUserForEditing = function (user) {
            $scope.userForEditing = user;
        };

        $scope.fetchUsers = function () {
            serverService.readAllUsers($scope);
            for (user in $scope.users) {
                user.inAction = false;
            }
        };

        $scope.controlUserColor = userStateControll($scope);

        $scope.saveAllChanges = function () {
          /*  if ($scope.managedUserslist.length > 0) {

                serverService.manageUser($scope, $scope.managedUserslist);
                notify(
                     notifyType.success,
                     $scope.managedUserslist.length + constants.successfulChanges,
                     icons.success);

            } else {
                notify(
                     notifyType.danger,
                     constants.noPendingChanges,
                     icons.warning);
            }*/
            var somethingDone = false
            if ($scope.managedUserslist.length > 0) {
                serverService.manageUser($scope, $scope.managedUserslist);
                notify(
                     notifyType.success,
                     $scope.managedUserslist.length + constants.successfulChanges,
                     icons.success);
                somethingDone = true;

            }
            if ($scope.deletedUserslist.length > 0) {
                var deletedlenght = $scope.deleteUsers();
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

      
    }
]);