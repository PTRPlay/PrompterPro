﻿app.controller("playerController", [
    "$scope",
    "broadcastHub",
    "broadcastOperator",
    "$modal",

    function ($scope, broadcastHub, broadcastOperator, $modal) {
    
    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'customizePrompter.html',
            controller: 'customizePromptersDialog',
            size: size,
            resolve: {
                selectedPrompters: function () {
                    return $scope.broadcastOperator.getConnected();
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.broadcastOperator.configurePrompters();
        }, function () {
	        $scope.broadcastOperator.configurePrompters();
        });
    };


    var textBox = $('#area');

    var animation;
    var maxSpeed = 10;
    var minSpeed = 1;
    var velocity = 40;
    var textSizeInput = 90;

    $scope.textIsChanged = false;
    $scope.textSizes = [50,55,60,70,80,90,100,110,130];
    $scope.showDialog = false;
    $scope.speed = 5;
    $scope.currentSize = $scope.textSizes[6];
    $scope.textSize = 90;
    $scope.isPlayDisabled = false;
    $scope.isNavigateButtonShown = false;

    $scope.leftPadding = 0;
    $scope.rightPadding = 0;
    $scope.isMirroredX = undefined;
    $scope.isMirroredY = undefined;
    function setDefaultProps() {
        $scope.isMirroredX = undefined;
        $scope.isMirroredY = undefined;
        $scope.speed = 2;
        $scope.leftPadding = 0;
        $scope.rightPadding = 0;
        $scope.textSize = 90;
        $scope.stop();
    }
    $scope.displayText = function () {
        var text = '\n';
        var sections = $scope.$parent.selectedScript.Sections;
        _.each(sections, function (section) {
            text+='[Section:' + section.Order + ']\n' + section.Text + '\n';
        });
        return text;
    }

    $scope.mirrorText = function (isMirroredX,isMirroredY) {
        broadcastHub.server.mirrorText(isMirroredX, isMirroredY);
    }

    $scope.closePlayer = function () {
        setDefaultProps();
    	$scope.broadcastOperator.successEndBroadcast();
    }

    $scope.dontSaveChanges = function () {
        $scope.showDialog = false;
        $scope.textIsChanged = false;
        $scope.broadcastOperator.successEndBroadcast();
    }

    $scope.saveChanges = function () {
        $scope.showDialog = false;
        $scope.textIsChanged = false;
        $scope.broadcastOperator.successEndBroadcast();
    }

    $scope.play = function () {
        $scope.isPlayDisabled = true;
        broadcastHub.server.play();
    }

    broadcastHub.client.play = function () {
        animation = setInterval(function () {
            if (textBox.scrollTop() <= textBox.get(0).scrollHeight) {
                textBox.scrollTop(textBox.scrollTop() + $scope.speed);
            }
        }, velocity);
    }


    $scope.handPlayBack = function () {
        $scope.pause();
        animation = setInterval(function () {
            if (textBox.scrollTop() > 0) {
                textBox.scrollTop(textBox.scrollTop() - $scope.speed);
            }
        }, velocity);
        broadcastHub.server.handPlayBack();
    }

    $scope.handPlay = function () {
        $scope.pause();
        animation = setInterval(function () {
            if (textBox.scrollTop() <= textBox.get(0).scrollHeight) {
                textBox.scrollTop(textBox.scrollTop() + $scope.speed);
            }
        }, velocity);

        broadcastHub.server.handPlay();
    }

    $scope.pause = function () {
        $scope.isHandPlayDisabled = false;
        $scope.isPlayDisabled = false;
        broadcastHub.invoke('pause');
    }

    broadcastHub.client.pause = function () {
        clearInterval(animation);
    }

    $scope.stop = function () {
        $scope.isPlayDisabled = false;
        $scope.isHandPlayDisabled = false;
        broadcastHub.invoke('stop');
    }

    broadcastHub.client.stop = function () {
        clearInterval(animation);
        textBox.scrollTop(0);
    }

    $scope.speedUp = function () {
        broadcastHub.invoke('speedUp');
    }

    broadcastHub.client.speedUp = function () {
        if ($scope.speed < maxSpeed) {
            $scope.speed++;
        }
    }

    $scope.speedDown = function () {
        broadcastHub.invoke('speedDown');
    }

    broadcastHub.client.speedDown = function () {
        if ($scope.speed > minSpeed) {
            $scope.speed--;
        }
    }

    $scope.getNextSection = function() {
        //TODO: Add code
    }

    $scope.getPrevSection = function() {
        //TODO: Add code
    }

    $scope.padRight = function(percentage) {
        broadcastHub.server.padRight(percentage);
    }

    $scope.padLeft = function(percentage) {
        broadcastHub.server.padLeft(percentage);
    }

    $scope.changeTextSize = function () {
        broadcastHub.server.changeTextSize($scope.textSizeInput);
    }

    broadcastHub.client.changeTextSize = function (size) {
        $scope.textSize = size;
        $scope.$apply();
    }
    
}]);
