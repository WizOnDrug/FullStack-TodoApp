import { IUser, User } from "../../interfaces/User";
import { useDispatch, useSelector } from "react-redux";
import { UserState, setData, setUsers } from "../../features/user/userSlice";
import { UserService } from "../../services/user.service";
import Swal from "sweetalert2";
import { useState } from "react";
export const Form = () => {
  const { user } = useSelector((state: { user: UserState }) => state);

  const [errorForm, setErrorForm] = useState({
    name: false,
    title: false,
    status: false,
  });

  const dispatch = useDispatch();

  const isValidForm = () => {
    const error = { name: false, title: false, status: false };

    if (!user.data.name) error.name = true;
    if (!user.data.title) error.title = true;
    if (!user.data.status) error.status = true;

    setErrorForm(error);

    return error.name ;
  };

  const userService = new UserService();

  const setFormValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setData({ ...user.data, [event.target.id]: event.target.value }));
  };

  const handleStatusChange = (status: string) => {
    dispatch(setData({ ...user.data, status }));
  };

  const fetchUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data: IUser = await userService.put(user.data);
      const dataArray: IUser[] = [...user.list];
      let index: number = dataArray.findIndex(
        (item: IUser) => item.id === data.id
      );
      dataArray.splice(index, 1, data);
      dispatch(setUsers(dataArray));
      dispatch(setData(new User()));

      Swal.fire({
        icon: "success",
        title: "The data has been updated",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (isValidForm()) return null;

      const data: IUser = await userService.post(user.data);
      dispatch(setData(new User()));
      const dataArray: IUser[] = [...user.list];
      dataArray.push(data);
      dispatch(setUsers(dataArray));
      Swal.fire({
        icon: "success",
        title: "The data has been saved",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const inputCSS =
    "block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 mb-4";
  const inputError = " border-red-400";

  return (
    <div className="px-8 py-4 pb-8 rounded-lg bg-gray-500 bg-opacity-20 shadow-xl w-[400px] flex justify-center ">
      <form onSubmit={(e) => (user.data.id ? fetchUpdate(e) : fetchCreate(e))}>
        <div className="mt-4">
          <label className="mb-2 text-slate-300">Name :</label>
          <input
            id="name"
            type="text"
            placeholder="Name Of Task"
            value={user.data.name}
            onChange={(e) => setFormValue(e)}
            className={errorForm.name ? inputCSS + inputError : inputCSS}
          />
          
          {errorForm.name && (
            <p className="mt-1 text-m text-red-400">Please Set Your Task Name</p>
          )}
          <label className="mb-2 text-slate-300">Detail :</label>
          <input
            id="title"
            type="text"
            placeholder="Task"
            value={user.data.title}
            onChange={(e) => setFormValue(e)}
            className={errorForm.title ? inputCSS + inputError : inputCSS}
          />
          {errorForm.title && (
            <p className="mt-1 text-m text-red-400">Please Set Your Task Detail</p>
          )}
          <label className="mb-2 text-slate-300 mt-6">Importance :</label>
          <div className={`flex gap-9 mt-3 mb-3 border-2 rounded-2xl p-2 ${(user.data.status === "Low" ? "border-green-500" : (user.data.status === "Medium" ?"border-yellow-500" :"border-red-500" ))}`}>

            <button
              type="button"
              className={`w-1/3 ${
                user.data.status === "Low"
                  ? "rounded-lg bg-green-500 bg-opacity-20 shadow-xl w-1/2 p-2 h-11  hover:bg-green-500 hover:bg-opacity-30 duration-300 text-green-400"
                  : "text-green-400"
              }`}
              onClick={() => handleStatusChange("Low")}
            >
              Low
            </button>
            <button
              type="button"
              className={`w-1/3 ${
                user.data.status === "Medium"
                  ? "rounded-lg text-yellow-400 bg-yellow-500 bg-opacity-20 p-2 shadow-xl w-1/2 h-11   hover:bg-opacity-30 duration-300 "
                  : "text-yellow-400"
              }`}
              onClick={() => handleStatusChange("Medium")}
            >
              Medium
            </button>
            <button
              type="button"
              className={`w-1/3 ${
                user.data.status === "High"
                  ? "rounded-lg bg-red-500 bg-opacity-20 shadow-xl w-1/2 p-2 h-11  hover:bg-opacity-30 duration-300 text-red-400"
                  : "text-red-400"
              }`}
              onClick={() => handleStatusChange("High")}
            >
              High
            </button>
          </div>
          {errorForm.status && (
            <p className="mt-1 text-m text-red-400">Please Set Your Task Importance</p>
          )}
          {}
        </div>
        <button className="rounded-lg bg-gray-500 bg-opacity-20 shadow-xl w-1/2 h-11  hover:bg-opacity-30 duration-300 text-indigo-400">
          {user.data.id ? "Save" : "Create"}
        </button>
      </form>
    </div>
  );
};
