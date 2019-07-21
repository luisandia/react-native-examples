import React from 'react'
import { Provider } from 'react-redux';
import StartApp from './StartApp';
import configureStore from './src/store/configureStore';

const store = configureStore();

const App = () => {
    return (
        <Provider store={store}>
            <StartApp />
        </Provider>
    )
}
export default App;