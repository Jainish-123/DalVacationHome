import { HashRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Agent } from "./pages/agent/Agent";
import { P404 } from "./pages/P404/P404";
import { Booking } from "./pages/booking/Booking";
import { RoomList } from "./pages/RoomList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/agent" Component={Agent}></Route>
          <Route path="/booking" Component={Booking}></Route>
          <Route path="/room-list" Component={RoomList}></Route>
          <Route path="*" Component={P404}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
