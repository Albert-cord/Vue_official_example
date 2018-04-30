Vue.component('demotable', {
    template: '#demo-grid',

    props: {
        data: Array,
        columns: Array,
        filterKey: String,
    },

    data: function () {
        let sortOrders = {}
        this.columns.forEach(function (key) {
            sortOrders[key] = 1
        })
        return {
            sortKey: '',
            sortOrders: sortOrders,
        }
    },

    computed: {
        filteredData: function () {
            // let a, b
            let sortKey = this.sortKey
            let filterKey = this.filterKey && this.filterKey.toLowerCase()
            let order = this.sortOrders[sortKey] || 1
            let data = this.data
            if(filterKey) {
                data = data.filter (function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                    })
                })
            }

            if(sortKey){
                data = data.slice().sort(function (a, b) {
                    a = a[sortKey]
                    b = b[sortKey]
                    return (a === b ? 0 : a > b ? 1 : -1) * order
                })
            }

            return data
        }
    },

    filters: {
        capitalize: function (string) {
            let str = string
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    },


    methods: {
        sortBy: function (key) {
            this.sortKey = key
            this.sortOrders[key] *= -1
        }
    }
})

var demo = new Vue({
    el: '#demo',
    data: {
        queryString: '',
        gridColumns: ['name', 'power'],
        gridData: [
            { name: 'Chuck Norris', power: Infinity },
            { name: 'Bruce Lee', power: 9000 },
            { name: 'Jackie Chan', power: 7000 },
            { name: 'Jet Li', power: 8000 }
        ],
    },


})
// demo()
