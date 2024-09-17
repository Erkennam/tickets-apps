import { createSlice } from "@reduxjs/toolkit";
import { ticket } from "./ticket-slice";

interface initialState {
    createTicketModal: boolean,
    dark: boolean,
    optionalModal: boolean,
    completeTicket: null | string,
    redactTicketModal: boolean,
    ticketChat: boolean | ticket,
}

const initialState:initialState = {
    createTicketModal: false,
    dark: false,
    optionalModal: false,
    completeTicket: null,
    redactTicketModal: false,
    ticketChat: false,
}

const PageSlice = createSlice({
    name: 'PageSlice',
    initialState,
    reducers : {
        setTicketModal: (state)=>{
            state.dark = !state.dark;
            state.createTicketModal = !state.createTicketModal;
        },
        setRedactTicketModal: (state)=>{
            state.dark = !state.dark;
            state.redactTicketModal = !state.redactTicketModal;
        },
        setCompleteTicket: (state,{payload})=>{
            state.dark = !state.dark;
            state.completeTicket = payload;
        },
        setTicketChat: (state,{payload})=>{
            state.dark = !state.dark;
            state.ticketChat = payload;
        }
    }
})

export const {setTicketModal,setRedactTicketModal,setTicketChat,setCompleteTicket} = PageSlice.actions;
export default PageSlice.reducer;