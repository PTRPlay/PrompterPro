app.controller("actorController", [
	"$scope",
	"actorRepository",
    "broadcastHub",
    "preferenceService",
	function ($scope, actorRepository, broadcastHub, preferenceService) {

		actorRepository.getall().then(function(actors) {
			$scope.actors = actors;
			$scope.selectedActor = null;
		});

		$scope.selectActor = function (actor) {
		    if ($scope.selectedActor == actor) {
		        $scope.selectedActor = null;
		        window.currActor = null;
		        document.getElementById("actorselect" + actor.Id).style.color = "dimgrey";
		        document.getElementById("actorselect" + actor.Id).style.backgroundColor = "white";
		    } else {
		        if ($scope.selectedActor != null) {
		            document.getElementById("actorselect" + $scope.selectedActor.Id).style.color = "dimgrey";
		            document.getElementById("actorselect" + $scope.selectedActor.Id).style.backgroundColor = "white";
		        }
		        $scope.selectedActor = actor;
		        window.currActor = actor;
		        document.getElementById("actorselect" + actor.Id).style.color = "#3c763d";
		        document.getElementById("actorselect" + actor.Id).style.backgroundColor = "#dff0d8";
		    }
		}

		$scope.getActor = function () {
		    return "Actor : " + window.currActor.LastName + " " + window.currActor.FirstName;
		}

		$scope.showImportExport = function () {
		    if (window.currActor === undefined || window.currActor == null)
		        return false;
		    else return true;
		}
	}
]);