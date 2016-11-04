/**
 * Created by Вася on 12.01.2016.
 */

angular
    .module('app')
    .factory('Items',['$http', function($http){
        return $http.get('/items');
    }]);

