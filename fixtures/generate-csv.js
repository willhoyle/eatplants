const fs = require("fs");
const path = require("path")
const uuidv4 = require("uuid/v4")

const csvdata = require("./csvdata.js")

const measure_name = {}
let energy;

const inAnimalGroup = (groupIdToCheck) => {
    return ["0100", "0500", "0700", "1000", "1300", "1500", "1700", "3500"].reduce((accum, animalId) => {
        return accum || animalId == groupIdToCheck
    }, false)
}

const food_groups_importedId = {}
const executeFixtures = async () => {
    // await initDB()
    await csvdata.load(path.join(__dirname, "./usda/FD_GROUP.txt"), { parse: false, delimiter: "^", quote: "~" })
        .then(async data => {
            let docs = data.map(d => {
                let importedId = d.id
                let name = d.name

                if (inAnimalGroup(importedId)) {
                    return null
                }

                let group = {
                    id: uuidv4(),
                    importedId,
                    name
                }
                food_groups_importedId[group.importedId] = group
                return group
            })
            docs = docs.filter(d => d !== null).map((d, i) => { d.id = i + 1; return d })

            await csvdata.write(path.join(__dirname, './csv/food_group.csv'), docs, { header: 'id^name', delimiter: '^', quote: "~" })
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
                    foodGroupId: food_groups_importedId[foodGroupId].id,
                    food_group_id: food_groups_importedId[foodGroupId].id,
                    longDescription,
                    long_description: longDescription,
                    shortDescription,
                    short_description: shortDescription,
                    commonName,
                    common_name: commonName
                }
                foods_importedId[food.importedId] = food
                return food
            })
            docs = docs.filter(d => d !== null).map((d, i) => { d.id = i; return d })

            await csvdata.write(path.join(__dirname, './csv/food.csv'), docs, { header: 'id^food_group_id^long_description^short_description^common_name', delimiter: '^', quote: "~" })
            // return Food.insertMany(docs)
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
                    id: uuidv4(),
                    importedId,
                    unit,
                    name,
                    decimals
                }
                nutrient_definitions_importedId[nutrientDefinition.importedId] = nutrientDefinition
                return nutrientDefinition
            }).map((d, i) => { d.id = i + 1; return d })

            energy = docs.find(doc => {
                return doc.unit == 'kcal'
            })

            // return NutrientDefinition.insertMany(docs)
            await csvdata.write(path.join(__dirname, './csv/nutrient.csv'), docs, { header: 'id^unit^name', delimiter: '^', quote: "~" })
        })
    console.log("Inserted NUTR_DEF");

    const nutrients_importedId = {}
    await csvdata.load(path.join(__dirname, "./usda/NUT_DATA.txt"), { parse: false, delimiter: "^", quote: "~" })
        .then(async data => {

            let nutrients = data.map(d => {
                let importedFoodId = d.food_id
                let food = foods_importedId[importedFoodId]
                if (!food) {
                    /* 
                    only reason we wouldn't find it is if that food item was an animal product
                    which we did not import into the database
                    */
                    return null
                }
                let foodId = food.id

                let importedNutrientDefinitionId = d.nutrient_def_id
                let nutrientDefinition = nutrient_definitions_importedId[importedNutrientDefinitionId]
                if (!nutrientDefinition) {
                    console.log("Warning: didn't find a nutrient def")
                }
                let nutrientDefinitionId = nutrientDefinition.id
                let value = +d.val / 100 // it's /100g, I want /1g

                let nutrient = {
                    id: uuidv4(),
                    importedNutrientDefinitionId,
                    importedFoodId,

                    foodId,
                    food_id: foodId,
                    nutrientDefinitionId,
                    nutrient_id: nutrientDefinitionId,
                    value,
                    value_per_g: value,
                    valuePerKcal: 0, // will calculate later
                    value_per_kcal: 0 // will calculate later
                }
                nutrients_importedId[nutrient.foodId] = nutrient
                return nutrient

            })
            nutrients = nutrients.filter(d => d !== null).map((d, i) => { d.id = i + 1; return d })


            let kCalDefinition = energy
            let kCalNutrients = {}
            for (let i = 0; i < nutrients.length; i++) {
                const nutrient = nutrients[i];

                if (String(nutrient.nutrientDefinitionId) == String(kCalDefinition.id)) {
                    kCalNutrients[nutrient.foodId] = nutrient.value
                }

            }

            console.log("Before insert NUT_DATA");

            console.log("Inserted NUT_DATA");


            for (let i = 0; i < nutrients.length; i++) {
                const nutrient = nutrients[i];

                if (String(nutrient.nutrientDefinitionId) == String(kCalDefinition.id)) {
                    kCalNutrients[nutrient.foodId] = nutrient.value
                }

            }
            nutrients = nutrients.map(nutrient => {
                if (nutrient.value <= 0) {
                    return null
                }

                let kCalNutrient = kCalNutrients[nutrient.foodId]
                if (!kCalNutrient || kCalNutrient.value <= 0) {
                    return null
                }

                let valuePerKcal = nutrient.value_per_g / kCalNutrient
                return {
                    ...nutrient,
                    valuePerKcal,
                    value_per_kcal: valuePerKcal
                }
            }).filter(u => u !== null)



            console.log("Updated kCal");
            await csvdata.write(path.join(__dirname, './csv/food_nutrient.csv'), nutrients, { header: 'id^nutrient_id^food_id^value_per_g^value_per_kcal', delimiter: '^', quote: "~" })
            // await Nutrient.insertMany(nutrients.slice(0, Math.floor(nutrients.length / 3)))
            // await Nutrient.insertMany(nutrients.slice(Math.floor(nutrients.length / 3), Math.floor(nutrients.length * 2 / 3)))
            // return Nutrient.insertMany(nutrients.slice(Math.floor(nutrients.length * 2 / 3)))
        })

    let file = fs.readFileSync(path.join(__dirname, "./usda/WEIGHT.txt"), { encoding: 'utf8' })
    let splitlines = file.split("\n")
    let header = splitlines[0]
    let data = splitlines.slice(1, -1)
    let foodMeasureWeights = data.map((d, i) => {
        // food_id^seq_num^amount^description^gram_weight^num_data_points^std_dev
        let [food_id, seq_num, amount, description, gram_weight] = d.split("^")
        let food = foods_importedId[food_id.replace('~', '').replace('~', '')]
        if (!food) {
            return null
        }

        let importedFoodId = food.id


        let num_measures = amount.replace('~', '').replace('~', '')
        let measure = description.replace('~', '').replace('~', '')
        let weight_in_g = gram_weight.replace('~', '').replace('~', '')
        return {
            id: i + 1,
            food_id: importedFoodId,
            num_measures,
            measure,
            weight_in_g
        }
    }).filter(d => d)
    await csvdata.write(path.join(__dirname, './csv/food_measure_weight.csv'), foodMeasureWeights, { header: 'id^food_id^num_measures^measure^weight_in_g', delimiter: '^', quote: "~" })

    // Collections
    await csvdata.write(path.join(__dirname, './csv/collection.csv'), [{
        id: 1, name: 'Peas + Edamame', description: 'A collection of food I\'d eat on a busy day'
    }], { header: 'id^name^description', delimiter: '^', quote: "~" })

    // Collection Food Items
    await csvdata.write(path.join(__dirname, './csv/collection_food_item.csv'), [
        {
            id: 1,
            food_id: foods_importedId[11302].id, // peas, frozen
            collection_id: 1
        },
        {
            id: 2,
            food_id: foods_importedId[11211].id, // edamame, frozen
            collection_id: 1
        }
    ], { header: 'id^food_id^collection_id', delimiter: '^', quote: "~" })



}



executeFixtures()
// executeFixtures2()

module.exports = executeFixtures