const router = require("express").Router()

router.use('/v1', require("./search.js"))
router.use(require("./food.js"))
router.use(require("./nutrient.js"))

module.exports = router