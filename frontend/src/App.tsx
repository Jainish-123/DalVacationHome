import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Agent } from "./pages/agent/Agent";
import { P404 } from "./pages/P404/P404";
import { Booking } from "./pages/booking/Booking";
import { RoomManagment } from "./pages/room_managment/RoomManagment";
import { AddRoom } from "./pages/room_managment/AddRoom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/agent" Component={Agent}></Route>
          <Route path="/booking" Component={Booking}></Route>
          <Route path="/room_managment" Component={RoomManagment}></Route>
          <Route path="/room_managment/add" Component={AddRoom}></Route>
          <Route path="*" Component={P404}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
