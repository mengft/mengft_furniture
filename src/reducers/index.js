import { combineReducers } from 'redux'
import TempReducer from './TempReducer'

const rootReducer = combineReducers({
  temp: TempReducer
})

export default rootReducer
