

Vue.component('itemtree', {
    template: '#item',
    props: {
        model: Object,
    },

    data: function () {
        return {
            // isFolder: Boolean,
            open: false,
        }
    },

    computed: {
        isFolder: function () {
            return Boolean(this.model.children && this.model.children.length)
        }
    },

    methods: {
        toggle: function () {
            if(this.isFolder){
                this.open = !this.open
            }
        },

        changeType: function () {
            if(!this.isFolder){
                Vue.set(this.model, 'children', [])
                this.addChild()
                this.open = true
            }
        },

        addChild: function () {
            this.model.children.push({name: 'new stuff'})
        },
    }
})
Vue.config.devtools = true;
let modelData = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
}
var demo = new Vue({
    el: '#demo',
    data: {
        treeData: modelData,
    },
})
