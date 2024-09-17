import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './auth-slice'
import ticketSlice from './ticket-slice';
import pageSlice from './page-slice';
import messagesSlice from './messages-slice';

export const Store:any = configureStore({
    reducer: {
        Auth: AuthSlice,
        Tickets: ticketSlice,
        Pages: pageSlice,
        Message: messagesSlice,
    }
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;