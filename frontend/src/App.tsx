import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Agent } from "./pages/agent/Agent";
import { P404 } from "./pages/P404/P404";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/agent" Component={Agent}></Route>
          <Route path="*" Component={P404}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
