var app = angular.module('app', ['ngRoute']);


app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'tmpl/home.html',
            controller: 'main'
        })
});


app.controller('main', function($scope, $filter, tasks) {
    $scope.title = 'Angular Todo'
    $scope.tasks = tasks.all;

    $scope.$watch('cate', function(v) {
        $scope.$broadcast('showEvent', v)
    });


    $scope.add = function($event) {
        if ($scope.newTodo && $event.keyCode == 13) {
            tasks.add({ content: $scope.newTodo, done: false });
            $scope.newTodo = '';
            $scope.cate = 'all'
        }
    }

    $scope.deleteDone = function() {
        $scope.$broadcast('deleteDoneEvent')
    }
})
app.directive('task', function() {
    return {
        restrict: 'AE',
        templateUrl: 'tmpl/task.html',
        replace: true,
        scope: {
            todo: "=",
            index: "@"
        },
        controller: function($scope, $element, $attrs, tasks) {
            var oldTodo = angular.copy($scope.todo)
            $scope.edit = function(done) {
                if (done) return;
                $scope.editing = true;
                setTimeout(function() {
                    angular.element($element).find('input')[1].focus()
                }, 0)

            }
            $scope.delete = function() {
                tasks.delete($scope.todo)
            }
            $scope.save = function($event) {
                if ($event.keyCode == 13) {
                    angular.element($element).find('input')[1].blur()

                    if ($scope.todo.content) {
                        tasks.edit(oldTodo, $scope.todo)
                    } else {
                        tasks.delete(oldTodo)
                    }
                }
            };
            $scope.$on('showEvent', function(event, cate) {
                if (cate == 'done') {
                    $scope.isShow = $scope.todo.done ? true : false
                } else if (cate == 'undone') {
                    $scope.isShow = !$scope.todo.done ? true : false
                } else {
                    $scope.isShow = true
                }
            });

            $scope.$watch('todo.done', function(v) {
                var cate = $scope.$parent.cate
                if (cate == 'done') {
                    $scope.isShow = $scope.todo.done ? true : false
                } else if (cate == 'undone') {
                    $scope.isShow = !$scope.todo.done ? true : false
                } else {
                    $scope.isShow = true
                }
                tasks.save()
            });

            $scope.$on('deleteDoneEvent', function() {
                if ($scope.todo.done) {
                    $scope.delete()
                }
            });

        }
    }
});
