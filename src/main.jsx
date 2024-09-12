import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './redux/store/Store.js'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Auth from './pages/Auth.jsx';
import {Provider} from "react-redux";
import DashboardPage from './pages/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Auth />
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);


