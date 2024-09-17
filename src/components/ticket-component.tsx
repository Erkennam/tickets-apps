import React, { FC, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTicket, ticket } from "../ticket-slice";
import { setTicketChat } from "../page-slice";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OptionModal from "./optionModal";
import { priority } from "../mainPage/create-ticket.tsx";

interface Props {
    ticket: ticket;
}

const TicketComponent: FC<Props> = ({ ticket }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const find = priority.find(({ name }: ticket | any) => name === ticket.priority);

    const openModal = useCallback(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setModalPosition({ x: rect.right - 170, y: rect.top + 40 });
            setModalVisible(true);
        }
    }, []);

    const closeModal = useCallback(() => {
        setModalVisible(false);
    }, []);

    const toggleModal = () => {
        if (modalVisible) {
            closeModal();
        } else {
            openModal();
        }
    };

    const openModalChat = () => {
        dispatch(setCurrentTicket(ticket));
        dispatch(setTicketChat(ticket));
    };

    return (
        <div className="w-full flex border-b-2">
            <div className="w-1/5 p-1 flex gap-4 items-center px-8">
                <div className={`w-3 h-3 ${ticket.status === 'выполненно' ? 'bg-green-500' : 'bg-slate-400'} rounded-full`}></div>
                {ticket.ticketId}
            </div>
            <div onClick={openModalChat} className="w-2/6 border-x-2 p-1 px-8">{ticket.title}</div>
            <div className={`w-1/6 p-1 px-8`}>
                <p className={`rounded-md ${find?.style}`}>{ticket.priority}</p>
            </div>
            <div className="w-1/6 border-x-2 p-1 px-8">{ticket.type}</div>
            <div className="w-1/6 p-1 px-8">{ticket.user.username}</div>
            <div className="p-1 px-3 border-l-2 relative">
                <button ref={buttonRef} onClick={toggleModal}><MoreHorizIcon /></button>
                {modalVisible && (
                    <OptionModal 
                        x={modalPosition.x} 
                        y={modalPosition.y} 
                        isVisible={modalVisible} 
                        onClose={closeModal} 
                        ticket={ticket}
                    />
                )}
            </div>
        </div>
    );
};

export default TicketComponent;
