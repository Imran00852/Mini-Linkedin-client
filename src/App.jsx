import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { server } from "./constants/config";

import Home from "./pages/Home";
import Login from "./pages/Login";

import { userExists, userNotExists } from "./redux/reducers/auth";
import { Skeleton } from "@mui/material";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const App = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${server}/user/profile`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data?.user)))
      .catch(() => dispatch(userNotExists()));
  }, []);

  return isLoading ? (
    <Skeleton variant="rectangular" width="100%" height="100vh" />
  ) : (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route
          path="/login"
          element={
            <ProtectedRoute user={!user} redirect="/">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
