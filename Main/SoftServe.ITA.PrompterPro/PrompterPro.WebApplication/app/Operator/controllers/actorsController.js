app.controller("actorController", [
	"$scope",
	"actorRepository",
    "broadcastHub",

	function ($scope, actorRepository, broadcastHub) {

		actorRepository.getall().then(function(actors) {
			$scope.actors = actors;
			$scope.selectedActor = null;
		});
	}
]);