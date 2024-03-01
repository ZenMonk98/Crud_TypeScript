import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../services/app/store";
import { createUser } from "../../services/app/actions/userActions";
import { getAllUsers } from "../../services/app/actions/userActions";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const createUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createUser({ name, age, email }));
    dispatch(getAllUsers());

    navigate("/");
  };

  return (
    <div className="h-[100vh] bg-[#F2F2F2] flex justify-center items-center p-10">
      <div className="w-[400px] h-[480px] bg-white border-black px-4 shadow-lg">
        <h2 className="mt-[50px] mb-[35px] text-xl font-semibold text-center uppercase ">
          create user
        </h2>
        <form onSubmit={createUserHandler} className="flex flex-col  gap-5 ">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button name="Create User" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
