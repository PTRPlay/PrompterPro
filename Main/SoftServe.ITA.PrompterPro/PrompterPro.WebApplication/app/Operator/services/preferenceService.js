app.factory('preferenceService', [
    '$http',
function ( $http) {
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
                       $scope.speed = data.ReadingSpeed;
                       $scope.textSize = data.FontSize;
                       $scope.changeResolusion(data.ScreenWidth, data.ScreenHeight);
                       // goto section by order number
                   })
                    .error(function (data) {
                        console.log('error');
                        var pref = data;
                    });
            },


            exportSettings: function ($scope, width, height) {
                var actor = window.currActor;
                var script = currentScript;
                var preference = {
                    ReaderId : 0,
                    ScriptId: 0,
                 //   LastSectionId: 0, 
                    ReadingSpeed: 0,
                    FontSize: 0,
                    ScreenWidth: 0,
                    ScreenHeight : 0
                }
                preference.ReaderId = actor.Id; 
                preference.ScriptId = script.ScriptId;
               // preference.LastSectionId = set section order numb
                preference.ReadingSpeed = $scope.speed;
                preference.FontSize = $scope.textSize;
                preference.ScreenWidth = width; 
                preference.ScreenHeight = height;
             //   preferenceRepository.put(preference);
                $http.put("api/preference/", preference) 
                    .success(function (response) {
                        return response;
                    })
                    .error(function (error) {
                        return response;
                    });
            }
           
        }
    }
]);