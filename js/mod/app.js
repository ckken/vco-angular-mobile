var G = {};
var app = angular.module('VCO', ['ngRoute', 'hmTouchEvents', 'shoppinpal.mobile-menu'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.when('/activity', { templateUrl: 'view/activity.html', controller: 'activityCtrl'});
        //$routeProvider.when('/activitydetail/:id', { templateUrl: 'view/activitydetail.html', controller: 'activitydetailCtrl'});
        $routeProvider.when('/news', { templateUrl: 'view/news.html', controller: 'newsCtrl'});
        //$routeProvider.when('/newsdetail/:id', { templateUrl: 'view/newsdetail.html', controller: 'newsdetailCtrl'});
        $routeProvider.when('/brand', { templateUrl: 'view/brand.html', controller: 'brandCtrl'});
        //$routeProvider.when('/branddetail/:id', { templateUrl: 'view/branddetail.html', controller: 'branddetailCtrl'});

        $routeProvider.otherwise({
            redirectTo: '/activity'
        });
        $locationProvider.html5Mode(false).hashPrefix('!');

        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;

        //Remove the header containing XMLHttpRequest used to identify ajax call
        //that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }])
    .run(['$rootScope', '$route', '$http', '$location', '$anchorScroll', '$window', '$timeout', '$templateCache', '$routeParams', 'apiService', '$spMenu', function ($rootScope, $route, $http, $location, $anchorScroll, $window, $timeout, $templateCache, $routeParams, apiService, $spMenu) {

        $rootScope.G = {
            activity: '',
            news: '',
            brand: '',
            action: '',
            popbox: 0
        }

        $rootScope.actionDetail = {
            name:'',
                id:-1,
        }

        $rootScope.alerts = new Array();
        $rootScope.alert = {
            title: '',
            content: ''
        }
        $rootScope.addAlert = function (alert) {
            $rootScope.alerts.push(alert);
        }
        $rootScope.removeAlert = function (index,removePopbox) {
            $rootScope.alerts.splice(index, 1);
            if(removePopbox)$rootScope.G.popbox = 0;
        }

        $rootScope.$on('$routeChangeStart', function (next, current) {
            $rootScope.goToIndex = -1;
            $rootScope.G.popbox = 1;

        });

        $rootScope.$on('$routeChangeSuccess', function (next, current) {
            $rootScope.navPath = $location.path();
            $rootScope.G.popbox = 0;
        });


        $rootScope.loadMoreClass = '';
        $rootScope.loadmore = function (obj) {
            $rootScope.loadMoreClass = 'load';
            apiService.get(obj, function (data) {
                angular.forEach(data, function (v) {
                    $rootScope.G[obj].push(v);
                })
                if (data.length > 0) {
                    $rootScope.loadMoreClass = '';
                } else {
                    $rootScope.loadMoreClass = 'finish';
                }

            })
        }

        //缓存所有页面
        angular.forEach($route.routes, function (r) {
            if (r.templateUrl) {
                $http.get(r.templateUrl, {cache: $templateCache});
            }
        });


        /*        $rootScope.go = function(a,back){
         if(back){
         if(angular.isFunction($window.history.goback)){
         $window.history.goback();
         }else{
         $location.path(a);
         }
         $rootScope.gobackStatus=1;
         }else{
         $location.path(a);
         $rootScope.gobackStatus = 0;

         }
         //$rootScope.addAlert({title:'加载中',content:'正在为你加载内容 请稍后......'});
         }*/

        /*        $rootScope.go = function(a,back){
         if(back){
         //$window.alert(back);
         */
        /*if(angular.isFunction($window.history.goback)){
         $window.history.goback();
         //$location.hash('s'+$rootScope.goToIndex);
         }else{
         //$location.path(a).hash('s'+$rootScope.goToIndex);
         $location.path(a);
         }*/
        /*
         //$location.path(a).hash('s'+$rootScope.goToIndex);
         $location.path(a);
         $rootScope.gobackStatus=1;
         //$location.hash('s'+$rootScope.goToIndex);
         }else{
         $location.path(a);
         $rootScope.goToIndex=-1;
         $rootScope.gobackStatus = 0;
         //$location.hash('');
         }
         //$rootScope.navPath = $location.path();
         }*/


        //导航函数
        $rootScope.MenuGo = function (url) {
            $spMenu.toggle();
            $location.path(url);
        }

        $rootScope.go = function (url) {
            $location.path(url);
        }

        $rootScope.goback = function (url) {
            if (angular.isFunction($window.history.goback)) {
                $window.history.goback();
            } else {
                $location.path(url);
            }
        }

        $rootScope.swipeLeft = function (action,$index) {
            $rootScope.actionDetail.name = action;
            $rootScope.actionDetail.id = $index;
            var el = angular.element(document.querySelector('#swipe-left'));
            el.addClass('active');
            //var str = '<div getid="'+$index+'" action="'+action+'" get-detail></div>';
            //el.html(str);
        }

        $rootScope.swipeLeftBack = function(){
            var el = angular.element(document.querySelector('#swipe-left'));
            el.removeClass('active');
            $rootScope.delayLoadMenu =1;
            $timeout(function(){
                $rootScope.delayLoadMenu=0;
            },100)
        }
        $rootScope.toggleMenu=function(){

            if(!$rootScope.delayLoadMenu){
                $spMenu.toggle();
            }
        }

    }]);


/*app.animation('.slide-animate', function($rootScope,$location) {
 return {
 enter: function(element, done) {
 var SlideClassName =($rootScope.gobackStatus)?'slide-animate-view-r':'slide-animate-view';
 element.addClass(SlideClassName);
 return function(cancelled) {
 element.removeClass(SlideClassName);
 }
 },
 leave: function(element, done) {
 var SlideClassName =($rootScope.gobackStatus)?'slide-animate-view-r':'slide-animate-view';
 element.addClass(SlideClassName);
 done();
 }
 }
 });*/


