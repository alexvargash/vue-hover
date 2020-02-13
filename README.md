# Vue Hover

Add hover styles to an HTML element dynamically with a Vue directive.

## Installation

Intall via [NPM](https://www.npmjs.com/package/vue-hover)

```sh
npm install vue-hover
```

## Usage

Install the plugin

```js
import Vue from 'vue'
import VueHover from 'vue-hover'

Vue.use(VueHover)
```

Once your plugin is intalled a new directive `v-hover` is available to use on a HTML element, the usage is the same object syntax that is used when binding inline styles on Vue with the properties on **camelCase**.

```html
<template>
  <div>
    <button
      :style="baseStyles"
      v-hover="{ backgroundColor: hoverBackground }"
    >
      Hover Me!
    </button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      hoverBackground: '#667EEA',
      baseStyles: {
        backgroundColor: '#5A67D8'
      }
    }
  }
}
</script>
```

To override an `!important` from a class a modifier can be added `v-hover.important` and this will add `!important` to all the inline styles.

```html
<template>
  <div>
    <button
      class="my-background"
      v-hover.important="hoverStyles"
    >
      Hover Me!
    </button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      hoverStyles: {
        backgroundColor: '#667EEA'
      }
    }
  }
}
</script>
<style>
  .my-background {
    background-color: #ff0000 !important;
  }
</style>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](./LICENSE)
