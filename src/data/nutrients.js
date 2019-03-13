const nutrients = {
    // vitamins
    b1: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    b2: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }

    },
    b3: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    b5: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    b6: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    choline: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    folate: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    vitaminA: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    vitaminC: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    vitaminE: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    vitaminK: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },

    // minerals
    calcium: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    copper: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    iron: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    magnesium: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    manganese: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    phosphorus: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    potassium: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    selenium: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    },
    zinc: {
        min: { type: Number, min: 0, default: { general: 0 } },
        max: { type: Number, default: { general: 0 } },
        active: { type: Boolean, default: { general: true } }
    }
}

module.exports = {
    mongoose_defaults: Object.keys(nutrients).reduce((obj, k) => {
        let min = { ...nutrients[k].min, default: nutrients[k].min.default.general }
        let max = { ...nutrients[k].max, default: nutrients[k].max.default.general }
        let active = { ...nutrients[k].active, default: nutrients[k].active.default.general }

        obj[k] = {
            min, max, active
        }
        return obj
    }, {})
}