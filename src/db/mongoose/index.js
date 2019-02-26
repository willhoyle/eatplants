let mongoose = require('mongoose');
let Schema = mongoose.Schema;


const passwordPlugin = require('./mongoose-password-plugin.js')

const UserSchema = new Schema({
    email: String,
    emailVerified: Boolean,
    emailVerifiedDate: { type: Date, default: null }
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


// each nutrient has a min, max, and whether it is active.
// when it's not active, it won't be included in the optimizer
const UserSettingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },

    name: String,

    // vitamins
    b1: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    b2: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }

    },
    b3: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    b5: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    b6: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    choline: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    folate: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    vitaminA: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    vitaminC: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    vitaminE: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    vitaminK: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },

    // minerals
    calcium: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    copper: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    iron: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    magnesium: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    manganese: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    phosphorus: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    potassium: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    selenium: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    },
    zinc: {
        min: { type: Number, min: 0, default: 0 },
        max: { type: Number, min: 0, default: 0 },
        active: { type: Boolean, default: true }
    }

},
    { timestamps: true }
)

const UserSettingModel = mongoose.model("UserSetting", UserSettingSchema, 'usersetting')




const FoodSchema = new Schema({
    importedId: String,
    foodGroupId: { type: Schema.Types.ObjectId, ref: "FoodGroup" },
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
    foodId: { type: Schema.Types.ObjectId, ref: "Food" },
    nutrientDefinitionId: { type: Schema.Types.ObjectId, ref: "NutrientDefinition" },
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



// collection is used here to mean a collection of foods
const CollectionSchema = new Schema({
    name: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" }
},
    { timestamps: true }
)

const CollectionModel = mongoose.model("Collection", CollectionSchema, 'collection')


let uri = require("../../../server/config.js").get("db.uri")

const initDB = () => {
    return mongoose.connect(uri, { useNewUrlParser: true })
}


module.exports =
    {
        initDB,
        Food: FoodModel,
        FoodGroup: FoodGroupModel,
        Nutrient: NutrientModel,
        NutrientDefinition: NutrientDefinitionModel,
        Collection: CollectionModel
    }
