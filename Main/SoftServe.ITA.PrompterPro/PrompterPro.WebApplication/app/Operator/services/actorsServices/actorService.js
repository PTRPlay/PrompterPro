app.service("actorService",
[
	"fileUpload",
	"webApi",
	"scriptRepository",
	"entityState",
	"constants",
	"notify",
	"notifyType",
	"icons",
	"prompterStatus",
	function(
		fileUpload,
		webApi,
		scriptRepository,
		entityState,
		constants,
		notify,
		notifyType,
		icons,
		prompterStatus) {

		return function($scope) {
			var obj = {};

			obj.select = function(script) {
				$scope.selectedScript = script;
			};
			return obj;
		};
	}
]);