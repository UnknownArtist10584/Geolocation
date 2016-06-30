var app = angular.module('myApp', []);

app.controller('myAppController', function($scope) {
  $scope.newTodo = '';

  // Initialize todo array
  $scope.todos = ['Learn Angular', '???', 'Profit!'];

  // Remove todo
  $scope.done = function(todo) {
    var indexOf = $scope.todos.indexOf(todo);
    if (indexOf !== -1)  {
      $scope.todos.splice(indexOf, 1);
    }
  };

  // Add todo
  $scope.addTodo = function(e) {
    if(e.which && e.which === 13) {
      $scope.todos.push($scope.newTodo);
      $scope.newTodo = '';
    }
  }
} );
