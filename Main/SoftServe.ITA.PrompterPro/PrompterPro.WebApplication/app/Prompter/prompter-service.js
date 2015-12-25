﻿app.service("prompterService",
[
    "broadcastHub",
    "prompterRepository",
	"constants",
    "notify",
    "notifyType",
    "icons",
    "prompterResolution",
    function (
        broadcastHub,
        prompterRepository,
		constants,
		notify,
		notifyType,
		icons,
        prompterResolution) {

    	return function ($scope) {

    	    var textBox = $('#area');
    	    var animation;
    	    var startVelocity = 24;
    	    var resolutionMultiplier = 1;
    	    var speedStep = 2;

    	    $scope.textIsChanged = false;
    	    $scope.textSizes = [50, 55, 60, 70, 80, 90, 100, 110, 130];
    	    $scope.showDialog = false;
    	    $scope.speed = 2;
    	    $scope.velocity = startVelocity;
    	    $scope.speedHandlPlay = 15;
    	    $scope.currentSize = $scope.textSizes[2];
    	    $scope.textSize = 90;
    	    $scope.leftPadding = 0;
    	    $scope.rightPadding = 0;
    	    var mintextSize = 70;
    	    var maxtextSize = 110;
    	    var textSizeStep = 5;

		    $scope.hub = broadcastHub;
		    function setDefaultProps() {
		        $scope.isMirroredX = undefined;
		        $scope.isMorroredY = undefined;
		        $scope.speed = 2;
		        $scope.leftPadding = 0;
		        $scope.rightPadding = 0;
		        $scope.textSize = 90;
		        broadcastHub.client.stop();
		    }
		    broadcastHub.client.fetchScript = function (scriptId, operatorId) {
                prompterRepository.get(scriptId, function(script) {
                    $scope.script = script;
                    ///
                    var sections = $scope.script.Sections;
                    var area = $('#area')
                    if (area.children.length > 0) {
                        area.empty();
                    }
                    _.each(sections, function (section) {
                        $('#area').append("<p id=Section" + section.Order + ">" + "[Section" + section.Order + "]\n" + section.Text + "</p>");
                    });
                    ///
                    broadcastHub.server.fetchSuccess(operatorId);
                    notify(
						notifyType.success,
						constants.connectedToOperator,
						icons.ok);
                    $scope.$apply();
                });
            }

		    broadcastHub.client.operatorConnected = function () {
		    	notify(
					notifyType.success,
					constants.allConnected,
					icons.ok);
		    	$scope.$apply();
            }


		    broadcastHub.client.broadcastEnd = function () {
		    	notify(
					notifyType.success,
					constants.broadcastEnd,
					icons.warning);
		    	$scope.script = null;
		        setDefaultProps();
		    	$scope.$apply();
		    }

		    broadcastHub.client.operatorDisconnected = function () {
		    	notify(
					notifyType.danger,
					constants.operatorDisconnected,
					icons.warning);
		    	$scope.script = null;
		    	setDefaultProps();
		    	$scope.$apply();
		    }

            broadcastHub.client.play = function () {
		        animation = setInterval(function () {
		            if (textBox.scrollTop() <= textBox.get(0).scrollHeight) {
		                textBox.scrollTop(textBox.scrollTop() + $scope.speed);
		            }
		        }, $scope.velocity);
		    }

		    broadcastHub.client.pause = function () {
                clearInterval(animation);
            }

		    broadcastHub.client.stop = function () {
                clearInterval(animation);
                textBox.scrollTop(0);
            }

		    broadcastHub.client.changeTextSize = function (size) {
		        $scope.textSize = size;
		        $scope.$apply();
		    }

		    broadcastHub.client.changeSpeed = function (speed) {
		        $scope.velocity = speed;
		    }

		    broadcastHub.client.textSizeUp = function () {
		        if ($scope.textSize < maxtextSize) {
		            $scope.textSize += textSizeStep;
		            $scope.$apply();
		        }
		    }

		    broadcastHub.client.textSizeDown = function () {
		        if ($scope.textSize > mintextSize) {
		            $scope.textSize -= textSizeStep;
		            $scope.$apply();
		        }
		    }

            broadcastHub.client.speedUp = function() {
                clearInterval(animation);
                $scope.velocity -= speedStep;
                broadcastHub.server.play();
            }

            broadcastHub.client.speedDown = function() {
                clearInterval(animation);
                $scope.velocity += speedStep;
                broadcastHub.server.play();
            }

            broadcastHub.client.mirrorText = function (isMirroredX, isMirroredY) {
                if (isMirroredX && isMirroredY) {
                    textBox.css({ 'transform': 'matrix(-1, 0, 0, -1, 0, 0)' });
                }
                if (isMirroredX && !isMirroredY) {
                    textBox.css({ 'transform': 'matrix(-1, 0, 0, 1, 0, 0)' });
                }
                if (!isMirroredX && isMirroredY) {
                    textBox.css({ 'transform': 'matrix(1, 0, 0, -1, 0, 0)' });
                }
                if (!isMirroredX && !isMirroredY) {
                    textBox.css({ 'transform': 'matrix(1, 0, 0, 1, 0, 0)' });
                }
            }

            $scope.textAreaposition = textBox.scrollTop();
            
            broadcastHub.client.handPlayBack = function (textAreaposition) {
                clearInterval(animation);
                $scope.textAreaposition = textAreaposition;
                animation = setInterval(function () {
                    if (textBox.scrollTop() > 0) {
                        $scope.textAreaposition -= $scope.speedHandlPlay;
                        textBox.scrollTop($scope.textAreaposition);
                    }
                }, $scope.velocity);
            }

            broadcastHub.client.handPlay = function (textAreaposition) {
                clearInterval(animation);
                $scope.textAreaposition = textAreaposition;
                animation = setInterval(function () {
                    if (textBox.scrollTop() <= textBox.get(0).scrollHeight) {
                        $scope.textAreaposition += $scope.speedHandlPlay;
                        textBox.scrollTop($scope.textAreaposition);
                    }
                }, $scope.velocity);
            }

            broadcastHub.client.clearText = function () {
                document.getElementById("area").value = "";
            }
            
            //$scope.displayText = function () {
            //    var text = '\n';
            //    var sections = $scope.script.Sections;
            //    _.each(sections, function (section) {
            //        text += '[Section:' + section.Order + ']\n' + section.Text + '\n';
            //    });
            //    return text;
            //}

            
            broadcastHub.client.changeScreenResolution = function (screenWidth, screenHeight) {
                document.getElementById("prompterRow").setAttribute("style", "height:" + screenHeight + "px; " + "width:" + screenWidth + "px");
                document.getElementById("container").setAttribute("style", "display:table");
            }

            broadcastHub.client.moveScreen = function (paddingLeft, paddingTop) {
                var moveTo = document.getElementsByClassName("container-full");
                moveTo[0].style.paddingLeft = paddingLeft + "px";
                paddingTop += 100;
                if (paddingTop < 100) paddingTop = 100;
                moveTo[0].style.paddingTop = paddingTop + "px";
            }



            broadcastHub.client.padLeft = function(percentage) {
                $scope.leftPadding = percentage;
                $scope.$apply();
            }

            broadcastHub.client.padRight = function(percentage) {
                $scope.rightPadding = percentage;
                $scope.$apply();
            }

            broadcastHub.client.setResolution = function(resolution) {
                if (resolution == prompterResolution.Small) {
                    document.getElementById("area").width = 600;
                    resolutionMultiplier = 1;
                    broadcastHub.client.changeTextSize($scope.currentSize * resolutionMultiplier);
                }
                if (resolution == prompterResolution.Medium) {
                    document.getElementById("area").width = 800;
                    resolutionMultiplier = 1.5;
                    broadcastHub.client.changeTextSize($scope.currentSize * resolutionMultiplier);
                }
                if (resolution == prompterResolution.Large) {
                    document.getElementById("area").width = 1200;
                    resolutionMultiplier = 2;
                    broadcastHub.client.changeTextSize($scope.currentSize * resolutionMultiplier);
                }
            }

            broadcastHub.client.getPrevSection = function (length) {
                for (var i = length - 1; i >= 0; i--) {
                    if ($("#Section" + i).position().top < 0) {
                        $('#area').scrollTop($("#Section" + i).position().top + $('#area').scrollTop());
                        break;
                    }
                }
                $scope.$apply();
            }

            broadcastHub.client.getNextSection = function () {
                var i = 0;
                while ($("#Section" + i).position().top <= 1) {
                    i++;
                }
                $('#area').scrollTop($("#Section" + i).position().top + $('#area').scrollTop());
                $scope.$apply();
            }

            broadcastHub.client.scrollToSelected = function (selectedNumber) {
                $('#area').scrollTop($('#Section' + selectedNumber).position().top + $('#area').scrollTop());
                $scope.$apply();
            }

            broadcastHub.client.scrollToCurrent = function (current) {
                $('#area').scrollTop($('#Section' + current).position().top);
                $scope.$apply();
            }

	        var obj = {};
	        return obj;
        };
    }
]);