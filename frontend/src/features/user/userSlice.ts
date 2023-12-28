import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, User } from '../../interfaces/User';

export interface UserState {
    data: IUser;
    list: IUser[]
}

const initialState: UserState = {
    data: new User(),
    list: []
} 

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: { 
        setData: (state, action: PayloadAction<IUser>) => {
            state.data = action.payload
        },
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.list = action.payload
        },
    }
})

export const { setData, setUsers } = userSlice.actions

export default userSlice.reducer