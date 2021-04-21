<template>
  <div></div>
</template>

<script>
import solver from 'javascript-lp-solver'

let model = {
  optimize: {
    profit: 'min',
  },
  constraints: {
    protein: { min: 100, max: 120 },
  },
  variables: {
    table: { wood: 30, labor: 5, profit: 1200, table: 1, storage: 30 },
    dresser: { wood: 20, labor: 10, profit: 1600, dresser: 1, storage: 50 },
  },
  ints: { table: 1, dresser: 1 },
}

export default {
  beforeMount() {
    let result = solver.Solve(model)
    console.log(result)
  },
}
</script>
