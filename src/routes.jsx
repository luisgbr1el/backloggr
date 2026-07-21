import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Review from './pages/Review';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'review/:username',
                element: <Review />,
            },
        ],
    },
]);