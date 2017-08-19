import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import ThunkMiddleware from 'redux-thunk'
import reducers from '../reducers/index'
import DevTools from './DevTools'

const finalCreateStore = compose(
    applyMiddleware(ThunkMiddleware),
    DevTools.instrument()
)(createStore)

// let reducer = combineReducers(reducers, {
//  routing: routerReducer,
// })

export default finalCreateStore(reducers)