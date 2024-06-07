import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' Component={Home}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
