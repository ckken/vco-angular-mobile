app.controller('activityCtrl', ['$scope', '$rootScope', '$http', 'apiService', '$location', '$anchorScroll', '$timeout',
        function ($scope, $rootScope, $http, apiService, $location, $anchorScroll, $timeout) {
            if ($rootScope.G.activity == '') {
                apiService.get('activity', function (data) {
                    $rootScope.G.activity = data;
                })
            }




            $rootScope.G.action = 'activity';
        }])


    .controller('newsCtrl', ['$scope', '$rootScope', '$http', 'apiService', '$location', '$anchorScroll', '$timeout',
        function ($scope, $rootScope, $http, apiService, $location, $anchorScroll, $timeout) {
            if ($rootScope.G.news == '') {
                apiService.get('news', function (data) {
                    $rootScope.G.news = data;
                    $rootScope.reflashiScroll();
                    $scope.addLisenterScroll();
                })
            }
            $rootScope.G.action = 'news';


            //iscroll



            $scope.addLisenterScroll = function(){


                $scope.$parent.myScroll[$rootScope.G.action].on('scrollEnd', function(){
                    var _S = this;
                    $timeout(function(){
                        if(_S.maxScrollY==_S.y){
                            $scope.loadMoreItem($rootScope.G.action);
                        }
                    },1000)

                });
            }

            $scope.loadMoreItem = function(obj){
                apiService.get(obj, function (data) {
                    angular.forEach(data, function (v) {
                        $rootScope.G[obj].push(v);
                    })
                    $rootScope.reflashiScroll();
                })
            }

            $rootScope.reflashiScroll = function(){
                $timeout(function(){
                    $scope.$parent.myScroll[$rootScope.G.action].refresh();
                },10);
            }



        }])

    .controller('brandCtrl', ['$scope', '$rootScope', '$http', 'apiService', '$location', '$anchorScroll', '$timeout',
        function ($scope, $rootScope, $http, apiService, $location, $anchorScroll, $timeout) {
            if ($rootScope.G.brand == '') {
                apiService.get('brand', function (data) {
                    $rootScope.G.brand = data;
                })
            }
            $rootScope.G.action = 'brand';
        }])
