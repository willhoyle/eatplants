<template lang="pug">
    .clean-box
        slot
</template>

<style>
.clean-box {
  background-color: rgba(236, 236, 236, 0.418);
  border-radius: 3px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
}
</style>
