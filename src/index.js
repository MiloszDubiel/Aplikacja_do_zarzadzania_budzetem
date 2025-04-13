import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';
import { Provider } from 'react-redux';
import  store  from './Redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
         <React.StrictMode>
        <Main />
        </React.StrictMode>
    </Provider>
);


