import { useSession } from "../contexts/sessionContext";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect } from "react";

function Profile() {
  const {
    session: { user },
    logout,
  } = useSession();

  // 로그인되어있지 않으면 메인으로
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  if (user)
    return (
      <>
        <span className="text-gray-600">{user.id}</span>
        <span>{user.username}</span>
        <button onClick={logout} aria-label="Sign Out">
          <FaSignOutAlt />
        </button>
      </>
    );
}
export default Profile;
