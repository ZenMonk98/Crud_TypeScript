import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AppDispatch } from "../../services/app/store";
import { useDispatch } from "react-redux";

// UI Components
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { signUp } from "../../services/app/actions/authActions";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUp({ name, username, password })).then((data) => {
      if (data.payload.success === true) {
        navigate("/signin");
      } else {
        alert(data.payload.message);
      }
    });
  };

  return (
    <div className="h-[100vh] bg-[#F2F2F2] flex justify-center items-center p-10">
      <div className="w-[400px] h-[480px] bg-white border-black px-4 shadow-lg">
        <h2 className="my-[50px] text-xl font-semibold text-center uppercase ">
          Signup
        </h2>
        <form onSubmit={loginHandler} className="flex flex-col  gap-5 ">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button name="Sign Up" type="submit" />
        </form>
        <div className="my-2">
          <span className="mr-2 uppercase text-sm tracking-wide">
            Already a User ?{" "}
          </span>
          <Link
            className="hover:text-gray-600 uppercase text-sm font-semibold tracking-wide"
            to="/signin"
          >
            Click Here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
