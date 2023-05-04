import Home from "./Component/Home";
import Insight from "./Component/Insight";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insight" element={<Insight />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
