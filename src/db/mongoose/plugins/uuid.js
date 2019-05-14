const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-uuid2')(mongoose);

const UUID = mongoose.Types.UUID;

const uuidPlugin = (schema, options) => {
    schema.add({ _id: { type: UUID, default: uuidv4 } })
    schema.set({ id: false })

    schema.set('toObject', { getters: true })
    schema.set('toJSON', { getters: true })
}

module.exports = uuidPlugin