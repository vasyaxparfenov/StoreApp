/**
 * Created by Вася on 12.01.2016.
 */

app.controller('AddItemCtrl',['$scope','$http','$window', function($scope,$http,$window){
    $scope.addItem = function(){
        $http.post('/additem',$scope.item).success(function(res){
            console.log("I send data!");
            $scope.item = '';
        });
        $window.location.href='/';
    };
}]);