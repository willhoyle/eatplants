import { Model } from '@vuex-orm/core'

class Collection extends Model {

    static fields() {
        return {
            _id: this.increment(),

        }
    }

}

Collection.entity = 'Collection'
Collection.primaryKey = '_id'

export default Collection