import { combineReducers } from 'redux'

import { register } from './registrationReducer'
import { login } from './loginReducer'
import { collections } from './collectionReducer'

const rootReducer = combineReducers({
  register,
  login,
  collections
})

export default rootReducer
