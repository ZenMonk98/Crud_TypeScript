import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/app/store";
import { Link } from "react-router-dom";
import { logOut } from "../../services/app/features/authSlice";

const Header = () => {
  const isAuthenticated = useSelector<RootState>(
    (state) => state.auth.isAuthenticated
  );

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logOut());
  };

  return (
    <div className="px-10 flex justify-between items-center h-[60px] shadow-md">
      <div className="">
        <h2 className="font-semibold uppercase text-lg">Yano Assignment</h2>
      </div>

      <div>
        {isAuthenticated ? (
          <div className="flex justify-center items-center">
            <Link
              className="border bg-blue-400 hover:bg-blue-500 px-5 py-3 font-semibold text-white transition-all ease-in-out"
              to="/create"
            >
              Create User
            </Link>
            <button
              className=" bg-blue-400 hover:bg-blue-500 px-5 py-3 font-semibold text-white transition-all ease-in-out ml-4"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link
              className="border bg-blue-400 hover:bg-blue-500 px-5 py-3 font-semibold text-white transition-all ease-in-out uppercase"
              to="/signin"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
