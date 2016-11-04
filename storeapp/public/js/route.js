/**
 * Created by Вася on 12.01.2016.
 */
angular
    .module('app')
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl:'../view/main.html',
                controller:'StoreCtrl'
            })
            .when('/addimage',{
                templateUrl:'../view/addimage.html',
                controller:'AddItemCtrl'
            })
            .when('/:id',{
                templateUrl:'../view/details.html',
                controller:'ItemDetailsCtrl'
            })
            .when('/edit/:id',{
                templateUrl:'../view/edit.html',
                controller:'EditCtrl'
            })
            .otherwise({ redirectTo: '/' });
    }]);