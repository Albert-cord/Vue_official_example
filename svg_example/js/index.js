Vue.config.devtools = true
let stats = [
  { label: 'A', value: 100 },
  { label: 'B', value: 100 },
  { label: 'C', value: 100 },
  { label: 'D', value: 100 },
  { label: 'E', value: 100 },
  { label: 'F', value: 100 }
]

function valueToPoint(value, index, total) {
    let circleX = 100,
        circleY = 100,
        y = -value,
        angle = Math.PI * 2 / total * index,
        cos = Math.cos(angle),
        sin = Math.sin(angle),
        tx = -y * cos + circleX,
        ty = +y * sin + circleY
        return {
            x: tx,
            y: ty,
        }
}

Vue.component('polygraph', {
    template: '#polygraph-template',
    props: {
        stats: Array,
    },

    // data: function () {
    //     return {
    //
    //     }
    // }
    computed: {
        points: function () {
            let total = this.stats.length
            return this.stats.map(function (stat, index) {
                let point = valueToPoint(stat.value, index, total)
                return point.x + ',' + point.y
            }).join(' ')
        }
    },

    components: {
        'axis': {
            template: '#axis-template',
            props:{
                stat: Object,
                index: Number,
                total: Number,
            },

            computed: {
                point: function () {
                    return valueToPoint(+this.stat.value, this.index, this.total)
                }
            }
        }
    }

})
new Vue({
    el: '#svg',
    data: {
        stats: stats,
        newLabel: '',
    },

    methods: {
        remove: function (stat) {
            if(this.stats.length > 3){
                this.stats.splice(this.stats.indexOf(stat), 1)
            } else {
                alert('Can\'t delete more!')
            }
        },

        add: function (event) {
            event.preventDefault()
            if(!this.newLabel) { return }
            this.stats.push({
                label: this.newLabel,
                value: 100
            })
            this.newLabel = ''
        },

    }
})
