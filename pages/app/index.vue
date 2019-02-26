<template/>

<script>
export default {
  // there's nothing to see on this page ("/app")
  // just redirect to the first item
  fetch({ store, redirect }) {
    return redirect('/app/optimizer')
  }
}
</script>
