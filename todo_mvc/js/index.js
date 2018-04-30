
Vue.config.devtools = true
let log = console.log.bind()
let TODOS_STORAGE = 'todos-vuejs2.0'
let todosStorage = {
    fetch: function () {
        let todos = JSON.parse(localStorage.getItem('TODOS_STORAGE')) || []
        todos.forEach(function (todo, index) {
            todo.id = index
            todo.editTodoStatu = false
            // todo.editTodoValue = ''
        })
        todosStorage.uid = todos.length || 0
        return todos
    },

    save: function (todos) {
        localStorage.setItem('TODOS_STORAGE', JSON.stringify(todos))
        // log('length', localStorage.TODOS_STORAGE.length)
    }
}
// localStorage.clear()
// let uid = 0

filter = {
    All: function (todos) {
        return todos
    },

    Complete: function (todos) {
        return todos.filter(function (todo) {
            return todo.complete
        })
    },

    Active: function (todos) {
        return todos.filter(function (todo) {
            return !todo.complete
        })
    },

}


// Vue.use(VueRouter)

var todoDemo = new Vue({
    // router,
    el: '.todo-demo',
    data: {
        todos: todosStorage.fetch() || [],
        visibility: 'All',
        newTodo: '',
        editTodoValue: null,

        // beforeEditCache: null,

    },
    watch: {
        todos: {
            handler: function (todos) {
                todosStorage.save(todos)
                // log('localStorage', localStorage.TODOS_STORAGE)
            },
            deep: true,
        }
    },

    computed: {
        filterTodos: function () {
            return filter[this.visibility](this.todos)
        },

        remaining: function () {
            return filter['Active'](this.todos).length
        },

        allDone: {

            get: function () {

                return this.remaining === 0
            },

            set: function (value) {
                this.filterTodos.forEach(function (todo) {
                    todo.complete = value
                })
            }
        },

    },

    filters: {
        isplurality: function (remaining) {
            return remaining > 1 ? 'items' : 'item'
            }
        },

    methods: {
        addTodo: function (todo) {
            let value = this.newTodo && this.newTodo.trim()
            if(!value) { return }
            // console.log('filterTodos', this.filterTodos)
            this.todos.push({value: value,
                id: todosStorage.uid++,
                complete: false,
                // editTodoStatu: false,
            })
            this.newTodo = ''
        },

        cancelAdd: function () {
            this.newTodo = ''
        },

        removeTodo: function (todo) {
            // this.filterTodos.splice(this.filterTodos.map(function (todo) {
            //     todo.id === index
            // }), 1)
            log('removeTodo', todo)
            this.todos.splice(this.todos.indexOf(todo), 1)
        },

        editTodo: function (todo) {
            this.beforeEditCache = todo
            this.editTodoValue = todo.value
            // todo.editTodoValue = todo.value
            todo.editTodoStatu = true

        },

        doneEdit: function (todo) {
            if(!this.editTodoValue){
                return
            }
            todo.value = this.editTodoValue.trim()
            this.editTodoValue = null
            // todo.editTodoValue = null
            if(!todo.value){
                this.removeTodo(todo)
            }
            todo.editTodoStatu = false

        },

        cancelEdit: function (todo) {
            todo = this.beforeEditCache
            log('cancelEdit todo', todo, this.beforeEditCache)
            todo.editTodoStatu = false

        },

        removeComplete: function () {
            let self = this
            // log('filterTodos', this.filterTodos)
            // this.filterTodos.forEach(function (todo) {
            //     log('todo', todo)
            //     if(todo.complete == true){
            //         // 这里如果这样跑，程序会在删除todo的时候更新filterTodos,
            //         // 导致这里的filterTodos不会全部跑完
            //         // self.filterTodos.splice(self.filterTodos.indexOf(todo), 1)
            //         )
            //     }
            // })
            filter['Complete'](this.filterTodos).forEach(function (todo) {
                self.removeTodo(todo)
                // self.todos.splice(self.todos.indexOf(todo), 1)
            })
        },


    },

    directives: {
        'todo-focus': function (element, bind) {
            log('bind', bind.value)
            if(bind.value){
                element.focus()
            }
        }
    }
})

function onHashChange() {
    let visibility = window.location.hash.replace(/#\/?/, '')
    if(filter[visibility]){
        todoDemo.visibility = visibility
    } else {
        window.location.hash = ''
        todoDemo.visibility = 'All'
    }
}
window.addEventListener('hashchange', onHashChange)
onHashChange()

// todoDemo.$mount('.todo-demo')
