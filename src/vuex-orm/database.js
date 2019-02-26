import { Database } from '@vuex-orm/core'
const database = new Database()

import User from './models/User'
database.register(User)

import Food from './models/Food'
database.register(Food)

import Nutrient from './models/Nutrient'
database.register(Nutrient)



export default database