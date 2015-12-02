app.controller('adminController', [
    '$scope', function($scope) {

        $scope.isUsersTabActive = false;
        $scope.isDiagnosticsTabActive = false;
        $scope.isHistoryTabActive = false;
        $scope.isActorTabActive = false;

        

        $scope.makeUserTab = function() {
            $scope.isUsersTabActive = true;
            $scope.isDiagnosticsTabActive = false;
            $scope.isHistoryTabActive = false;
            $scope.isActorTabActive = false;
        };
        $scope.makeDiagnosticsTab = function() {
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


        $scope.autoClick = function(name) {
            var elem = document.getElementById(name.toString());
            elem.click();
        };
    }
]);

