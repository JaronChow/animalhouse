import './style/App.css';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Root from "./routes/Root";
import Home from "./routes/Home";
import Animals from "./components/Animals";
import Animal from "./components/Animal";
import NewAnimal from "./components/NewAnimal";
import Categories from "./routes/Categories";
import EditAnimals from './routes/EditAnimals';
import EditAnimal from './components/EditAnimal';
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
import { Toast } from 'react-bootstrap';


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
        path: "categories/:category_name",
        element: <Animals />,
      },
      {
        path: "categories/:category_name/:id",
        element: <Animal />,
      },
      {
        path: "newAnimal",
        element: <NewAnimal />,
      },
      {
        path: "animals",
        element: <EditAnimals />,
      },
      {
        path: "animals/:id",
        element: <EditAnimal />,
      },
      {
        path: "categories",
        element: <Categories />,
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
      <Toast/>
      <RouterProvider router={router} /> 
    </div>
  );
}

export default App;
