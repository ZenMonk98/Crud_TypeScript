import { useSelector } from "react-redux";
import { RootState } from "../../services/app/store";
import AnimatedLoader from "../loaders/AnimatedLoader";

type ButtonProps = {
  name: string;
  onClick?: (params: any) => any;
  type: "submit" | "button";
};

const Button = (props: ButtonProps) => {
  const loading = useSelector<RootState>((state) => state.auth.loading);

  return (
    <button
      className="border outline-none py-3 text-white tracking-wide uppercase bg-[rgb(156,108,245)] transition-all ease-in-out duration-200 hover:bg-[rgb(136,108,185)] font-semibold flex items-center justify-center"
      type={props.type}
      onClick={props.onClick}
    >
      {loading ? <AnimatedLoader /> : props.name}
    </button>
  );
};

export default Button;