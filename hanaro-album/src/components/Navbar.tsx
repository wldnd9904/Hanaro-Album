import { HStack, Spacer } from "./common/Stack";
import { PropsWithChildren } from "react";

function Navbar({ children }: PropsWithChildren) {
  return (
    <HStack className="bg-blue-500 rounded-t-xl px-4 w-full mb-4">
      <HStack>
        <span className="text-red-500">●</span>
        <span className="text-yellow-500">●</span>
        <span className="text-green-500">●</span>
      </HStack>
      <Spacer />
      <span className="text-white">Hanaro Album</span>
      <Spacer />
      {children}
    </HStack>
  );
}
export default Navbar;
