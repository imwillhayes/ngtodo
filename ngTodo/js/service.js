var app = app || angular.module('app');

app.factory('tasks', function() {
    var data = JSON.parse(localStorage.getItem('TODO')) || [{
            content: '理发',
            done: false
        }, {
            content: '洗衣服',
            done: false
        }, {
            content: '买东西',
            done: false
        }, {
            content: '吃饭',
            done: true
        }, {
            content: '上网',
            done: true
        }

    ];

    return {
        all:data,
        delete:function(todo){
            data.splice(data.indexOf(todo),1)
            this.save()
        },
        add:function(todo){
            data.unshift(todo)
            this.save()
        },
        edit:function(oldTodo,newTodo){
            data[data.indexOf(oldTodo)]=newTodo
            this.save()
        },
        save:function(){
            localStorage.setItem('TODO',JSON.stringify(data))
        }
    }

})
