const nutrients = {
    kcal: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: true }
    },
    protein: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: true }
    },
    carbs: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: true }
    },
    fat: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: true }
    },
    alcohol: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: false } },
        rounds: { l1: false, l2: false, l3: false }
    },
    // vitamins
    b1: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    b2: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }

    },
    b3: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    b5: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    b6: {
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
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    vitaminC: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: true }
    },
    vitaminE: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: false, l3: false }
    },
    vitaminK: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },

    // minerals
    calcium: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    copper: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    iron: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: true }
    },
    magnesium: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    manganese: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    phosphorus: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    potassium: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    selenium: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } },
        rounds: { l1: true, l2: true, l3: false }
    },
    zinc: {
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

module.exports = {
    get_default: (key) => {
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
}