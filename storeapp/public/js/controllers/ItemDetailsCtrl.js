/**
 * Created by Вася on 12.01.2016.
 */
app.controller('ItemDetailsCtrl',['$http','$scope','$routeParams','Items','$window', function($http,$scope,$routeParams,Items,$window){
    $http.get('/items/'+ $routeParams.id).success(function(data){
        $scope.item = data;
    });
    $scope.deleteItem = function(){
        $window.location.href='/';
        $http.delete('/'+ $routeParams.id).succes(function(){
            console.log('I deleted an item!');
        });
    };
    $scope.back = function(){
        $window.location.href='/';
    };
}]);