import { Attr } from '@vuex-orm/core'

export const objId = (model, def = '') => {
    return new Attr(this, def, val => {
        let isArray = Array.isArray(def)
        if (isArray) {
            if (val && Array.isArray(val)) {
                if (val.length && val[0]._id) {
                    model.insertOrUpdate({ data: val })
                    return val.map(v => v._id ? v._id : null)
                } else {
                    return val
                }
            } else {
                return val
            }
        } else {
            if (val && val._id) {
                model.insertOrUpdate({ data: [val] })
                return val._id
            } else {
                return val
            }

        }

    })
}

export const date = (def) => {
    if (def == undefined) def = null
    return new Attr(this, def, value => {
        if (!value) return def

        return new Date(value)
    })
}