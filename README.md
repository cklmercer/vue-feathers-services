# vue-feathers-services

VueJS plugin to simplify FeathersJS service usage within components.

## Installation

*Install via NPM (or better yet.. use Yarn)*
```
npm install vue-feathers-services
```

*Use with project*
```
import Vue from 'vue'
import VueFeathers from 'vue-feathers-services'
// Import your feathers stuffs

// Assuming 'app' is the name of the configured feathers client instance

Vue.use(VueFeathers, app)
```

## Usage
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

## License
[MIT](https://opensource.org/licenses/MIT)
