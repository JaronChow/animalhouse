import './style/App.css';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Root from "./routes/Root";
import Home from "./routes/Home";
import Animals from "./routes/Animals";
import Categories from "./routes/Categories";
import ShoppingCart from "./routes/ShoppingCart";
import Profile from "./routes/Profile";
import CustomerProfiles from "./routes/CustomerProfiles";
import Register from "./routes/Register";
import Login from "./routes/Login";
import ErrorPage from "./ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "animals",
        element: <Animals />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "my_profile",
        element: <Profile />,
      },
      {
        path: "customer_profile",
        element: <CustomerProfiles />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "shoppingCart",
        element: <ShoppingCart />,
      }
    ],
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} /> 
    </div>
  );
}

export default App;
