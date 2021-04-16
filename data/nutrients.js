export const nutrients = {
    kcal: {
        label: 'Calories',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: true }
    },
    protein: {
        label: 'Protein',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: true }
    },
    carbs: {
        label: 'Carbs',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: true }
    },
    fat: {
        label: 'Fat',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: true }
    },
    alcohol: {
        label: 'Alcohol',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: false } },
        rounds: { l1: false, l2: false, l3: false }
    },
    // vitamins
    b1: {
        label: 'Vitamin B1',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    b2: {
        label: 'Vitamin B2',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }

    },
    b3: {
        label: 'Vitamin B3',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    b5: {
        label: 'Vitamin B5',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    b6: {
        label: 'Vitamin B6',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    choline: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    folate: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    vitaminA: {
        label: 'Vitamin A',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    vitaminC: {
        label: 'Vitamin C',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: true }
    },
    vitaminE: {
        label: 'Vitamin E',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: false, l3: false }
    },
    vitaminK: {
        label: 'Vitamin K',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },

    // minerals
    calcium: {
        label: 'Calcium',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    copper: {
        label: 'Copper',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    iron: {
        label: 'Iron',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: true }
    },
    magnesium: {
        label: 'Magnesium',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    manganese: {
        label: 'Manganese',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    phosphorus: {
        label: 'Phosphorous',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    potassium: {
        label: 'Potassium',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    selenium: {
        label: 'Selenium',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    zinc: {
        label: 'Zinc',
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    }
}

const profiles = {
    general: {
        name: "Default",
        active: true
    },
    infant: {
        name: "Infant (0-4y)",
        active: false
    },
    pregnant: {
        name: "Pregnant",
        active: false
    }
}

export const get_default = (key) => {
    Object.keys(nutrients).reduce((obj, k) => {
        let min = { ...nutrients[k].min, default: nutrients[k].min.default[key] }
        let max = { ...nutrients[k].max, default: nutrients[k].max.default[key] }
        let active = { ...nutrients[k].active, default: nutrients[k].active.default[key] }

        obj[k] = {
            min, max, active
        }
        return obj
    }, {})
}
