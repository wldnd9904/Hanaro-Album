import { Reducer, useReducer } from "react";

const useToggle = (defaultFlag: boolean = false): [boolean, () => void] => {
  const [flag, toggleFlag] = useReducer<Reducer<boolean, void>>(
    (flag) => !flag,
    defaultFlag
  );
  return [flag, toggleFlag];
};
export default useToggle;
