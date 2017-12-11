angular.module('app', [])
    .controller('TodoController', function($scope, $http) {
        $scope.todos = [];
        $scope.todo = {};
        $http.get('/todo').success(function(data) {
            $scope.todos = data;
        });
        $scope.addTodo = function() {
            $http.post('/todo', $scope.todo).success(function(data) {
                $scope.todos.unshift()
            });
            $scope.todo = {};
        };
    });