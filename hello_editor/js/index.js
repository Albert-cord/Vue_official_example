
new Vue({
    el: '.editor',
    data: {
        input: '#hello'
    },
    computed: {
        marked: function () {
            return this.input
        }
    },
    methods: {
        update: function (event) {
            this.input = event.target.value
        }
    }
})
