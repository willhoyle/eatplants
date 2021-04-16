import { Model } from '@vuex-orm/core'
import Food from '../Food'


import { objId, date } from '../util'

class FoodConstraint extends Model {

    static fields() {
        return {
            _id: this.increment(),

            foodId: objId(Food, ''),
            food: this.belongsTo(Food, 'foodId'),

            createdAt: date(),
            updatedAt: date(),
        }
    }

}

FoodConstraint.entity = 'FoodConstraint'
FoodConstraint.primaryKey = '_id'

export default FoodConstraint