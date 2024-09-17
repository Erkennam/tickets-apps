import React, { FC } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { setCompleteTicket } from "../page-slice";
import { CompletingTicket } from "../ticket-slice";
import { RootState } from "../store";

const CompleteTicket:FC = ()=>{
    const dispatch = useDispatch();
    const ticketId = useSelector((state:RootState)=> state.Pages.completeTicket);
    const closeModal = ()=>{
        dispatch(setCompleteTicket(false));
    }
    const submitTicket = ()=>{
        dispatch(CompletingTicket(ticketId));
        closeModal();
    }
    return(
        <div className="w-1/3 h-1/3 rounded-lg py-2 bg-white">
            <div className="flex justify-between p-3 border-b-2">
                <p className="text-xl">подверждение</p>
                <button onClick={closeModal}><CloseIcon></CloseIcon></button>
            </div>
            <div className="flex flex-col pt-8 justify-center gap-8 items-center">
                <p className="text-xl">Вы хотите отметить тикет как выполненный?</p>
                <div className="flex w-full px-6 gap-6 justify-end">
                    <button onClick={closeModal} className="p-2 border-2 rounded-md bg-[#f0f0f0]">отменить</button>
                    <button onClick={submitTicket} className=" p-2 bg-green-500 text-white rounded-md">подвердить</button>
                </div>
            </div>
        </div>
    )
}

export default CompleteTicket;