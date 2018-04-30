let apiUrl = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='

new Vue({
    el: '.demo',
    data: {
        branches: ['master', 'dev'],
        commits: 'master',
        currentBranch: 'master',
    },

    created: function () {
        this.fetchData()
    },

    watch: {
        currentBranch: 'fetchData',
    },

    filters: {
        truncate: function (value) {
            let newLine = value.indexOf('\n')
            console.log(newLine, value, value.slice(0, newLine))

            return newLine > 0 ? value.slice(0, newLine) : value
        },
        formatDate: function (value) {
            return value.replace(/T|Z/g, '  ')
        },
    },

    methods: {
        fetchData: function () {
            let xhr = new XMLHttpRequest()
            let self = this
            xhr.open('GET', apiUrl + self.currentBranch)

            xhr.onload = function () {
                self.commits = JSON.parse(xhr.responseText)
                console.log(self.commits[0].html_url)
            }

            xhr.send()
        }
    }
})
