app.controller("playerController", [
    "$scope",
    "broadcastHub",
    "broadcastOperator",
    "$modal",
    "preferenceService",
    'notify',
    'notifyType',
    'icons',

    function ($scope, broadcastHub, broadcastOperator, $modal, preferenceService, notify, notifyType, icons) {

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
        var startVelocity = 24;
        var minVelocity = 6;
        var maxVelocity = 40;
        var speedStep = 2;
        var textSizeInput = 90;
        var cur = null;
        var cur2 = null;
        var textSizeStep = 5;

        $scope.textIsChanged = false;
        $scope.textSizes = [50, 55, 60, 70, 80, 90, 100, 110, 130];
        $scope.showDialog = false;
        $scope.speed = 2;
        $scope.velocity = startVelocity;
        $scope.speedIndicator = 0;
        $scope.speedHandlPlay = 10;
        $scope.currentSize = $scope.textSizes[6];
        $scope.textSize = 90;
        $scope.isPlayDisabled = false;
        $scope.isNavigateButtonShown = false;
        var mintextSize = 70;
        var maxtextSize = 110;
        $scope.screenWidth = 1140;
        $scope.screenHeight = 400;

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
        //$scope.displayText = function () {
        //    var text = '\n';
        //    var sections = $scope.$parent.selectedScript.Sections;
        //    _.each(sections, function (section) {
        //        text += '[Section:' + section.Order + ']\n' + section.Text + '\n';
        //    });
        //    return text;
        //}

        $scope.hook = function (e) {
            e = e || window.event;
            var el = (e.srcElement || e.target).parentNode.parentNode;
            cur = { 'el': el, 'x': e.clientX - el.offsetWidth, 'y': e.clientY - el.offsetHeight }
        }

        $scope.unhook = function (e) {
            if (cur) {
                cur = null;
                nx = 0;
                ny = 0;
            }

        }

        $scope.move = function (e) {
            if (!cur)
                return;
            e = e || window.event;
            with (cur) {
                if (cur.el.id == "prompterRow") {
                    var nx = e.clientX - x;
                    var ny = e.clientY - y;
                    if (nx < 1140) nx = 1140;
                    if (ny < 400) ny = 400;
                    el.style.width = nx + 'px';
                    el.style.height = ny + 'px';
                    document.getElementById("container").setAttribute("style", "height:" + ny + "px;" + "display:table;");
                    broadcastHub.server.changeScreenResolution(nx, ny);
                    $scope.screenWidth = nx;
                    $scope.screenHeight = ny;
                }
                if (cur.el.id == "container") {
                    bodyContent = document.getElementsByClassName("container body-content");
                    menu = document.getElementById("menu");
                    var nx = e.clientX - bodyContent[0].offsetLeft;
                    var ny = e.clientY - bodyContent[0].offsetTop - 100;
                    if (nx > 400) nx = 400;
                    if (ny > 400) ny = 400;
                    temp = document.getElementById("main-container");
                    temp.style.paddingLeft = nx + "px";
                    temp.style.paddingTop = ny + "px";
                    broadcastHub.server.moveScreen(nx, ny);
                }
            }
            (e.preventDefault) ? e.preventDefault() : e.returnValue = false;
        }

        $scope.importSettings = function () {
            preferenceService.importSettings($scope);
        }

        $scope.notifySuccess = function (message) {
            notify(
                         notifyType.success,
                         message,
                         icons.success);
        }

        $scope.notifyFail = function (message) {
            notify(
                            notifyType.danger,
                            message,
                            icons.warning);
        }

        $scope.exportSettings = function () {
            preferenceService.exportSettings($scope, $scope.screenWidth, $scope.screenHeight);
        }

        $scope.changeScreenResolusion = function (nx, ny) {
            broadcastHub.server.changeScreenResolution(nx, ny);
        }

        broadcastHub.client.changeScreenResolution = function (nx, ny) {
            document.getElementById("prompterRow").style.width = nx + 'px';
            document.getElementById("prompterRow").style.height = ny + 'px';
            document.getElementById("container").setAttribute("style", "height:" + ny + "px;" + "display:table;");
        }

        document.onmouseup = $scope.unhook;
        document.onmousemove = $scope.move;
        document.ondragstart = function () {
            return false;
        }

        $scope.mirrorText = function (isMirroredX, isMirroredY) {
            broadcastHub.server.mirrorText(isMirroredX, isMirroredY);
        }

        $scope.closePlayer = function () {
            setDefaultProps();
            temp = document.getElementById("main-container");
            temp.style.paddingLeft = "0px";
            temp.style.paddingTop = "0px";
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
            },  $scope.velocity);
        }


        $scope.handPlayBack = function () {
            $scope.isHandPlayDisabled = false;
            $scope.isPlayDisabled = false;
            broadcastHub.server.handPlayBack();
        }

        broadcastHub.client.handPlayBack = function () {
            clearInterval(animation);
            animation = setInterval(function () {
                if (textBox.scrollTop() > 0) {
                    textBox.scrollTop(textBox.scrollTop() - $scope.speedHandlPlay);
                }
            }, $scope.velocity);
        }

        $scope.handPlay = function () {
            $scope.isHandPlayDisabled = false;
            $scope.isPlayDisabled = false;
            broadcastHub.server.handPlay();
        }

        broadcastHub.client.handPlay = function () {
            clearInterval(animation);
            animation = setInterval(function () {
                if (textBox.scrollTop() <= textBox.get(0).scrollHeight) {
                    textBox.scrollTop(textBox.scrollTop() + $scope.speedHandlPlay);
                }
            }, $scope.velocity);
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
        var speedBtnClicked = false;

        $scope.speedUp = function () {
            if ($scope.velocity > minVelocity && !speedBtnClicked) {
                speedBtnClicked = true;
                broadcastHub.server.speedUp();
                $scope.speedIndicator++;
                setTimeout(function () { speedBtnClicked = false; }, 500);
            }
        }

        broadcastHub.client.speedUp = function () {
            clearInterval(animation);
            $scope.velocity -= speedStep;
        }

        $scope.speedDown = function () {
            if ($scope.velocity < maxVelocity && !speedBtnClicked) {
                speedBtnClicked = true;
                broadcastHub.server.speedDown();
                $scope.speedIndicator--;
                setTimeout(function () { speedBtnClicked = false; }, 500);
            }
        }

        broadcastHub.client.speedDown = function () {
            clearInterval(animation);
            $scope.velocity += speedStep;
        }

        $scope.padRight = function (percentage) {
            broadcastHub.server.padRight(percentage);
        }

        $scope.padLeft = function (percentage) {
            broadcastHub.server.padLeft(percentage);
        }

        $scope.changeTextSize = function () {
            broadcastHub.server.changeTextSize($scope.textSizeInput);
        }

        broadcastHub.client.changeTextSize = function (size) {
            $scope.textSize = size;
            $scope.$apply();
        }

        $scope.changeSpeed = function (speed) {
            broadcastHub.server.changeSpeed(speed);
        }

        broadcastHub.client.changeSpeed = function (speed) {
            $scope.velocity = speed;
            $scope.speedIndicator = (startVelocity - $scope.velocity)/2;
        }

        $scope.textSizeUp = function () {
            broadcastHub.invoke('textSizeUp');
        }

        broadcastHub.client.textSizeUp = function () {
            if ($scope.textSize < maxtextSize) {
                $scope.textSize += textSizeStep;
                $scope.$apply();
            }
        }

        $scope.textSizeDown = function () {
            broadcastHub.invoke('textSizeDown');
        }

        broadcastHub.client.textSizeDown = function () {
            if ($scope.textSize > mintextSize) {
                $scope.textSize -= textSizeStep;
                $scope.$apply();
            }
        }

        $scope.getNextSection = function () {
            var i = 0;
            while ($("#Section" + i).position().top <= 1) {
                i++;
            }
            $('#area').scrollTop($("#Section" + i).position().top + $('#area').scrollTop());
            broadcastHub.server.getNextSection();
        }

        $scope.getPrevSection = function () {
            var length = $scope.$parent.selectedScript.Sections.length;
            for (var i = length - 1; i >= 0; i--) {
                if ($("#Section" + i).position().top < 0) {
                    $('#area').scrollTop($("#Section" + i).position().top + $('#area').scrollTop());
                    break;
                }
            }
            broadcastHub.server.getPrevSection(length);
        }

        $scope.scrollToSelected = function (selectedNumber) {
            $('#area').scrollTop($('#Section' + selectedNumber).position().top + $('#area').scrollTop());
            broadcastHub.server.scrollToSelected(selectedNumber);
        }

        $scope.getCurrentSection = function () {
            var i = 0;
            while ($("#Section" + i).position().top <= 1) {
                i++;
            }
            return i;
        }

        $scope.scrollToCurrent = function (current) {
            broadcastHub.server.scrollToCurrent(current);
        }

        broadcastHub.client.scrollToCurrent = function (current) {
            $('#area').scrollTop($('#Section' + current).position().top);
          }

    }]);
