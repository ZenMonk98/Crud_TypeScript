import { Link } from "react-router-dom";

import { RootState } from "../../services/app/store";
import { AppDispatch } from "../../services/app/store";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
} from "../../services/app/actions/userActions";
import { useEffect } from "react";
import Loader from "../../components/loaders/Loader";

const UserList = () => {
  interface UserList {
    _id: string;
    name: string;
    age: number;
    email: string;
  }

  const userList = useSelector<RootState>((state) => state.user.userList);
  const loading = useSelector<RootState>((state) => state.user.loading);

  const dispatch = useDispatch<AppDispatch>();

  const deleteHandler = async (userId: string) => {
    await dispatch(deleteUser(userId));
    dispatch(getAllUsers());
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="mt-20 flex justify-center">
      <div className="">
        {loading === false ? (
          <table className="w-[950px] divide-y-2 divide-gray-200 border">
            <thead className="bg-blue-50">
              <tr className="divide-x-2">
                <th className="px-2 py-4 text-left" scope="col">
                  ID
                </th>
                <th className="px-2 py-4 text-left" scope="col">
                  Name
                </th>
                <th className="px-2 py-4 text-left" scope="col">
                  Age
                </th>
                <th className="px-2 py-4 text-left" scope="col">
                  Email
                </th>
                <th className="px-2 py-4 text-left" scope="col">
                  Edit
                </th>
                <th className="px-2 py-4 text-left" scope="col">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userList) &&
                userList.map((list: UserList, index) => (
                  <tr className="divide-y-2 divide-x-2" key={index}>
                    <td className="px-2 py-4 text-left">{index + 1}</td>
                    <td className="px-2 py-4 text-left">{list.name}</td>
                    <td className="px-2 py-4 text-left">{list.age}</td>
                    <td className="px-2 py-4 text-left">{list.email}</td>
                    <td className="px-2 py-4 text-left">
                      <Link to={`/edit/${list._id}`}>Edit</Link>
                    </td>
                    <td className="px-2 text-left">
                      <button
                        onClick={() => deleteHandler(list._id)}
                        className="border py-1 px-2 bg-red-500 text-white font-semibold cursor-pointer hover:bg-red-700 transition-all ease-in-out"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default UserList;
