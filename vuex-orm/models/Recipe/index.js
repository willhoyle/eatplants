import { Model } from '@vuex-orm/core'

import { objId, date } from '../util'

class Recipe extends Model {

    static fields() {
        return {
            _id: this.increment(),

            name: this.string('My recipe name'),

            createdAt: date(),
            updatedAt: date()
        }
    }

}

Recipe.entity = 'Recipe'
Recipe.primaryKey = '_id'

export default Recipe