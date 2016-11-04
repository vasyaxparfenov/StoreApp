/**
 * Created by Вася on 12.01.2016.
 */
app.controller('EditCtrl',['$http','$scope','$routeParams','Items','$window',function($http,$scope,$routeParams,Items,$window){
    $http.get('/items/'+ $routeParams.id).success(function(data){
        $scope.item = data;
    });
    $scope.edit = function(){
        $http.put('/items/'+ $routeParams.id, $scope.item).success(function(){
            $window.location.href = '/#/'+ $routeParams.id;
        });
    }
}]);