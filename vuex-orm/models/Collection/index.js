import { Model } from '@vuex-orm/core'

class Collection extends Model {
    static fields() {
        return {
            id: this.increment(),

        }
    }

}

export default Collection