import { Database } from '@vuex-orm/core'
const database = new Database()

import User from './models/User'
import user from './models/User/user'
database.register(User, user)

import Food from './models/Food'
database.register(Food)

import Nutrient from './models/Nutrient'
database.register(Nutrient)

import Recipe from './models/Recipe'
database.register(Recipe)



export default database