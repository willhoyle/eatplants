const restify = require('express-restify-mongoose')
const router = require("express").Router()

const { Food } = require("../../db/mongoose")

restify.serve(router, Food, {
    prefix: '',
    contextFilter: (model, req, done) => {
        done(model.find({}, null, { user: { roles: ["admin"], companyId: "123" } }))
    }
})

module.exports = router