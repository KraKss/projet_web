import {createBrowserRouter} from 'react-router-dom';

import {Home, Profile, Orders, Review, Products} from "../pages/index.js";
import {ROUTES} from './routesPath';

const router = createBrowserRouter([
    {
        path: ROUTES.HOME_ROUTE,
        element: <Home/>
    },
    {
        path: ROUTES.PROFILE_ROUTE,
        element: <Profile/>
    },
    {
        path: ROUTES.ORDERS_ROUTE,
        element: <Orders/>
    },
    {
        path: ROUTES.REVIEW_ROUTE,
        element: <Review/>
    },
    {
        path: ROUTES.PRODUCTS_ROUTE,
        element: <Products/>
    },
]);

export default router;