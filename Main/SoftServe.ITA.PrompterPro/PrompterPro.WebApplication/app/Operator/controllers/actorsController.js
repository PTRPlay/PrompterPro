app.controller("actorsController", [
    "$scope", "actorRepository", "prompterClass", "prompterOrder", "prompterChecked"
    , 'fetchActors',
    function ($scope, actorRepository, prompterClass, prompterOrder, prompterChecked,
        fetchActors) {
        $scope.fetchAllActors = fetchActors.getActors($scope, actorRepository);
       

        var hub = $.connection.refreshPrompterHub;
        hub.client.displayStatus = function () {
            $scope.fetchAllActors = fetchActors.getActors($scope, actorRepository);
        };
        $.connection.hub.start();
       
        $scope.actorOrder = prompterOrder;
        $scope.actorClass = prompterClass;
	    $scope.actorChecked = prompterChecked;

    }
]);