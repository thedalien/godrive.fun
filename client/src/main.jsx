import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import store from './store.js'
import { Provider } from 'react-redux'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './routes/ErrorPage.jsx'
import Root from './routes/Root.jsx'
import HeroPage from './routes/HeroPage'
import LoginPage from './routes/LoginPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <HeroPage />
            },
            {
                path: '/login',
                element: <LoginPage />
            }

        ],
        errorElement: <ErrorPage />
    }
]);



ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
