import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import { signIn, userInfo } from "../../services/app/actions/authActions";
import { AppDispatch } from "../../services/app/store";

import { useState } from "react";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(signIn({ username, password })).then((data) => {
      if (data.payload.success === true) {
        dispatch(userInfo());
        navigate("/");
      } else {
        if (data.payload.message === "Request failed with status code 401") {
          setError("Invalid Username");
        } else {
          setError(data.payload.message);
        }
      }
    });
  };

  return (
    <div className="h-[100vh] bg-[#F2F2F2] flex justify-center items-center p-10">
      <div className="w-[400px] h-[450px] bg-white border-black px-4 shadow-lg">
        <h2 className="my-[50px] text-xl font-semibold text-center uppercase ">
          Login to continue
        </h2>

        <form onSubmit={loginHandler} className="flex flex-col  gap-5 ">
          {error ? (
            <p className="text-xs font-semibold flex gap-1 items-center text-red-700">
              <span>
                <RiErrorWarningFill />
              </span>
              {error}
            </p>
          ) : null}
          <Input
            type="email"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button name="Sign In" type="submit" />
        </form>

        <div className="my-2">
          <span className="mr-2 uppercase text-sm tracking-wide">
            New User ?{" "}
          </span>
          <Link
            className="hover:text-gray-600 uppercase text-sm font-semibold tracking-wide"
            to="/signup"
          >
            Click Here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
