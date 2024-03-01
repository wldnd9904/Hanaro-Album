import { useNavigate, Routes, Route } from "react-router-dom";
import AlbumDetail from "./components/Album/AlbumDetail";
import AlbumLayout from "./components/Album/AlbumLayout";
import { useSession } from "./contexts/sessionContext";
import AlbumList from "./components/Album/AlbumList";
import { VStack } from "./components/common/Stack";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { session } = useSession();

  useEffect(() => {
    if (!session.user) navigate("/login");
  }, [session.user]);

  return (
    <VStack className="shadowed rounded-xl mx-auto my-4 !w-5/6 font-bold">
      <VStack className="min-h-24 w-full pb-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/album" element={<AlbumLayout />}>
            <Route index element={<AlbumList />} />
            <Route path=":albumId" element={<AlbumDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </VStack>
    </VStack>
  );
}

export default App;
