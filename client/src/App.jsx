import './styles/app.scss'
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/:id" element={
                  <div className="app">
                      <Toolbar/>
                      <SettingBar/>
                      <Canvas/>
                  </div>
              }/>
              <Route path="*" element={<Navigate to={`/f${(+new Date()).toString(16)}`} replace />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
