import { BrowserRouter, Routes, Route } from "react-router-dom";
import OAuthSuccess from "./pages/OAuthSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<OAuthSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
