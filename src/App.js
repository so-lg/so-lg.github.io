import './App.css';
import { Routes, Route} from "react-router-dom";
import About from "./routes/About";
import Wiki from "./routes/Wiki";
import Home from "./routes/Home";
import UniverseOrigin from "./routes/WikiDir/UniverseOrigin";
import DndCharacterCreation from "./routes/WikiDir/DndCharacterCreation";
import UinderalCharactersFactions from "./routes/WikiDir/UinderalCharactersFactions";
import UinderalCreaturesRacesEntities from "./routes/WikiDir/UinderalCreaturesRacesEntities";
import UinderalEnergiesItems from "./routes/WikiDir/UinderalEnergiesItems";
import UniverseDimensions from "./routes/WikiDir/UniverseDimensions";
import UniverseHistory from "./routes/WikiDir/UniverseHistory";
import UniversePlanes from "./routes/WikiDir/UniversePlanes";
import NavigationBar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/wiki/UniverseOrigin" element={<UniverseOrigin />} />
        <Route path="/wiki/UniverseDimensions" element={<UniverseDimensions />} />
        <Route path="/wiki/UniversePlanes" element={<UniversePlanes />} />
        <Route path="/wiki/UinderalEnergiesItems" element={<UinderalEnergiesItems />} />
        <Route path="/wiki/UinderalCharactersFactions" element={<UinderalCharactersFactions />} />
        <Route path="/wiki/UinderalCreaturesRacesEntities" element={<UinderalCreaturesRacesEntities />} />
        <Route path="/wiki/DnDCharacterCreation" element={<DndCharacterCreation />} />
        <Route path="/wiki/UniverseHistory" element={<UniverseHistory />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
