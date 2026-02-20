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
  { path: "/profile", element:<><Navbar/> <Profile />  </>},
  { path: "/verify-email/:token", element: <VerifyEmail /> },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
