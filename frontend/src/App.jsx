import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainProvider } from "./context/mainContext";
import { Main } from "./pages/Main";

function App() {

  return (
    <MainProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </MainProvider>
  )
}

export default App
