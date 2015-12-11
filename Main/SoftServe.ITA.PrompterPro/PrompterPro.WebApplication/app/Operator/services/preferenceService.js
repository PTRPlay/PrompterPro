app.factory('preferenceService', [
    'preferenceRepository', 'sectionServices', 'serverService', 'actorService', '$http',
function (preferenceRepository, sectionServices, serverService, actorService, $http) {
        var currentScript;
        var currentActor;
        var currentSection;
        var currentPreference; 
        return {
            setCurrentScript: function (script) {
                currentScript = script;
            },
            setCurrentActor: function (actor){
                currentActor = actor;
            },
            setCurrentSection: function (section) {
                currentSection = section;
            },

            setCurrentPreference: function (preference){
                currentPreference = preference;
            },

            importSettings: function ($scope) { // server callback problem
                var actor = window.currActor;
                var script = currentScript;
 //               currentPreference = preferenceRepository(this,currentActor, currentScript.ScriptId);
            /*    var preference;
                 preference = preferenceRepository.get(actor.Id, script.ScriptId);*/
                //   serverService.getPreference(actor.Id, script.ScriptId);
                $http.get("api/preference?id=" + actor.Id + "+" + script.ScriptId)
                   .success(function (data) {
                     //  console.log(data);
                    //   var pref = data;
                       $scope.speed = data.ReadingSpeed;
                       $scope.textSize = data.FontSize;
                       $scope.changeResolusion(data.ScreenWidth, data.ScreenHeight);
                   })
                    .error(function (data) {
                        console.log('error');
                        var pref = data;
                    });
             /*   if (window.preference !== undefined && preference != null) {
                    $scope.speed = preference.ReadingSpeed;
                    $scope.textSize = preference.FontSize;
                    $scope.changeResolusion(preference.ScreenWidth, preference.ScreenHeight);*/
                    //      return preference;

                    //      $scope.speed = currentPreference.ReadingSpeed;
                    //      $scope.textSize = currentPreference.FontSize;
                    //      $scope.changeResolusion(currentPreference.ScreenWidth, currentPreference.ScreenHeight);
              //  }
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
               // preference.LastSectionId = sectionServices.getCurrentSectionId();
                preference.ReadingSpeed = $scope.speed;
                preference.FontSize = $scope.textSize;
                preference.ScreenWidth = width; 
                preference.ScreenHeight = height;
                preferenceRepository.put(preference);
            }
           
        }
    }
]);