app.service('apiService', ['$http','$rootScope', function ($http,$rootScope) {

    $rootScope.getPage = [];
        this.get = function(action,cb){
            if(angular.isUndefined($rootScope.getPage[action])){
                $rootScope.getPage[action] = 0;
            }else{
                $rootScope.getPage[action] = $rootScope.getPage[action] +1;
            }
            $rootScope.G.popbox = 1;
            $rootScope.addAlert({title:'加载中',content:'正在为你加载内容 请稍后......',close:1});
            $http.get(api(action)).success(function(data) {
                cb(data);
                $rootScope.G.popbox = 0;
                $rootScope.removeAlert(0);

            });
        }
    var api = function(a){

        return 'http://www.hongyuecn.net/?g=mobile&m=api&a='+a+'&page='+$rootScope.getPage[a];
        //return 'data/'+a+'.json';
    }

}])
/*    .service('newsService', ['$http', function ($http) {

    }])
    .service('brandService', ['$http', function ($http) {

    }])*/

