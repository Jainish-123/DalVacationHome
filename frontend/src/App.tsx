import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Agent } from "./pages/agent/Agent";
import { P404 } from "./pages/P404/P404";
import { Booking } from "./pages/booking/Booking";
import { RoomList } from "./pages/RoomList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { CustomerQueries } from "./pages/customer_queries";
import { AgentQueries } from "./pages/agent_queries";
import { Messaging } from "./pages/messaging";

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/agent' Component={Agent}></Route>
          <Route path='/booking' Component={Booking}></Route>
          <Route path='/customer-queries' Component={CustomerQueries} />
          <Route path='/messaging' Component={Messaging} />
          <Route path='/agent-queries' Component={AgentQueries} />
          <Route path='/room-list' Component={RoomList}></Route>
          <Route path='*' Component={P404}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
