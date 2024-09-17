import React,{FC} from "react";
import CreateTicket from "../mainPage/create-ticket";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import RedactTicket from "../mainPage/redact-Ticket";
import CompleteTicket from "../mainPage/completeTicket";
import ModalChat from "../mainPage/modalChat";

const Dark:FC = ()=>{
    const {createTicketModal,redactTicketModal,completeTicket,ticketChat} = useSelector((state:RootState)=> state.Pages);
    return(
        <div className="z-50 w-full h-full fixed bg-black bg-opacity-70 p-3 flex items-center justify-center">
            {createTicketModal && <CreateTicket></CreateTicket>}
            {redactTicketModal && <RedactTicket></RedactTicket>}
            {completeTicket && <CompleteTicket></CompleteTicket>}
            {ticketChat && <ModalChat></ModalChat>}
        </div>
    )
}

export default Dark;