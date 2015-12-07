app.factory('preferenceService', [
    'preferenceRepository', 'sectionServices', 'serverService',
    function (preferenceRepository, sectionServices, serverService) {
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

            importSettings: function ($scope) {
                  currentActor = 2; // set actor
                currentPreference = serverService.getPreference(this,currentActor, currentScript.ScriptId);
                    
                    $scope.speed = currentPreference.ReadingSpeed;
                    $scope.textSize = currentPreference.FontSize;
                    $scope.changeResolusion(currentPreference.ScreenWidth, currentPreference.ScreenHeight);
            },

            exportSettings: function ($scope, width, height) {
                var preference = {
                    ReaderId : 0,
                    ScriptId: 0,
                 //   LastSectionId: 0,
                    ReadingSpeed: 0,
                    FontSize: 0,
                    ScreenWidth: 0,
                    ScreenHeight : 0
                }
                preference.Id = 1;
                preference.ReaderId = 2; // get reader
                preference.ScriptId = currentScript.ScriptId;
                preference.LastSectionId = sectionServices.getCurrentSectionId();
                preference.ReadingSpeed = $scope.speed;
                preference.FontSize = $scope.textSize;
                preference.ScreenWidth = width; // -"px"
                preference.ScreenHeight = height; // -"px"
                preferenceRepository.put(preference);
            }
           
        }
    }
]);