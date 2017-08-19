import ReactDOM from 'react-dom'
import React from 'react'
import configureStore from './redux/configureStore'
import { Provider } from 'react-redux'
import routes from './routes'
import DevTools from './redux/DevTools'

const store = configureStore
ReactDOM.render((
 <Provider store={store}>
     <div>
        {routes}
         {/* <DevTools />  */}
    </div>
 </Provider>
), document.getElementById('app')) 