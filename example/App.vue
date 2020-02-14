<template>
  <div class="max-w-2xl mx-auto py-10">
    <div
      v-hover="{ backgroundColor: myVar, color: 'white', textAlign: 'right' }"
      :style="styleObject"
    >
      hello
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      myVar: '#000fff',
      styleObject: {
        backgroundColor: '#ff0000'
      }
    }
  }
}
</script>
