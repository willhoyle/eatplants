const path = require("path")
const uuidv4 = require("uuid/v4")

const csvdata = require("./csvdata.js")
const { Food, FoodGroup, Nutrient, NutrientDefinition, initDB } = require("./mongoose/index.js")

const measure_name = {}


const inAnimalGroup = (groupIdToCheck) => {
    return ["0100", "0500", "0700", "1000", "1300", "1500", "1700", "3500"].reduce((accum, animalId) => {
        return accum || animalId == groupIdToCheck
    }, false)
}

const food_groups_importedId = {}
const executeFixtures = async () => {
    await initDB()
    await csvdata.load(path.join(__dirname, "./usda/FD_GROUP.txt"), { parse: false, delimiter: "^", quote: "~" })
        .then(async data => {
            let docs = data.map(d => {
                let importedId = d.id
                let name = d.name

                if (inAnimalGroup(importedId)) {
                    return null
                }

                let group = {
                    _id: uuidv4(),
                    importedId,
                    name
                }
                food_groups_importedId[group.importedId] = group
                return group
            })
            docs = docs.filter(d => d !== null)
            return FoodGroup.insertMany(docs)
        })
    console.log("Inserted FD_GROUP");


    const foods_importedId = {}
    await csvdata.load(path.join(__dirname, "./usda/FOOD_DES.txt"), { parse: false, delimiter: "^", quote: "~" })
        .then(async data => {
            let docs = data.map(d => {
                let importedId = d.id
                let foodGroupId = d.food_group_id
                let longDescription = d.long_desc
                let shortDescription = d.short_desc
                let commonName = d.common_name

                if (inAnimalGroup(foodGroupId)) {
                    return null
                }

                let food = {
                    importedId,
                    foodGroupId: food_groups_importedId[foodGroupId]._id,
                    longDescription,
                    shortDescription,
                    commonName
                }
                foods_importedId[food.importedId] = food
                return food
            })
            docs = docs.filter(d => d !== null)
            return Food.insertMany(docs)
        })
    console.log("Inserted FOOD_DES");


    const nutrient_definitions_importedId = {}
    await csvdata.load(path.join(__dirname, "./usda/NUTR_DEF.txt"), { parse: false, delimiter: "^", quote: "~" })
        .then(async data => {
            let docs = data.map(d => {
                let importedId = d.id
                let unit = d.unit
                let name = d.name
                let decimals = +d.decimals

                let nutrientDefinition = {
                    _id: uuidv4(),
                    importedId,
                    unit,
                    name,
                    decimals
                }
                nutrient_definitions_importedId[nutrientDefinition.importedId] = nutrientDefinition
                return nutrientDefinition
            })
            return NutrientDefinition.insertMany(docs)
        })
    console.log("Inserted NUTR_DEF");

    const nutrients_importedId = {}
    let nutrients = []
    await csvdata.load(path.join(__dirname, "./usda/NUT_DATA.txt"), { parse: false, delimiter: "^", quote: "~" })
        .then(async data => {

            nutrients = data.map(d => {
                let importedFoodId = d.food_id
                let food = foods_importedId[importedFoodId]
                if (!food) {
                    /* 
                    only reason we wouldn't find it is if that food item was an animal product
                    which we did not import into the database
                    */
                    return null
                }
                let foodId = food._id

                let importedNutrientDefinitionId = d.nutrient_def_id
                let nutrientDefinition = nutrient_definitions_importedId[importedNutrientDefinitionId]
                if (!nutrientDefinition) {
                    console.log("Warning: didn't find a nutrient def")
                }
                let nutrientDefinitionId = nutrientDefinition._id
                let value = +d.val

                let nutrient = {
                    _id: uuidv4(),
                    importedNutrientDefinitionId,
                    importedFoodId,

                    foodId,
                    nutrientDefinitionId,
                    value,
                    valueKcal: 0 // will calculate later
                }
                nutrients_importedId[nutrient.foodId] = nutrient
                return nutrient

            })
            nutrients = nutrients.filter(d => d !== null)
            console.log("Before insert NUT_DATA");


            await Nutrient.insertMany(nutrients.slice(0, Math.floor(nutrients.length / 3)))
            await Nutrient.insertMany(nutrients.slice(Math.floor(nutrients.length / 3), Math.floor(nutrients.length * 2 / 3)))
            return Nutrient.insertMany(nutrients.slice(Math.floor(nutrients.length * 2 / 3)))
        })
    console.log("Inserted NUT_DATA");


    let kCalNutrients = {}
    let kCalDefinition = await NutrientDefinition.findOne({ name: "Energy" }).exec()
    for (let i = 0; i < nutrients.length; i++) {
        const nutrient = nutrients[i];

        if (String(nutrient.nutrientDefinitionId) == String(kCalDefinition._id)) {
            kCalNutrients[nutrient.foodId] = nutrient.value
        }

    }
    let updates = nutrients.map(nutrient => {
        if (nutrient.value <= 0) {
            return null
        }

        let kCalNutrient = kCalNutrients[nutrient.foodId]
        if (!kCalNutrient || kCalNutrient.value <= 0) {
            return null
        }

        return {
            updateOne: {
                filter: { _id: nutrient._id },
                // If you were using the MongoDB driver directly, you'd need to do
                // `update: { $set: { title: ... } }` but mongoose adds $set for
                // you.
                update: { valueKcal: (100.0 / kCalNutrient) * nutrient.value } // now valueKcal is on a per 100kcal basis
            }
        }
    })
    updates = updates.filter(u => u !== null)
    await Nutrient.bulkWrite(updates)

    console.log("Updated kCal");
}

const executeFixtures2 = async () => {

}

// executeFixtures()
// executeFixtures2()

module.exports = executeFixtures