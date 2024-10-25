import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './routes/App';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from './ErrorPage';
import MostUsed from './routes/MostUsed';
import Search from './routes/Search';
import Graph from './routes/Graph';
import Admin from './routes/Admin';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/MostUsed",
    element: <MostUsed />,
  },
  {
    path: "/Search",
    element: <Search />,
  },
  {
    path: "/Graph",
    element: <Graph />,
  },
  {
    path: "/Admin",
    elemnt: <Admin />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {//<App />}
    <RouterProvider router={router} />
    }
  </React.StrictMode>
);

