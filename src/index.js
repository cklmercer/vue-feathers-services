function plugin(Vue, feathers)  {

    if (plugin.installed) {
        return
    }

    // Define a property to grant easy acces to the feathers application from Vue component instances
    Object.defineProperty(Vue.prototype, '$api', {
        get() {
            return feathers
        }
    })

    Vue.mixin({
        
        beforeCreate() {
            registerServices(this)
        },

        init() {
            registerServices(this)
        }

    })
}

function registerServices(vm) {
    
    let services = vm.$options.services

    if (typeof services !== 'object') {
        return
    }

    let dataIsFn = typeof vm.$options.data === 'function'
    let data = dataIsFn ? vm.$options.data() : vm.$options.data

    if (typeof data === 'undefined') {
        data = {}
    }

    for (var service in services) {
        data[service] = vm.$api.service(services[service])
    }

    vm.$options.data = function () { return data }
}

export default plugin
