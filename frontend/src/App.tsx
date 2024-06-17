import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import RoomList from "./pages/RoomList";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div className='App'>

      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path="/room-list" Component={RoomList} />
        </Routes>
        <ChatBot />
      </BrowserRouter>

    </div>
  );
}

export default App;
