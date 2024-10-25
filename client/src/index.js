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
import ExpandingGraph from './components/ExpandingGraph';
import { SigmaContainer } from '@react-sigma/core';

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
    element: <Admin />,
  },
  {
    path: "/ExpandingGraph",
    element: <SigmaContainer style={{ height: "100vh", width: "100vh" }}><ExpandingGraph /></SigmaContainer>,
  },

]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

