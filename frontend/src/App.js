import { Training } from "pages/dashboard/training/Training";
import "./App.css";
import Chatbot from "./components/chatbot/Chatbot";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "pages/dashboard/home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Chatbot />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
