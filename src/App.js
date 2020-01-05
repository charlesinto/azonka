import React, { Component} from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import Root from "./Root";
import ReduxThunk from 'redux-thunk';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import defaultTheme from './theme/theme'
import  "@fortawesome/fontawesome-free/css/all.css";
import  "./css/style.css";
import  "./css/css/app.css";
import 'react-awesome-slider/dist/styles.css';
import { ToastProvider} from 'react-toast-notifications'
//Banners

import Reducer from './reducers';
const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore)


const theme = createMuiTheme(defaultTheme)


class App extends Component {
  render(){
    return (
      <ToastProvider>
        <div className="">
          <Provider store={createStoreWithMiddleware(Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
              <MuiThemeProvider theme={theme}>
                <Root />
              </MuiThemeProvider>
          </Provider>

        </div>
      </ToastProvider>
    );
  }
}



export default App;
