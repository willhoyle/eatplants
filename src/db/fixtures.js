const path = require("path")

const csvdata = require("./csvdata.js")
const { Food, FoodGroup, Nutrient, NutrientDefinition, initDB } = require("./mongoose/index.js")

const food = {}
const measure_name = {}
const nutrient = {}


const inAnimalGroup = (groupIdToCheck) => {
    return ["0100", "0500", "0700", "1000", "1300", "1500", "1700", "3500"].reduce((accum, animalId) => {
        return accum || animalId == groupIdToCheck
    }, false)
}

const executeFixtures = async () => {
    await initDB()
    await csvdata.load(path.join(__dirname, "./usda/FD_GROUP.txt"), { parse: false, delimiter: "^", quote: "~" })
        .then(data => {
            return data.reduce((p, d) => {
                return p.then(() => {
                    let importedId = d.id
                    let name = d.name

                    if (inAnimalGroup(importedId)) {
                        return Promise.resolve()
                    }

                    let group = new FoodGroup({
                        importedId,
                        name
                    })
                    return group.save()
                })
                    .catch(e => {
                        console.log(e)
                    })
            }, Promise.resolve())
        })
    await csvdata.load(path.join(__dirname, "./usda/FOOD_DES.txt"), { parse: false, delimiter: "^", quote: "~" })
        .then(data => {
            return data.reduce((p, d) => {
                return p.then(async () => {
                    let importedId = d.id
                    let foodGroupId = d.food_group_id
                    let longDescription = d.long_desc
                    let shortDescription = d.short_desc
                    let commonName = d.common_name

                    if (inAnimalGroup(foodGroupId)) {
                        return Promise.resolve()
                    }

                    let food = new Food({
                        importedId,
                        foodGroupId: await FoodGroup.findOne({ importedId: foodGroupId }).exec()._id,
                        longDescription,
                        shortDescription,
                        commonName
                    })
                    return food.save()

                })
                    .catch(e => {
                        console.log(e)
                    })
            }, Promise.resolve())
        })
    await csvdata.load(path.join(__dirname, "./usda/NUTR_DEF.txt"), { parse: false, delimiter: "^", quote: "~" })
        .then(data => {
            return data.reduce((p, d) => {
                return p.then(async () => {
                    let importedId = d.id
                    let unit = d.unit
                    let name = d.name
                    let decimals = +d.decimals

                    let nutrientDefinition = new NutrientDefinition({
                        importedId,
                        unit,
                        name,
                        decimals
                    })
                    return nutrientDefinition.save()

                })
                    .catch(e => {
                        console.log(e)
                    })
            }, Promise.resolve())
        })
    await csvdata.load(path.join(__dirname, "./usda/NUT_DATA.txt"), { parse: false, delimiter: "^", quote: "~" })
        .then(async data => {

            /* 
                this is quicker than going into the database for every item
                just import all the food and nutrient definitions and put them into objects
                like:
                foods = {
                    importedId: _id 
                } 
                and
                nutrientDefinitions = {
                    importedId: _id
                }
            */
            let foods = {}
            let foodArray = await Food.find({}).select(["importedId"]).exec()
            foodArray.forEach((f) => { foods[f.importedId] = f._id })

            let nutrientDefinitions = {}
            let nutrientDefinitionsArray = await NutrientDefinition.find({}).select(["importedId"]).exec()
            nutrientDefinitionsArray.forEach((n) => { nutrientDefinitions[n.importedId] = n._id })

            return data.reduce((p, d) => {
                return p.then(async () => {
                    let importedFoodId = d.food_id
                    let foodId = foods[importedFoodId]
                    if (!foodId) {
                        /* 
                            only reason we wouldn't find it is if that food item was an animal product
                            which we did not import into the database
                        */
                        return Promise.resolve()
                    }

                    let importedNutrientDefinitionId = d.nutrient_def_id
                    let nutrientDefinitionId = nutrientDefinitions[importedNutrientDefinitionId]
                    if (!nutrientDefinitionId) {
                        console.log("Warning didn't find a nutrient def")
                    }
                    let value = +d.val

                    let nutrient = new Nutrient({
                        importedNutrientDefinitionId,
                        importedFoodId,

                        foodId,
                        nutrientDefinitionId,
                        value,
                        valueKcal: 0 // will calculate later
                    })
                    return nutrient.save()

                })
                    .catch(e => {
                        console.log(e)
                    })
            }, Promise.resolve())
        })

    let kCalDefinition = await NutrientDefinition.findOne({ name: "Energy" }).exec()
    let nutrients = await Nutrient.find({}).exec()
    let kCalNutrients = {}

    nutrients.forEach((n) => {
        // console.log(n);
        // console.log(kCalDefinition);
        if (String(n.nutrientDefinitionId) === String(kCalDefinition._id)) {
            kCalNutrients[n.foodId] = n.value
        }
    })
    await nutrients.reduce((p, nutrient) => {
        return p.then(async () => {
            if (nutrient.value <= 0) {
                return Promise.resolve()
            }

            let kCalNutrient = kCalNutrients[nutrient.foodId]
            if (!kCalNutrient || kCalNutrient.value <= 0) {
                return Promise.resolve()
            }
            nutrient.valueKcal = (100.0 / kCalNutrient) * nutrient.value // now valueKcal is on a per 100kcal basis
            return nutrient.save()
        })
    }, Promise.resolve())

    // we can have different defaults depending on the info people give us
    // man, woman, kid?, pregnant. have to do research on 
    const defaultNutrientProfiles = [
        {
            id: "man", // this is useful to search for profiles
            displayName: "Man", // what will actually be displayed in the UI
            b1: {
                min: 0,
                max: 0,
                active: true
            },
            b2: {
                min: 0,
                max: 0,
                active: true

            },
            b3: {
                min: 0,
                max: 0,
                active: true
            },
            b5: {
                min: 0,
                max: 0,
                active: true
            },
            b6: {
                min: 0,
                max: 0,
                active: true
            },
            choline: {
                min: 0,
                max: 0,
                active: true
            },
            folate: {
                min: 0,
                max: 0,
                active: true
            },
            vitaminA: {
                min: 0,
                max: 0,
                active: true
            },
            vitaminC: {
                min: 0,
                max: 0,
                active: true
            },
            vitaminE: {
                min: 0,
                max: 0,
                active: true
            },
            vitaminK: {
                min: 0,
                max: 0,
                active: true
            },

            // minerals
            calcium: {
                min: 0,
                max: 0,
                active: true
            },
            copper: {
                min: 0,
                max: 0,
                active: true
            },
            iron: {
                min: 0,
                max: 0,
                active: true
            },
            magnesium: {
                min: 0,
                max: 0,
                active: true
            },
            manganese: {
                min: 0,
                max: 0,
                active: true
            },
            phosphorus: {
                min: 0,
                max: 0,
                active: true
            },
            potassium: {
                min: 0,
                max: 0,
                active: true
            },
            selenium: {
                min: 0,
                max: 0,
                active: true
            },
            zinc: {
                min: 0,
                max: 0,
                active: true
            }


        }
    ]
}

// executeFixtures()

module.exports = executeFixtures