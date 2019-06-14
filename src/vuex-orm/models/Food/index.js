import { Model } from '@vuex-orm/core'

import { objId, date } from '../util'

class Food extends Model {
    static fields() {
        return {
            _id: this.string(''),
            foodGroupId: this.string(''),
            longDescription: this.string(''),
            shortDescription: this.string(''),
            commonName: this.string(''),

            createdAt: date(),
            updatedAt: date()
        }
    }

}

Food.entity = 'Food'
Food.primaryKey = '_id'

export default Food