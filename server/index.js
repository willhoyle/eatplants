const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const env_config = require("./config.js")


const host = env_config.get("ip")
const port = env_config.get("port")

const { initDB } = require("../src/db/mongoose")
const { initCache } = require('../src/cache')

app.set('port', port)

require("../src/db/fixtures.js")


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  await initDB()
  await initCache()

  app.use("/api", require("../src/api"))

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
