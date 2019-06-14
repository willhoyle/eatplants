<template lang="pug">
    .has-text-centered
        img(v-if="src" :src="src" style="height: 5.5rem;")
        b-icon(v-else-if="icon" :icon="`${icon} mdi-64px`" size="is-xlarge")
        .is-size-4.has-text-grey {{text}}
</template>

<script>
export default {
  props: ['icon', 'text', 'src']
}
</script> 
