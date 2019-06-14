const router = require("express").Router()

const { Food } = require("../../db/mongoose")
const { search } = require("../../cache")

import { fetchFrontpageFoodDocs } from '../../cache/'

router.get("/", async (req, res, next) => {
    res.json({ food: await fetchFrontpageFoodDocs() })
})

module.exports = router