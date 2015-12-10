app.service("actorClass", ["entityState", "listGroupItem",
    function (entityState, listGroupItem) {
        return function ($scope) {
            return function (actor) {
                if (actor === $scope.selectedActor) {
                    return listGroupItem.info;
                }
                if (actor.EntityState === entityState.Modified) {
                    return listGroupItem.warning;
                }
                if (actor.EntityState === entityState.Added) {
                    return listGroupItem.success;
                }
                return listGroupItem.empty;
            };
        };
    }
]);