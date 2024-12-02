import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
// import App from './App.jsx'
import Root from './routes/root';
import Dashboard, {loader as dashboardLoader } from './routes/dashboard';
import Product, {loader as productLoader} from './routes/product';
import Login, {action as loginAction, loader as loginLoader } from './routes/login';
import Groups, {loader as groupsLoader} from './routes/groups';
import {action as logoutAction} from './routes/logout';
import CreateGroup, {loader as createGroupLoader, action as createGroupAction} from './routes/createGroup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    loader: dashboardLoader
  },
  {
    path: "products/:productId",
    element: <Product />,
    loader: productLoader
  },
  {
    path: "login",
    element: <Login />,
    action: loginAction,
    loader: loginLoader
  },
  {
    path: "groups",
    element: <Groups />,
    loader: groupsLoader
  },
  {
    path: "logout",
    action: logoutAction
  },
  {
    path: "groups/create",
    element: <CreateGroup />,
    loader: createGroupLoader,
    action: createGroupAction
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
