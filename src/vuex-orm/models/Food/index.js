import { Model } from '@vuex-orm/core'

class Food extends Model {
    static fields() {
        return {
            _id: this.string(''),
            foodGroupId: this.string(''),
            longDescription: this.string(''),
            shortDescription: this.string(''),
            commonName: this.string('')
        }
    }

}

Food.entity = 'Food'
Food.primaryKey = '_id'

export default Food