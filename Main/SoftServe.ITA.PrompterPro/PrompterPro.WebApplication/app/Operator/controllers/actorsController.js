app.controller("actorController", [
	"$scope",
    "initScriptCtrlProps",
    "initScriptCtrlFunctions",
	"actorRepository",
    "broadcastHub",

	function ($scope,
        initScriptCtrlProps,
        initScriptCtrlFunctions,
		actorRepository,
        broadcastHub) {
	    initScriptCtrlProps($scope);
	    initScriptCtrlFunctions($scope);

		actorRepository.getall().then(function(scripts) {
			$scope.scripts = scripts;
			$scope.selectedScript = null;
		});
	}
]);