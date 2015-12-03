app.service("actorChecked", [
    function () {
    	return function (actor) {
    		return actor.checked;
    	}
    }
]);