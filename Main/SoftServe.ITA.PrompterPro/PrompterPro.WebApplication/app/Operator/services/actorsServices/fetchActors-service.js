app.factory("fetchActors", [
	"prompterStatus",
    function (actorStatus) {
        return {
            getActors: function ($scope, actorRepository) {
                actorRepository.get().then(
                    function(actors) {
                    	$scope.actors = actors;

                    	var checked = $scope.$parent.checked;
	                    if (checked) {
	                    	var newChecked = [];

		                    _.each(checked, function(checkedItem) {
		                    	var found = _.find(actors, function (item) {
				                    return item.UserId === checkedItem.UserId
					                    && item.PrompterStatus === actorStatus.On;
		                    	});
			                    if (found) {
			                    	found.checked = true;
				                    newChecked.push(found);
			                    }
		                    });

		                    $scope.$parent.checked = newChecked;
		                    $scope.checked = newChecked;
	                    }
                    });
            }
        }
    }
]);