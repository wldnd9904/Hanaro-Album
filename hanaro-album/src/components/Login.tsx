import { useRef, useState, useEffect, FormEventHandler } from "react";
import { useSession } from "../contexts/sessionContext";
import { useFetchTrigger } from "../hooks/useFetch";
import { HStack, VStack } from "./common/Stack";
import { useNavigate } from "react-router-dom";
import { UserType } from "../contexts/session";
import { userURL } from "../utils/urlFactory";
import { MyButton } from "./common/Button";
import Navbar from "./Navbar";

type SignCheckType = [boolean, string];

function Login() {
  const [signable, setSignable] = useState<SignCheckType>([false, ""]);
  const { data, isLoading, trigger } = useFetchTrigger<UserType>();
  const idRef = useRef<HTMLInputElement>(null);
  const { session, setUser } = useSession();
  const navigate = useNavigate();

  const checkSignable = () => {
    if (!idRef.current || !idRef.current.value) {
      setSignable([false, "ID를 입력해 주세요."]);
      return;
    }
    const id = +idRef.current.value;
    if (id < 1 || id > 10) {
      setSignable([false, "User ID는 1~10번만 가능합니다."]);
      return;
    }
    setSignable([true, ""]);
  };

  const submitLogin: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    trigger(userURL(+idRef.current!.value));
  };

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  useEffect(() => {
    if (session.user) navigate("/album");
  }, [session.user]);

  if (isLoading)
    return (
      <VStack className="min-h-28 w-full">
        <Navbar />
        로그인 중...
      </VStack>
    );

  return (
    <form onSubmit={submitLogin} className="w-full min-h-28">
      <VStack className="w-full">
        <Navbar />
        <HStack>
          <input
            className="border-2 focus:border-4 border-blue-500 font-bold box-border w-28 h-8 p-1 mr-1"
            id="User ID"
            type="number"
            placeholder="User ID..."
            ref={idRef}
            onChange={checkSignable}
          />
          <MyButton className="w-24 h-8" type="submit" disabled={!signable[0]}>
            Sign In
          </MyButton>
        </HStack>
        <p className="text-red-500 font-bold text-center">{signable[1]}</p>
      </VStack>
    </form>
  );
}

export default Login;
