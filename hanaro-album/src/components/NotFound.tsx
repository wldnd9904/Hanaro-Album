import { useNavigate } from "react-router-dom";
import { MyButton } from "./common/Button";
import Navbar from "./Navbar";

function NotFound() {
  const navigate = useNavigate();
  const goLogin = () => navigate("/login");
  return (
    <>
      <Navbar />
      <span className="text-red-500">페이지를 찾을 수 없습니다.</span>
      <MyButton onClick={goLogin}>확인</MyButton>
    </>
  );
}

export default NotFound;
