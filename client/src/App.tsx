import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/Authentication/LoginScreen";
import SignupScreen from "./pages/Authentication/SignupScreen";
import HomeScreen from "./components/layout/HomeScreen";
import { useDispatch } from "react-redux";
import { userInfo } from "./services/app/actions/authActions";
import { useEffect } from "react";

import { AppDispatch } from "./services/app/store";
import EditInfo from "./pages/User/EditInfo";
import CreateUser from "./pages/User/CreateUser";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(userInfo());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/signin" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/edit/:userId" element={<EditInfo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
