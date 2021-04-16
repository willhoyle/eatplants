import { Model } from '@vuex-orm/core'

import { objId, date } from '../util'

class Food extends Model {
    static fields() {
        return {
            id: this.string(''),
            foodGroupId: this.string(''),
            longDescription: this.string(''),
            shortDescription: this.string(''),
            commonName: this.string(''),

            createdAt: this.string(),
            updatedAt: this.string()
        }
    }

}

Food.entity = 'Food'

export default Food