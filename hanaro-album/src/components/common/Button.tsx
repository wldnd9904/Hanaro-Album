import { ButtonHTMLAttributes, PropsWithChildren } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const MyButton = (props: PropsWithChildren<ButtonProps>) => {
  const { children, className, ...attributes } = props;
  return (
    <button
      {...attributes}
      className={`text-white bg-gray-400 enabled:bg-green-500 font-semibold enabled:font-extrabold rounded-md py-1 px-4 box-border transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};
