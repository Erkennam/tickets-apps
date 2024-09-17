import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./auth/Registration";
import { filterParams } from "./components/filtersComponent";
import { toast } from "react-toastify";

export interface ticket {
    _id?:string,
    title: string;
    description: string;
    status: boolean | string;
    user: User,
    type: string; 
    priority: string;
    ticketId: string; 
    createdAt: Date;
    updatedAt: Date;
}

export const CreatingTicket:any = createAsyncThunk(
    '/tickets/createTicket',
    async (data) => {
        try {
           const resp = await axios.post('http://localhost:3001/tickets',data);
           console.log(resp);
        } catch (err) {
            console.log(err);
        }
    }
)

export const GetTickets:any = createAsyncThunk(
    '/tickets/getTickets',
    async ()=>{
        try {
            const resp = await axios.get('http://localhost:3001/tickets');
            return resp.data;
        } catch (err) {
            console.log(err);
        }
    }
)

export const DeleteTicket:any = createAsyncThunk(
    '/tickets/deleteTicket',
    async (id:string)=>{
        try{
            await axios.delete(`http://localhost:3001/tickets/${id}`);
            toast.success('успешно удалено');
        } catch (err) {
            console.log(err);
        }
    }
)

export const GetTicketbyId:any = createAsyncThunk(
    '/tickets/getTicketById',
    async (id:string)=>{
        try{
            const resp = await axios.get(`http://localhost:3001/tickets/${id}`);
            return resp.data;
        } catch (err) {
            console.log(err);
        }
    }
)

export const UpdateTicket:any = createAsyncThunk(
    '/tickets/updateTicket',
    async ({id,body}:{id:string,body:ticket})=>{
        try{
           const resp = await axios.put(`http://localhost:3001/tickets/${id}`,body);
           console.log(resp);
        } catch (err) {
            console.log(err);
        }
    }
)

export const CompletingTicket: any = createAsyncThunk(
    '/tickets/completeTicket',
    async(id:string)=>{
        try{
            const resp = await axios.patch(`http://localhost:3001/tickets/complete/${id}`);
            return resp.data;
        } catch (err) {
            console.log(err);
        }
    }
)

export const GetEmailTicket: any = createAsyncThunk(
    '/tickets/usersTickets',
    async(userId: string) => {
        console.log('Fetching tickets for email:', userId);
        try {
            const resp = await axios.get(`http://localhost:3001/tickets/user/${userId}`);
            console.log('Response:', resp); 
            return resp.data;
        } catch (err) {
            console.error('Error fetching tickets:', err); 
            throw err; 
        }
    }
);

interface initialState{
    tickets: ticket[],
    ticketLoading: boolean,
    redactTicket: ticket | null,
    currentTicket: ticket | null,
    filterParams: filterParams,
    usersTickets: ticket[],
}

const initialState:initialState = {
    tickets: [],
    ticketLoading: false, 
    redactTicket: null,
    currentTicket: null,
    filterParams: {
        type: 'все',
        priority: 'все',
        status: 'все',
        sort: 'новые',
    },
    usersTickets: [],
}

const TicketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setFilterParams: (state,{payload})=>{
            state.filterParams = {...state.filterParams,[payload[0]]: payload[1]};
        },
        setCurrentTicket: (state,{payload})=>{
            state.currentTicket = payload;
        },
    }, 
    extraReducers: (builder)=>{
        builder.addCase(GetTickets.fulfilled, (state,{payload})=>{
            state.tickets = payload;
            state.ticketLoading = false;
        })
        .addCase(GetTickets.pending, (state)=>{
            state.ticketLoading = true
        })
        .addCase(GetTicketbyId.fulfilled, (state,{payload})=>{
            state.redactTicket = payload;
        })
        .addCase(CompletingTicket.fulfilled, (state,{payload})=>{
            state.currentTicket = payload;
        })
        .addCase(GetEmailTicket.fulfilled, (state,{payload})=>{
            state.usersTickets = payload;
        })
    }
})


export const {setFilterParams,setCurrentTicket} = TicketSlice.actions;
export default TicketSlice.reducer;