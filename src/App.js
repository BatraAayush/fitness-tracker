import { Navbar } from "./components/navbar/Navbar";
import { Exercises } from "./pages/exercises/Exercises";
import { Food } from "./pages/food/Food";
import { Goal } from "./pages/goal/Goal";
import { Home } from "./pages/home/Home";
import "./App.css"
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/food" element={<Food />} />
        <Route path="/goal" element={<Goal />} />
      </Routes>
    </div>
  );
}
