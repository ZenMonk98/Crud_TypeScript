import { ChangeEvent } from "react";

type InputProps = {
  type: "text" | "number" | "email" | "password";
  placeholder: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: InputProps) => {
  return (
    <input
      className="border border-gray-500 outline-none px-4 py-3 tracking-wide"
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default Input;
