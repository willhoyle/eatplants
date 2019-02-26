import { Model } from '@vuex-orm/core'

class Nutrient extends Model {
    static fields() {
        return {
            _id: this.string(''),

            foodId: this.string(''),

            nutrientDefinitionId: this.string(''),

            value: this.number(0),

            valueKcal: this.number(0),

            valueKcal: this.number(0),
        }
    }

}

Nutrient.entity = 'Nutrient'
Nutrient.primaryKey = '_id'

export default Nutrient