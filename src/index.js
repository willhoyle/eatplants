import solver from 'javascript-lp-solver'

let model = {
    optimize: {
        protein: 'max',
    },
    constraints: {
        protein: { min: 100, max: 120 },
        // carbs: { min: 100, max: 120 },
        // fat: { min: 50, max: 75 },
        // calories: { min: 2000, max: 2200 },
    },
    variables: {
        carrot: { protein: 1 },
        // dresser: { wood: 20, labor: 10, profit: 1600, dresser: 1, storage: 50 },
    },
    // ints: { table: 1, dresser: 1 },
}

export const optimize = async ({ foods, nutrientRequirements }) => {
    let optimize = {
        Protein: 'max',
        'Energy (kcal)': 'min',
        'Total lipid (fat)': 'min'
    }
    let constraints = {
        Protein: { min: 100, max: 120 },
        'Energy (kcal)': { min: 1000, max: 3000 },
        'Total lipid (fat)': { min: 50, max: 80 },

    }
    let variables = foods.reduce((variables, food, idx) => {
        variables[idx] = food.nutrients.reduce((nutrients, nutrient) => {
            let nutrientName = nutrient.nutrient.name
            if (nutrientName == 'Energy') {
                if (nutrient.nutrient.unit == 'kcal') {
                    nutrientName = 'Energy (kcal)'
                } else {
                    nutrientName = 'Energy (kJ)'
                }
            }
            nutrients[nutrientName] = nutrient.valuePerG
            return nutrients
        }, {})
        return variables
    }, {})
    let model = {
        optimize,
        constraints,
        variables
    }

    return solver.Solve(model, 1e-9, true)
}