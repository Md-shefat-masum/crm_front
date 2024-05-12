import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    Provider
} from 'react-redux';
import store from './store';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8082/api';

axios.interceptors.request.use(
    function (config) {
        let form_errors = document.querySelectorAll('.form_error');
        [...form_errors].forEach((e) => e.remove());
        let has_errors = document.querySelectorAll('.has_error');
        [...has_errors].forEach((e) => e.classList.remove('has_error'));

        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 422) {
            let errors = error.response.data;
            errors.forEach((error) => {
                let el = document.querySelector(`[name="${error.path}"]`);
                if (el) {
                    (el.parentNode).classList.add('has_error');
                    (el.parentNode)?.insertAdjacentHTML(
                        'beforeend',
                        `
                            <div class="form_error text-danger">
                                ${error.msg}
                            </div>
                        `,
                    );
                }
            });

            window.toaster(
                `${error.response.status} - ${error.response.statusText}`,
            );

            console.log(error.response);
        }
        return Promise.reject(error);
    },
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode >
    <Provider store={store} >
        <App />
    </Provider>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();