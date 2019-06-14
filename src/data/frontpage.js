export const frontpageFoods = [
    'Peanut butter, smooth style, without salt',
    'Seeds, flaxseed',
    'Seeds, pumpkin and squash seeds, whole, roasted, without salt',
    'Blueberries, raw'
]

const _frontpageNutrients = [
    {
        name: '',
        nutrients: [
            { key: 'kcal' },
            { key: 'protein' },
            { key: 'carbs' },
            { key: 'fat' }
        ]
    },
    {
        name: '',
        nutrients: [
            { key: 'calcium' },
            { key: 'iron' },
            { key: 'potassium' },
            { key: 'zinc' }
        ]
    }
]

import { nutrients } from './nutrients'
export const frontpageNutrients = _frontpageNutrients.map(section => {
    return {
        name: section.name,
        nutrients: section.nutrients.map(nutrient => {
            return {
                key: nutrient.key,
                label: nutrients[nutrient.key].label
            }
        })
    }
})