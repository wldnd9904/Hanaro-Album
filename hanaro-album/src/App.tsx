import { Route, Routes } from "react-router-dom";
import Album from "./components/Album";
import { SessionProvider } from "./contexts/sessionContext";

function App() {
  return (
    <SessionProvider>
      <Routes>
        <Route path="/" element={<Album />} />
      </Routes>
    </SessionProvider>
  );
}

export default App;
