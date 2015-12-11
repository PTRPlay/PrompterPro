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
	function (
		fileUpload,
		webApi,
		entityState,
		constants,
		notify,
		notifyType,
		icons,
		prompterStatus) {
		return function($scope) {
		    var obj = {};

		    obj.actor;

			obj.select = function() {
			   // preferenceService.setCurrentActor(this.actor);
			};

			obj.getSelected = function () {
			    return actor;
			}

			return obj;
		};
	}
]);