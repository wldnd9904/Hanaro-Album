import { HTMLAttributes, PropsWithChildren } from "react";
interface StackProps extends HTMLAttributes<HTMLDivElement> {
  rotated?: boolean;
}

export const VStack = (props: PropsWithChildren<StackProps>) => {
  const { children, className, rotated, ...attributes } = props;
  return (
    <div
      {...attributes}
      className={`flex ${rotated ? "flex-row h-full" : "flex-col w-full"} items-center gap-1 ${className}`}
    >
      {children}
    </div>
  );
};

export const HStack = (props: PropsWithChildren<StackProps>) =>
  VStack({ ...props, rotated: !props.rotated });

export const Spacer = () => <div className="flex-grow" />;
