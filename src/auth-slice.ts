import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./auth/Registration";
import axios from "axios";

export enum UserRole {
    Admin = 'admin',
    User = 'user',
}

interface initialState{
    auth: boolean,
    loginError: boolean | any,
    profile: User | boolean,
    role: boolean | string,
    users: User[],
}

export const Register:any = createAsyncThunk(
    '/users/register',
    async (data:User)=> {
        try {
            const resp = await axios.post('http://localhost:3001/users/signup', data);
            console.log(resp);
            return resp.data;
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
        }
    }
)

export const Authorization:any = createAsyncThunk(
    '/users/login',
    async (data: User, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3001/users/login', data);
            localStorage.setItem('token', response.data.token);
            const profileResponse = await axios.get('http://localhost:3001/users/profile', {
                headers: {
                    Authorization: `Bearer ${response.data.token}`,
                },
            });
            localStorage.setItem('userProfile', JSON.stringify(profileResponse.data));
            return profileResponse.data;
        } catch (error) {
            return rejectWithValue('ошибка авторизаций: неверный email или пароль');
        }
    }
)

export const getProfile = createAsyncThunk(
    '/users/getProfile',
    async (token: string, { rejectWithValue }) => {
      try {
        const profileResponse = await axios.get('http://localhost:3001/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(profileResponse);
        return profileResponse.data;
      } catch (err) {
        console.log(err);
        return rejectWithValue('Ошибка при загрузке профиля');
      }
    }
);

export const getAllUsers:Promise<User> | any = createAsyncThunk(
    '/users/getAllUsers',
    async () => {
        try{
            const resp = await axios.get('http://localhost:3001/users');
            return resp.data;
        } catch (err) {
            console.log(err);
        }
    }
)

const initialState:initialState ={
    auth: false,
    loginError: false,
    profile: false,
    role: false,
    users: [],
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers : {
        logoutUser: (state)=>{
            state.auth = false;
            state.profile = false;
            localStorage.removeItem('token');
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(Register.fulfilled,(state,{payload})=>{
            state.profile = payload;
        })
        builder.addCase(Authorization.fulfilled, (state,{payload})=>{
            state.profile = payload;
            state.auth = true;
        })
        builder.addCase(getProfile.fulfilled, (state,{payload})=>{
            state.profile = payload;
            state.role = payload.role;
            state.auth = true;
        })
        builder.addCase(getProfile.rejected,(state,{payload})=>{
            state.loginError = payload;
        })
        builder.addCase(getAllUsers.fulfilled, (state,{payload})=>{
            state.users = payload
        })
    }
})

export const {logoutUser} = authSlice.actions;
export default authSlice.reducer;