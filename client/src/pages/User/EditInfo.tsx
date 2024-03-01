import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../services/app/store";
import {
  getAllUsers,
  updateUser,
} from "../../services/app/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";

const EditInfo = ({}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { userId } = useParams();



  const updateUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateUser({ userId, name, age, email }))
    dispatch(getAllUsers());

    navigate("/");
  };

  return (
    <div className="h-[100vh] bg-[#F2F2F2] flex justify-center items-center p-10">
      <div className="w-[400px] h-[480px] bg-white border-black px-4 shadow-lg">
        <h2 className="mt-[50px] mb-[35px] text-xl font-semibold text-center uppercase ">
          Update user Info
        </h2>
        <form onSubmit={updateUserHandler} className="flex flex-col  gap-5 ">
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

          <Button name="Update User" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default EditInfo;
