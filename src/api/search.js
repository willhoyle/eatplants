const router = require("express").Router()

const { Food } = require("../db/mongoose")
const { search } = require("../cache")

router.get("/search", async (req, res, next) => {
    let searchTerm = req.query.t
    let results = search(searchTerm).slice(0, 10)
    res.json({ results })
})

module.exports = router