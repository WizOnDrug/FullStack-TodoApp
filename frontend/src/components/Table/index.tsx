import { useDispatch, useSelector } from "react-redux"
import { IUser, User } from "../../interfaces/User"
import { UserState, setData, setUsers } from "../../features/user/userSlice";
import { useEffect } from "react";
import { UserService } from "../../services/user.service";
import Swal from "sweetalert2";

export const Table = () => {
 
    const { user } = useSelector((state:{ user: UserState }) => state);

    const userService = new UserService();
    
    const dispatch = useDispatch();

    const fetchData  = async () => {
        try {
            const res:IUser[] = await userService.getAll()
            dispatch(setUsers(res))
        } catch (error) {
            console.log('Error to failed load ==>',error)
        }
    }
    
    useEffect(()=>{ 
        fetchData() 
    },[ ])
     
    const onClickEdit = (item:IUser) => {
        dispatch(setData(item))
    }

    const onClickDelete = (item:IUser) => {

        Swal.fire({
            title: 'Are you sure you want to delete?',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
          }).then((result) => {
            if (result.isConfirmed) {
                fetchDelete(item)
            } 
          })
          
    }

    const fetchDelete = async (item:IUser) => {
        try {
            await userService.delete(item)
             
            Swal.fire({ 
                icon: 'success',
                title: 'the item has been deleted',
                showConfirmButton: false 
            })

            fetchData()

        } catch (error) {
            console.log('Error to failed load ==>',error)
        }
    }

    const onClickInfo = async (item:IUser) => {

        try { 
            
            const data:IUser = await userService.getById( item.id! )
             
            Swal.fire({
                title: 'Details',
                icon: 'info',
                html:
                  `<b>Name</b> : ${data.name} <br>` ,
                showCloseButton: false,
                showCancelButton: false, 
                confirmButtonText: 'Ok' 
            })

        } catch (error) {
            console.log('Error ==>',error)
        } 
    }

    return (
        <div className="inline-block">

                <button className="bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg"  onClick={()=>dispatch(setData(new User()))}>
                    New
                </button>
                

                <div className="overflow-hidden border border-gray-200 md:rounded-lg">


                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-slate-800">
                            <tr>
                                <th scope="col" className="px-12 py-3.5 text-slate-50 font-medium text-left">
                                    Name
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-slate-50 font-medium text-left">
                                     Actions
                                </th> 
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                user.list.map((item:IUser, i)=>{
                                    return(
                                    <tr key={i}>
                                        <td className="px-12 py-4 whitespace-nowrap">
                                            {item.name}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">
 
                                                <button className="bg-sky-600 text-sky-50 font-semibold py-2 px-4 rounded-lg"  onClick={()=>onClickInfo(item)}>
                                                    Info
                                                </button>

                                                <button className="bg-gray-600 text-gray-50 font-semibold py-2 px-4 rounded-lg"  onClick={()=>onClickEdit(item)}>
                                                    Edit
                                                </button>

                                                <button className="bg-red-600 text-gray-50 font-semibold py-2 px-4 rounded-lg" onClick={()=>onClickDelete(item)}>
                                                    Delete
                                                </button>
                                    
                                            </div>
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                    </table>
                </div> 
        </div>  
    )
}