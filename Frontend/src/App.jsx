import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Home from "./components/section/home/Home";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Verify from "./components/pages/Verify";
import VerifyEmail from "./components/pages/VerifyEmail";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Profile from "./components/pages/Profile";
import Product from "./components/section/Product_Category_Collection/Product";
import ShopingCart from "./components/section/ShopingCart/ShopingCart";
import Dashboard from "./components/section/Dashboard/Dashboard";
import AdminSales from "./components/section/Dashboard/Admin/Admin_sales/AdminSales";
import AddProduct from "./components/section/Dashboard/Admin/Add_Product/AddProduct";
import AdminProduct from "./components/section/Dashboard/Admin/Admin_Product/AdminProduct";
import AdminOrder from "./components/section/Dashboard/Admin/Admin_Order/AdminOrder";
import ShowUserOrders from "./components/section/Dashboard/Admin/ShowUserOrders";
import AdminUser from "./components/section/Dashboard/Admin/Admin_Users/AdminUser";
import UserInfo from "./components/section/Dashboard/Admin/User_info/UserInfo";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import SingleProduct from "./components/section/Product_Category_Collection/SingleProduct";
import AddressForm from "./components/pages/AddressForm";
import OrderSuccess from "./components/pages/OrderSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />,<Footer />
      </>
    ),
  },

  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/verify", element: <Verify /> },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Navbar /> <Profile />{" "}
      </ProtectedRoute>
    ),
  },
  { path: "/verify-email/:token", element: <VerifyEmail /> },

  {
    path: "/collection",
    element: (
      <>
        <Navbar />
        <Product />
      </>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <>
        <Navbar />

        <SingleProduct />
      </>
    ),
  },
  {
    path: "/shoping-cart",
    element: (
      <>
        <Navbar />
        <ShopingCart />
      </>
    ),
  },
  {
    path: "/address",
    element: (
      <>

        <AddressForm />
      </>
    ),
  },
  {
    path: "/order-success",
    element: (
      <>
        <OrderSuccess />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: <>
      <ProtectedRoute adminOnly={true}>
        <Navbar />
        <Dashboard />

      </ProtectedRoute>
    </>,
    children: [
      {
        path: "sales",
        element: <AdminSales />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "products",
        element: <AdminProduct />,
      },
      {
        path: "orders",
        element: <AdminOrder />,
      },
      {
        path: "users/orders/:userId",
        element: <ShowUserOrders />,
      },
      {
        path: "users",
        element: <AdminUser />,
      },

      { path: "user/:userId", element: <UserInfo /> }
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
