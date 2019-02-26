const Fuse = require("fuse.js")
const { Food } = require("../db/mongoose")

let fuse;
let food;

let options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "longDescription",
        "shortDescription"
    ]
}


const initCache = async () => {
    food = await Food.find({}).exec()
    fuse = new Fuse(food, options)
}

const search = (searchTerm) => {
    return fuse.search(searchTerm)
}


module.exports = { initCache, search }