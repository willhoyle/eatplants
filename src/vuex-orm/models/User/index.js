import { Model } from '@vuex-orm/core'

class User extends Model {
    static fields() {
        return {
            _id: this.string(''),
            email: this.string(''),
            createdAt: this.attr('', value => {
                if (!value) {
                    return new Date()
                }
                return new Date(value)
            }),
            updatedAt: this.attr('', value => {
                if (!value) {
                    return new Date()
                }
                return new Date(value)
            }),
            active: this.boolean(true),

            firstName: this.string(''),
            lastName: this.string(''),

            roles: this.attr([])

        }
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }

}

User.entity = 'User'
User.primaryKey = '_id'

export default User