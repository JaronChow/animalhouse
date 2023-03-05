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
import Register from "./routes/Register";
import Login from "./routes/Login";
import ErrorPage from "./ErrorPage";
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Shipping from './components/Shipping';
import Billing from './components/Billing';
import Payment from './components/Payment';
import ThankYou from './components/ThankYou';


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
        path: "profile",
        element: <Profile />,
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
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "shipping",
        element: <Shipping />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "thankYouPage",
        element: <ThankYou />,
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
