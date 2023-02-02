import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import Layout from './layouts/Layout';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Ordenes from './views/Ordenes';
import Productos from './views/Productos';
import ProductosAgotados from './views/ProductosAgotados';
import Registro from './views/Registro';
import Olvide from './views/Olvide';
import Recuperar from './views/Recuperar';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            },
            {
                path: '/auth/olvide',
                element: <Olvide />
            },
            {
                // Recuperar password con token enviando por email /auth/recuperar?token=123456789
                path: '/auth/recuperar',
                element: <Recuperar />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Ordenes />
            },
            {
                path: '/admin/productos',
                element: <Productos />
            },
            {
                path: '/admin/productos/agotados',
                element: <ProductosAgotados />
            }
        ]
    }
]);

export default router;