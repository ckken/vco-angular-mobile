app.controller('activityCtrl', ['$scope', '$rootScope', '$http', 'apiService', '$location', '$anchorScroll', '$timeout',
        function ($scope, $rootScope, $http, apiService, $location, $anchorScroll, $timeout) {
            if ($rootScope.G.activity == '') {
                apiService.get('activity', function (data) {
                    $rootScope.G.activity = data;
                })
            }
            $rootScope.G.action = 'activity';
        }])
/*    .controller('activitydetailCtrl', ['$scope', '$rootScope', '$http', 'apiService', '$routeParams',
        function ($scope, $rootScope, $http, apiService, $routeParams) {

            $scope.vo = {};
            if ($rootScope.G.activity == '') {
                apiService.get('activity', function (data) {
                    $scope.vo = data[$routeParams.id];
                })
            } else {
                $scope.vo = $rootScope.G.activity[$routeParams.id];
            }

            $rootScope.goToIndex = $routeParams.id;
            $rootScope.G.action = 'activity';
        }])*/

    .controller('newsCtrl', ['$scope', '$rootScope', '$http', 'apiService', '$location', '$anchorScroll', '$timeout',
        function ($scope, $rootScope, $http, apiService, $location, $anchorScroll, $timeout) {
            if ($rootScope.G.news == '') {
                apiService.get('news', function (data) {
                    $rootScope.G.news = data;
                })
            }
            $rootScope.G.action = 'news';
        }])
/*    .controller('newsdetailCtrl', ['$scope', '$rootScope', '$http', 'apiService', '$routeParams',
        function ($scope, $rootScope, $http, apiService, $routeParams) {

            $scope.vo = {};
            if ($rootScope.G.news == '') {
                apiService.get('news', function (data) {
                    $scope.vo = data[$routeParams.id];
                })
            } else {
                $scope.vo = $rootScope.G.news[$routeParams.id];
            }
            $rootScope.goToIndex = $routeParams.id;
            $rootScope.G.action = 'news';
        }])*/
    .controller('brandCtrl', ['$scope', '$rootScope', '$http', 'apiService', '$location', '$anchorScroll', '$timeout',
        function ($scope, $rootScope, $http, apiService, $location, $anchorScroll, $timeout) {
            if ($rootScope.G.brand == '') {
                apiService.get('brand', function (data) {
                    $rootScope.G.brand = data;
                })
            }
            $rootScope.G.action = 'brand';
        }])
/*
    .controller('branddetailCtrl', ['$scope', '$rootScope', '$http', 'apiService', '$routeParams',
        function ($scope, $rootScope, $http, apiService, $routeParams) {

            $scope.vo = {};
            if ($rootScope.G.brand == '') {
                apiService.get('brand', function (data) {
                    $scope.vo = data[$routeParams.id];
                })
            } else {
                $scope.vo = $rootScope.G.brand[$routeParams.id];
            }
            $rootScope.goToIndex = $routeParams.id;
            $rootScope.G.action = 'brand';
        }])*/
