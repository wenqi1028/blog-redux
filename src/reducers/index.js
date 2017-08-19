
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import PostReducer from './posts'
import UserReducer from './users'

export default combineReducers({
    routing: routerReducer,
    posts: PostReducer,
    user: UserReducer,
    form: formReducer
})