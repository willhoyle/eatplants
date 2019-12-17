require = require("esm")(module/*, options*/)
var uuidv4 = require('uuid/v4');

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.plugin(require("./plugins/uuid"))

var UUID = mongoose.Types.UUID;

const passwordPlugin = require('./plugins/mongoose-password-plugin.js')
require('mongoose-type-email')

const UserSchema = new Schema({
    email: { type: mongoose.SchemaTypes.Email, required: true },
    emailVerified: { type: Boolean, default: false },
    emailVerifiedDate: { type: Date, default: null },
    active: { type: Boolean, default: true },

    name: { type: String, default: '' },


},
    { timestamps: true })

const mongooseHidden = require('mongoose-hidden')()
require('mongoose-type-email')

UserSchema.plugin(passwordPlugin, {
    passwordField: 'password',
    comparePasswordType: 'promise',
    bcryptRounds: 12
})

UserSchema.plugin(mongooseHidden, {
    defaultHidden: { __v: true, password: true }
})

const UserModel = mongoose.model("User", UserSchema, 'user')

const { get_default } = require('../../data/nutrients.js')
// each nutrient has a min, max, and whether it is active.
// when it's not active, it won't be included in the optimizer
const UserSettingSchema = new Schema({
    userId: { type: UUID, ref: "User" },

    name: String,

    // you can have advanced settings where the equation tries a second round
    round: { type: Number, default: 1 },

    ...get_default("general")

},
    { timestamps: true }
)

const UserSettingModel = mongoose.model("UserSetting", UserSettingSchema, 'usersetting')


const RecipeSchema = new Schema({
    name: { type: String },
    description: { type: String },
    foodIds: [
        {
            foodId: { type: UUID, ref: 'Food' },
            value: { type: Number, default: 0 } // amount per 100g
        }
    ]
}, { timestamps: true })

const FoodSchema = new Schema({
    importedId: String,
    foodGroupId: { type: UUID, ref: "FoodGroup" },
    longDescription: String,
    shortDescription: String,
    commonName: String
},
    { timestamps: true }
)

const FoodModel = mongoose.model("Food", FoodSchema, 'food')




const FoodGroupSchema = new Schema({
    importedId: String,
    name: String
},
    { timestamps: true }
)

const FoodGroupModel = mongoose.model("FoodGroup", FoodGroupSchema, 'foodgroup')




const NutrientSchema = new Schema({
    importedNutrientDefinitionId: String,
    importedFoodId: String,
    foodId: { type: UUID, ref: "Food" },
    nutrientDefinitionId: { type: UUID, ref: "NutrientDefinition" },
    value: Number, // per 100g
    valueKcal: Number // per 100kcal
},
    { timestamps: true }
)

const NutrientModel = mongoose.model("Nutrient", NutrientSchema, 'nutrient')




const NutrientDefinitionSchema = new Schema({
    importedId: String,
    unit: String,
    name: String,
    decimals: Number
},
    { timestamps: true }
)

const NutrientDefinitionModel = mongoose.model("NutrientDefinition", NutrientDefinitionSchema, 'nutrientdefinition')


const OptimizerItemSchema = new Schema({
    itemId: { type: UUID, ref: "Food" },
    value: { type: Number, default: 0 }, // in 100g
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 }

}, { timestamps: true })

// collection is used here to mean a collection of foods
const CollectionSchema = new Schema({
    name: String,
    userId: { type: UUID, ref: "User" },
    foodId: { type: Array, default: [] }
},
    { timestamps: true }
)

const CollectionModel = mongoose.model("Collection", CollectionSchema, 'collection')


let uri = require("../../../server/config.js").get("db.uri")

const initDB = () => {
    return mongoose.connect(uri, { useNewUrlParser: true })
}

var eventSchema = new Schema({ message: String },
    { discriminatorKey: 'kind', _id: false });

var batchSchema = new Schema({ events: [eventSchema] });

// `batchSchema.path('events')` gets the mongoose `DocumentArray`
var docArray = batchSchema.path('events');

// The `events` array can contain 2 different types of events, a
// 'clicked' event that requires an element id that was clicked...
var clickedSchema = new Schema({
    element: {
        type: String,
        required: true
    }
}, { _id: false });
// Make sure to attach any hooks to `eventSchema` and `clickedSchema`
// **before** calling `discriminator()`.
var Clicked = docArray.discriminator('Clicked', clickedSchema);

// ... and a 'purchased' event that requires the product that was purchased.
var Purchased = docArray.discriminator('Purchased', new Schema({
    product: {
        type: String,
        required: true
    }
}, { _id: false }));

var Batch = mongoose.model('EventBatch', batchSchema);

// Create a new batch of events with different kinds
var batch = {
    events: [
        { kind: 'Clicked', element: '#hero', message: 'hello' },
        { kind: 'Purchased', product: 'action-figure-1', message: 'world' }
    ]
};

Batch.create(batch).
    then(function (doc) {
        // assert.equal(doc.events.length, 2);

        // assert.equal(doc.events[0].element, '#hero');
        // assert.equal(doc.events[0].message, 'hello');
        // assert.ok(doc.events[0] instanceof Clicked);

        // assert.equal(doc.events[1].product, 'action-figure-1');
        // assert.equal(doc.events[1].message, 'world');
        // assert.ok(doc.events[1] instanceof Purchased);

        doc.events.push({ kind: 'Purchased', product: 'action-figure-2' });
        return doc.save();
    }).
    then(function (doc) {
        // assert.equal(doc.events.length, 3);

        // assert.equal(doc.events[2].product, 'action-figure-2');
        // assert.ok(doc.events[2] instanceof Purchased);

        // done();
    })


module.exports =
    {
        initDB,
        Food: FoodModel,
        FoodGroup: FoodGroupModel,
        Nutrient: NutrientModel,
        NutrientDefinition: NutrientDefinitionModel,
        Collection: CollectionModel
    }
