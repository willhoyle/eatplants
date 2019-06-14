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



import { frontpageFoods } from '../data/frontpage'
let frontpageCached = false
let foodDocs = [];
export const fetchFrontpageFoodDocs = async () => {
    if (!frontpageCached) {
        foodDocs = await Food.find({ longDescription: { $in: frontpageFoods } })
    }

    return foodDocs
}


export const initCache = async () => {
    food = await Food.find({}).exec()
    fuse = new Fuse(food, options)


}

export const search = (searchTerm) => {
    return fuse.search(searchTerm)
}
