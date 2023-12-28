import { api, headerAPI } from "../configs/axios";
import { IUser } from '../interfaces/User';


export class UserService {

    private apiURL = "v1/users";

    public async getAll() {
        try {
            console.log("Consulto")
            const response = await api.get<IUser[]>(`${this.apiURL}`)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async post(data:IUser) {
        try {
            const response = await api.post<IUser>(`${this.apiURL}`, data, headerAPI)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async getById(id:number){
        try {
            const response = await api.get<IUser>(`${this.apiURL}/${id}`, headerAPI)
            const data: IUser = response.data 
            return data          
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async put(data:IUser) {
        try {
            const response = await api.put<IUser>(`${this.apiURL}/${data.id}`, data, headerAPI)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async delete(data:IUser) {
        try {
            const response = await api.delete(`${this.apiURL}/${data.id}`, headerAPI)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

}