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
  });

  const dispatch = useDispatch();

  const isValidForm = () => {
    const error = { name: false };

    if (!user.data.name) error.name = true;

    setErrorForm(error);

    return error.name;
  };

  const userService = new UserService();

  const setFormValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setData({ ...user.data, [event.target.id]: event.target.value })
    );
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
    "block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40";
  const inputError = " border-red-400";

  return (
    <div className="px-8 py-4 pb-8 rounded-lg bg-gray-50">
      <form
        onSubmit={(e) => (user.data.id ? fetchUpdate(e) : fetchCreate(e))}
      >
        <div className="mt-4">
          <label className="mb-2  text-gray-800">Name</label>
          <input
            id="name"
            type="text"
            placeholder="WiZ On DruG"
            value={user.data.name}
            onChange={(e) => setFormValue(e)}
            className={errorForm.name ? inputCSS + inputError : inputCSS}
          />
          {errorForm.name && (
            <p className="mt-1 text-m text-red-400">
              This is field is required
            </p>
          )}
        </div>
        <button className="w-full mt-8 bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg">
          {user.data.id ? "Save" : "Create"}
        </button>
      </form>
    </div>
  );
};
