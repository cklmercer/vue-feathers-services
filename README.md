# vue-feathers-services

VueJS plugin to simplify FeathersJS service usage within components.

## Installation

*Install via NPM (or better yet.. use Yarn)*
```
npm install vue-feathers-services
```

*Use withing project*
```
import Vue from 'vue'
import VueFeathers from 'vue-feathers-services'

// Import your feathers stuffs

// Let's assume your FeathersJS client is bound to the var "app"

Vue.use(VueFeathers, app)
```

## Usage
Add a "services" option to components that need to access your FeathersJS services.
```
new Vue({
    services: {
        userService: 'users'
    },

    mounted() {
        this.userService.on('created', user => console.log('User Created:', user))
    },

    methods: {
        registerUser(email, password) {
            this.userService.create({ email, password })
        }
    }
});
```

Access an instace of your underlying FeathersJS appliction.
```
$vm.$api.services('users').create({ name: 'Cody Mercer' })
```

## License
[MIT](https://opensource.org/licenses/MIT)
