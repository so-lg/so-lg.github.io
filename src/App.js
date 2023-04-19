import logo from './Logo.png';
import './App.css';
import { Routes, Route} from "react-router-dom";
import About from "./routes/About";
import Wiki from "./routes/Wiki";
import Home from "./routes/Home";
import NavigationBar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
