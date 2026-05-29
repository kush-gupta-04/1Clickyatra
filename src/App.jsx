import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./component/Layout/Navbar";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-luxury-dark text-slate-100 font-sans selection:bg-primary selection:text-luxury-dark">
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
