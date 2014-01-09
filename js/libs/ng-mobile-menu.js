angular.module('shoppinpal.mobile-menu', [])
    .run(['$rootScope', '$spMenu', function($rootScope, $spMenu){
        $rootScope.$spMenu = $spMenu;
    }])
    .provider("$spMenu", function(){
        this.$get = [function(){
            var menu = {};

            menu.show = function show(){
                var menu = angular.element(document.querySelector('#sp-nav'));
                menu.addClass('show');
                var page = angular.element(document.querySelector('#sp-page'));
                page.addClass('aside');
            };

            menu.hide = function hide(){
                var menu = angular.element(document.querySelector('#sp-nav'));
                menu.removeClass('show');
                var page = angular.element(document.querySelector('#sp-page'));
                page.removeClass('aside');
            };

            menu.toggle = function toggle() {
                var menu = angular.element(document.querySelector('#sp-nav'));
                menu.toggleClass('show');
                var page = angular.element(document.querySelector('#sp-page'));
                page.toggleClass('aside');
            };

            var options = {
                // factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
                transform_min_scale     : 0.1,
                transform_min_rotation  : 2,
                drag_block_horizontal   : true,
                tap_always              : false
            };


            return menu;
        }];
    });