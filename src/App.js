import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/loginSignup/Login";
import Signup from "./pages/loginSignup/Signup";
import Home from "./pages/home/Home"
import { useAuthContext } from "./hooks/useAuthContext";
import Create from "./pages/create/Create";
import View from "./pages/view/View";
import Edit from "./pages/edit/Edit";

function App() {

  const Layout = ({ children }) => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    )
  }

  const { user } = useAuthContext()

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />
    }
    return children;
  }
  const AccessRoute = ({ children }) => {
    if (user) {
      return <Navigate to="/" />
    }
    return children;
  }

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <AccessRoute><Login /></AccessRoute>
    },
    {
      path: '/signup',
      element: <AccessRoute><Signup /></AccessRoute>
    },
    {
      path: '/',
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/create',
          element: <Create />,
        },
        {
          path: '/view/:id',
          element: <View />,
        },
        {
          path: '/edit/:id',
          element: <Edit />,
        },
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
