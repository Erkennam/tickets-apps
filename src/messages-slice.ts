import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "./auth/Registration";
import { ticket } from "./ticket-slice";
import axios from "axios";

export interface message {
    _id: string,
    sender: User,
    message: string,
    ticket: ticket,
    createdAt? : Date,
}

interface initialState {
    messages: message[],
}

export const getMessages:any = createAsyncThunk(
    '/messages/getMessages',
    async (ticket:string)=>{
        try{
            const resp = await axios.get(`http://localhost:3001/chat/${ticket}`);
            return resp.data;
        } catch (err) {
            console.log(err);
        }
    }
)

const initialState:initialState = {
    messages: [],
}

const MessagesSlice = createSlice({
    name: 'messageSlice',
    initialState,
    reducers:{

    },
    extraReducers: (builder)=>{
        builder.addCase(getMessages.fulfilled, (state,{payload})=>{
            state.messages = payload;
        })
    }
})

export default MessagesSlice.reducer;