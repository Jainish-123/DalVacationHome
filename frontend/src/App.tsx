import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Agent } from "./pages/agent/Agent";
import { P404 } from "./pages/P404/P404";
import { Booking } from "./pages/booking/Booking";
import { RoomList } from "./pages/RoomList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import VerifyEmail from "./pages/authentication/Verify";
import SecurityQuestions from "./pages/authentication/Secques";
import { Auth } from "./context/Auth";
import LoginVerify from "./pages/authentication/LoginVerify";
import ProtectedRoute from "./utils/ProtectedRoutes";
import ForgotPassword from "./pages/authentication/ForgetPassword";
import UserProfile from "./pages/authentication/UserProfile";
import AppNavbar from "./components/Navbar";
import { useEffect } from "react";
import { useAuth } from "./context/Auth";

function App() {
  const {getSession, setStatus, status} = useAuth();
  
  return (
    <div className="App"> 
      <Router>
        <AppNavbar/>
       
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/agent" Component={Agent}></Route>
          <Route path="/booking" Component={Booking}></Route>
          <Route path="/room-list" element={<ProtectedRoute><RoomList/></ProtectedRoute>}></Route>
          <Route path="/login" Component={Login}></Route>
          <Route path="/signup" Component={SignUp}></Route>
          <Route path="/verify" Component={VerifyEmail}></Route>
          <Route path="/sec-ques" Component={SecurityQuestions}></Route> 
          <Route path="/login-verify" Component={LoginVerify}></Route>
          <Route path='/forgotpass' Component={ForgotPassword}></Route>
          <Route path='/userprofile' element={<ProtectedRoute><UserProfile/></ProtectedRoute>}></Route>
          <Route path="*" Component={P404}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

