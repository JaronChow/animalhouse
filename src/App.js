import './style/App.css';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Root from "./routes/Root";
import Home from "./routes/Home";
import Animals from "./routes/Animals";
import Animal from "./components/Animal";
import NewAnimal from "./components/NewAnimal";
import Categories from "./routes/Categories";
import Category from "./components/Category";
import NewCategory from "./components/NewCategory";
import ShoppingCart from "./routes/ShoppingCart";
import Profile from "./routes/Profile";
import CustomersProfile from "./routes/CustomersProfile";
import Register from "./routes/Register";
import UserLogin from "./routes/UserLogin";
import ErrorPage from "./ErrorPage";
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Shipping from './components/Shipping';
import ThankYou from './components/ThankYou';
import OrderSummary from './components/OrderSummary';


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
        path: "animals/:id",
        element: <Animal />,
      },
      {
        path: "newAnimal",
        element: <NewAnimal />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "/animal_categories/:id",
        element: <Category />,
      },
      {
        path: "newCategory",
        element: <NewCategory />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "customers_profile",
        element: <CustomersProfile />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <UserLogin />,
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
        path: "thankYouPage",
        element: <ThankYou />,
      },
      {
        path: "orderSummary",
        element: <OrderSummary />
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
