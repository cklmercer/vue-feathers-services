function plugin(Vue, feathers)  {

    // Only install the plugin once.
    if (plugin.installed) {
        return
    }

    // Access underlying feathers client.
    Object.defineProperty(Vue.prototype, '$api', {
        get() {
            return feathers
        }
    })

    // Register a global VueJS mixin.
    Vue.mixin({ 
        // Hook into the first VueJS 2.0 life-cycle event.
        beforeCreate() {
            registerServices(this)
        },
        // Hook into the first VueJS 1.0 life-cycle event.
        init() {
            registerServices(this)
        }
    })
}

// Bind the services in the given components "services" option.
function registerServices(vm) {
    
    let services = vm.$options.services

    // Exit if there isn't a valid "services" option.
    if (typeof services !== 'object') {
        return
    }
    
    // Determine if the vm's "data" option is a function.
    let dataIsFn = typeof vm.$options.data === 'function'
    
    // Get an instance of the vm's "data" option.
    let data = dataIsFn ? vm.$options.data() : vm.$options.data

    // Create a default data instance if necessary.
    if (typeof data === 'undefined') {
        data = {}
    }

    // Bind each FeathersJS service into our vm data instance.
    for (var service in services) {
        data[service] = vm.$api.service(services[service])
    }

    // Update the vm's "data" option for other life-cycle events.
    vm.$options.data = function () { return data }
}

export default plugin
