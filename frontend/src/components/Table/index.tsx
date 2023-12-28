import { useDispatch, useSelector } from "react-redux";
import { IUser, User } from "../../interfaces/User";
import { UserState, setData, setUsers } from "../../features/user/userSlice";
import { useEffect, useState } from "react";
import { UserService } from "../../services/user.service";
import Swal from "sweetalert2";

export const Table = () => {
  const { user } = useSelector((state: { user: UserState }) => state);
  const userService = new UserService();
  const [selectedStatusMap, setSelectedStatusMap] = useState<{
    [key: string]: string;
  }>({});
  const [selectedItem, setSelectedItem] = useState<IUser | null>(null);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res: IUser[] = await userService.getAll();
      dispatch(setUsers(res));
    } catch (error) {
      console.log("Error to failed load ==>", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickEdit = (item: IUser) => {
    dispatch(setData(item));
  };

  const onClickDelete = (item: IUser) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchDelete(item);
      }
    });
  };

  const fetchDelete = async (item: IUser) => {
    try {
      await userService.delete(item);

      Swal.fire({
        icon: "success",
        title: "the task has been deleted",
        showCancelButton: true,
        confirmButtonText: "Confirm",
      });

      fetchData();
    } catch (error) {
      console.log("Error to failed load ==>", error);
    }
  };

  const onClickInfo = async (item: IUser) => {
    try {
      const data: IUser = await userService.getById(item.id!);

      Swal.fire({
        title: "Details",
        icon: "info",
        html: `
        <b>Name</b> : ${data.name} <br>
        <b>Title</b> : ${data.title} <br>
        <b>Importance</b>: ${data.status}`,

        showCloseButton: false,
        showCancelButton: false,
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.log("Error ==>", error);
    }
  };

  const onClickStatus = (status: string, item: IUser) => {
    setSelectedStatusMap((prevMap) => ({
      ...prevMap,
      [item.id!]: status,
    }));
    setSelectedItem(item);
    if (status === "Complete") {
      Swal.fire({
        title: `Task Complete! <br>
        Do you want Remove Task from Task List?`,
        icon: "success",
        html: `
            <b>Name</b> : ${item.name} <br>
            <b>Title</b> : ${item.title} <br>`,
        showCancelButton: true,
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          fetchDelete(item);
        }
      });
    } else {
      Swal.fire({
        title: "Task In Progress",
        icon: "info",
        html: `
            <b>Name</b> : ${item.name} <br>
            <b>Title</b> : ${item.title} <br>
            <b>Importance</b>: ${item.status}`,

        showCloseButton: false,
        showCancelButton: false,
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="inline-block">
      <button
        className="rounded-lg bg-gray-500 bg-opacity-20 shadow-xl w-20 h-11 mt-4 mb-4 hover:bg-opacity-30 duration-300 text-indigo-400"
        onClick={() => dispatch(setData(new User()))}
      >
        Reset
      </button>

      <div className="overflow-hidden rounded-lg bg-gray-500 bg-opacity-20 shadow-xl w-full">
        <table className="min-w-full divide-y divide-gray-200 rounded-xl">
          <thead className="bg-slate-500 bg-opacity-20 ">
            <tr>
              <th className="py-4 text-slate-50 font-medium justify-center flex">
                Name
              </th>
              <th className="py-4 text-slate-50 font-medium ">Title</th>
              <th className="py-4 text-slate-50 font-medium">Actions</th>
              <th className="py-4 text-slate-50 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 rounded-lg bg-gray-400 bg-opacity-10 shadow-xl  flex-col  justify-between items-center ml-3 align-middle pt-3 pb-3">
            {user.list
              .slice()
              .sort((a, b) => {
                const statusOrder: { [key: string]: number } = {
                    Low: 1,
                    Medium: 2,
                    High: 3,
                  };
                return statusOrder[b.status] - statusOrder[a.status];
              })
              .map((item: IUser, i) => (
                <tr
                  key={i}
                  className={`${
                    item.status === "Low"
                      ? "bg-green-500 bg-opacity-20"
                      : item.status === "Medium"
                      ? "bg-yellow-500 bg-opacity-20"
                      : "bg-red-500 bg-opacity-10 "
                  }`}
                >
                  <td
                    className={`py-4 whitespace-nowrap justify-center flex ${
                      selectedStatusMap[item.id!] === "In Progress"
                        ? "border-yellow-500 border-2 rounded-lg m-3 inline-block"
                        : selectedStatusMap[item.id!] === "Complete"
                        ? "border-green-500 border-2 rounded-lg m-3 inline-block line-through"
                        : ""
                    }`}
                  >
                    {item.name}
                  </td>
                  <td
                    className={`py-4 whitespace-nowrap justify-center text-center ${
                      item.status === "Low"
                        ? "text-green-500"
                        : item.status === "Medium"
                        ? "text-yellow-500"
                        : "text-red-500 bg-opacity-10 m-2 rounded-lg"
                    }`}
                  >
                    {item.title}
                  </td>
                  <td className="whitespace-nowrap align-middle justify-center flex">
                    <div className="justify-center flex gap-x-2">
                      <button
                        className="bg-sky-600 bg-opacity-70 text-sky-50 font-semibold py-2 px-4 rounded-lg"
                        onClick={() => onClickInfo(item)}
                      >
                        Info
                      </button>
                      <button
                        className="bg-gray-500 bg-opacity-70 text-gray-50 font-semibold py-2 px-4 rounded-lg"
                        onClick={() => onClickEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 bg-opacity-70 text-gray-50 font-semibold py-2 px-4 rounded-lg"
                        onClick={() => onClickDelete(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td className="whitespace-nowrap align-middle justify-center ">
                    <div className="justify-center flex gap-x-2">
                      <button
                        className={`bg-yellow-500 bg-opacity-60 text-gray-50 font-semibold py-2 px-4 rounded-lg ${
                          selectedStatusMap[item.id!] === "Complete"
                            ? "disabled:opacity-20 cursor-not-allowed "
                            : ""
                        }`}
                        onClick={() => onClickStatus("In Progress", item)}
                        disabled={selectedStatusMap[item.id!] === "Complete"}
                      >
                        In Progress
                      </button>
                      <button
                        className="bg-green-600 bg-opacity-60 text-gray-50 font-semibold py-2 px-4 rounded-lg"
                        onClick={() => onClickStatus("Complete", item)}
                      >
                        Complete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
