app.factory('preferenceService', [
    '$http', 'notify',
function ($http, notify) {
    var currentScript;
    return {
        setCurrentScript: function (script) {
            currentScript = script;
        },

        importSettings: function ($scope) {
            var actor = window.currActor;
            var script = currentScript;
            $http.get("api/preference?id=" + actor.Id + "+" + script.ScriptId)
               .success(function (data) {
                   if (data == null) {
                       $scope.notifyFail('No settings for this script!');
                   } else {
                       $scope.stop();
                       $scope.changeSpeed(data.ReadingSpeed);
                       $scope.textSizeInput = data.FontSize;
                       $scope.changeTextSize();
                       $scope.changeScreenResolusion(data.ScreenWidth, data.ScreenHeight);
                       $scope.scrollToCurrent(data.LastSectionId - 1);
                       $scope.notifySuccess('Import done!');
                   }
               })
                .error(function (data) {
                    $scope.notifyFail('Can not import settings!');
                });
        },

        exportSettings: function ($scope, width, height) {
            var actor = window.currActor;
            var script = currentScript;
            var preference = {
                ReaderId: 0,
                ScriptId: 0,
                LastSectionId: 0,
                ReadingSpeed: 0,
                FontSize: 0,
                ScreenWidth: 0,
                ScreenHeight: 0
            }
            preference.ReaderId = actor.Id;
            preference.ScriptId = script.ScriptId;
            preference.LastSectionId = $scope.getCurrentSection();
            preference.ReadingSpeed = $scope.velocity;
            preference.FontSize = $scope.textSize;
            preference.ScreenWidth = width;
            preference.ScreenHeight = height;
            $http.put("api/preference/", preference)
                .success(function (response) {
                    $scope.notifySuccess('Export done!');
                    return response;
                })
                .error(function (error) {
                    $scope.notifyFail('Can not export settings!');
                    return response;
                });
        }

    }
}
]);