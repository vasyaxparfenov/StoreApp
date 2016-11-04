/**
 * Created by Вася on 12.01.2016.
 */

app.controller('StoreCtrl',['$scope','Items', function($scope, Items){
    Items.success(function(data){
        console.log("I got data!");
        $scope.items = data;});
}]);