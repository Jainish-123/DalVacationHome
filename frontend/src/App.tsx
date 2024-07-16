import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Agent } from "./pages/agent/Agent";
import { P404 } from "./pages/P404/P404";
import { CustomerQueries } from "./pages/customer_queries";
import { AgentQueries } from "./pages/agent_queries";
import { Messaging } from "./pages/messaging";
import { PostQuery } from "./pages/post_query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import VerifyEmail from "./pages/authentication/Verify";
import SecurityQuestions from "./pages/authentication/Secques";
import LoginVerify from "./pages/authentication/LoginVerify";
import ForgotPassword from "./pages/authentication/ForgetPassword";
import UserProfile from "./pages/authentication/UserProfile";
import AppNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ChatbotLoader from "./components/ChatbotLoader";
import RoomManagment from "./pages/room_managment/RoomManagment";
import { AddRoom } from "./pages/room_managment/AddRoom";
import Home from "./pages/Home";
import RoomDetails from "./pages/room_managment/RoomDetails";
import BookingHistory from "./pages/bookings/BookingHistory";

function App() {
  return (
    <div className="App">
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/agent" Component={Agent}></Route>
          <Route path="/customer-queries" Component={CustomerQueries} />
          <Route path="/messaging/:customerId/:agentId" Component={Messaging} />
          <Route path="/post-query" Component={PostQuery} />
          <Route path="/agent-queries" Component={AgentQueries} />
          <Route path="/login" Component={Login}></Route>
          <Route path="/signup" Component={SignUp}></Route>
          <Route path="/verify" Component={VerifyEmail}></Route>
          <Route path="/sec-ques" Component={SecurityQuestions}></Route>
          <Route path="/login-verify" Component={LoginVerify}></Route>
          <Route path="/forgotpass" Component={ForgotPassword}></Route>
          <Route path="/userprofile" Component={UserProfile}></Route>
          <Route path="/room-managment" Component={RoomManagment}></Route>
          <Route path="/room-managment/add" Component={AddRoom}></Route>
          <Route path="*" Component={P404}></Route>
          <Route path="/room/:roomId" Component={RoomDetails} />
          <Route path="/booking-history" Component={BookingHistory} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" theme="light" />
      <ChatbotLoader />
    </div>
  );
}

export default App;
