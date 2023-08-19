import ReactDOM from 'react-dom/client'
import './index.css'

import store from './store.js'
import { Provider } from 'react-redux'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './routes/ErrorPage.jsx'
import Root from './routes/Root.jsx'
import HeroPage from './routes/HeroPage'
import LoginPage from './routes/LoginPage'
import CarPage from './routes/CarPage'
import CarDetailPage from './routes/CarDetailPage'
import ContactPage from './routes/ContactPage'
import RegisterPage from './routes/RegisterPage'
import UserPage from './routes/UserPage'
import AdminPage from './routes/AdminPage'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'

library.add(fas, faTwitter, faFontAwesome)

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
            },
            {
                path: '/register',
                element: <RegisterPage />
            },
            {
                path: '/cars',
                element: <CarPage />
            }
            ,
            {
                path: '/cars/:id',
                element: <CarDetailPage />
            }
            ,
            {
                path: '/contact',
                element: <ContactPage />
            },
            {
                path: '/profile',
                element: <UserPage />
            },
            {
                path: '/admin',
                element: <AdminPage />
            },
        ],
        errorElement: <ErrorPage />
    }
]);



ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
