/**
 * Created by ken.xu on 13-12-16.
 */

app.directive('voContent', ['$timeout', 'dateFilter', function ($timeout, dateFilter) {
        return function (scope, element, attrs) {

            element.addClass('ng-binding').data('$binding', attrs.voContent);//绑定html内容

            scope.$watch(attrs.voContent, function voContentWatchAction(value) {
                element.html(value);
                var obj = element.find('table').attr('width', '').attr('height', '').attr('style', '');

                /*angular.forEach(obj,function(k,v){
                 */
                /*var w= v.width();
                 if(w>320){
                 v.style.width="100%";
                 }*/
                /*

                 })*/
            });


        }
    }])

/*    .directive("navTo", ['$route', '$location', function ($route, $location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                Hammer(element[0]).on("tap", function () {
                    var path = attrs['navTo'];
                    var navDirect = attrs['navDirect'];
                    scope.$apply(function () {
                        $location.path(path);
                    });

                })
            }
        }
    }])*/

/*    .directive("menuNavTo", ['$route', '$location', '$spMenu', function ($route, $location, $spMenu) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                Hammer(element[0]).on("tap", function () {
                    var path = attrs['menuNavTo'];
                    $spMenu.toggle();
                    scope.$apply(function () {
                        $location.path(path);
                    });

                })
            }
        }
    }])*/

    .directive('scrollable', ['$route','$timeout','$rootScope', function ($route,$timeout,$rootScope) {
        var scrollCache = {};
        return {
            restrict: 'EA',
            link: function (scope, elm, attrs) {
                var route = $route.current ? $route.current.$$route : {};
                var template = route.originalPath;
                //var template = route.templateUrl || route.template;
                var rawElm = elm[0];

                //On scope creation, see if we remembered any scroll for this templateUrl
                //If we did, set it
                if (template) {
                    //Set oldScroll after a timeout so the page has time to fully load
                    $timeout(function () {
                        var oldScroll = scrollCache[template];
                        if (oldScroll) {
                            rawElm.scrollTop = oldScroll;
                        }
                    });

                    scope.$on('$destroy', function () {
                        scrollCache[template] = rawElm.scrollTop;
                    });
                }
            }
        };
    }])


    .directive("dragBox", ['$document', function ($document) {
        return{
            restrict: 'A',
            link: function (scope, element, attrs) {
                Hammer(element[0]).on("release dragleft dragright swipeleft swiperight", function (ev) {
                    ev.gesture.preventDefault();
                    var bodywidth = $document[0].body.clientWidth;

                    switch (ev.type) {
                        /*case 'dragright':
                         case 'dragleft':
                         setContainerOffset(ev.gesture.deltaX,1);
                         break;*/
                        case 'dragleft':
                        case 'swipeleft':
                            next();
                            ev.gesture.stopDetect();
                            break;
                        case 'dragright':
                        case 'swiperight':
                            prev();
                            ev.gesture.stopDetect();
                            break;

                        case 'release':
                            // more then 50% moved, navigate
                            if (Math.abs(ev.gesture.deltaX) > bodywidth / 2) {
                                if (ev.gesture.direction == 'right') {
                                    prev();
                                } else {
                                    next();
                                }
                            }
                            break;
                    }

                    function prev() {
                        element.addClass("aside");
                    }

                    function next() {
                        element.removeClass("aside");
                    }

                    /*function setContainerOffset(percent,animate) {
                     element.removeClass("animate");
                     if(animate) {
                     element.addClass("animate");
                     }
                     //element.css({"transform": "translateX("+ percent +"px)"});
                     //element.style.transform="translateX("+ percent +"px)";
                     // element.set('transform', "translateX("+ percent +"px)");
                     }*/

                })
            }
        }
    }])

    .directive('getDetail', ['apiService','$rootScope', function (apiService,$rootScope) {

        return {
            template: '<div ng-include="templatePathOfItem"></div>',

            link: function ($scope, elm, attrs) {

                /*$scope.actionDetail.name = action;
                $scope.actionDetail.id = $index;
                 $scope.vo = {};
                if ($scope.G.news == '') {
                    apiService.get(attrs.action, function (data) {
                        $scope.vo = data[attrs.getid];
                    })
                } else {
                    $scope.vo = $scope.G.news[attrs.getid];
                }
                $scope.goToIndex = attrs.getid;
                $scope.G.action = attrs.action;*/

                $scope.$watch('actionDetail.id',function(id){
                    if(id>-1){
                        if ($rootScope.G[$scope.actionDetail.name] == '') {
                            apiService.get(attrs.action, function (data) {
                                $scope.vo = data[id];
                            })
                        } else {
                            $scope.vo = $rootScope.G[$scope.actionDetail.name][id];
                        }
                        $scope.templatePathOfItem = 'view/' + $scope.actionDetail.name + 'detail.html';
                    }
                })



                //var el = angular.element(document.querySelector('#swipe-left'));
                //el.addClass('active')
            }
        };
    }])


