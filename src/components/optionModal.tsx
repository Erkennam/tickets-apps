import React, { useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { GetTicketbyId, DeleteTicket, ticket } from '../ticket-slice';
import { setRedactTicketModal } from '../page-slice';
import { useGetTickets } from '../hooks/useGetTickets';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

interface ModalProps {
    x: number;
    y: number;
    isVisible: boolean;
    onClose: () => void;
    ticket: ticket;
}

const OptionModal: React.FC<ModalProps> = ({ x, y, isVisible, onClose, ticket }) => {
    const dispatch = useDispatch();
    const { fetchData } = useGetTickets();
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalPosition, setModalPosition] = useState({ top: y, left: x });
    useLayoutEffect(() => {
        if (modalRef.current) {
            const modalHeight = modalRef.current.offsetHeight;
            const modalWidth = modalRef.current.offsetWidth;
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
            const spaceBelow = windowHeight - y;
            const spaceAbove = y;
            const newTop = spaceBelow < modalHeight && spaceAbove > modalHeight ? y - modalHeight - 10 : y;
            const newLeft = windowWidth < x + modalWidth ? x - modalWidth + 30 : x;

            setModalPosition({ top: newTop, left: newLeft });
        }
    }, [x, y, isVisible]);
    const deletingTicket = async () => {
        try {
            await dispatch(DeleteTicket(ticket._id));
            fetchData();
            onClose();
        } catch (err) {
            console.log(err);
        }
    };
    const redactTicket = async () => {
        try {
            dispatch(setRedactTicketModal());
            await dispatch(GetTicketbyId(ticket._id));
            onClose();
        } catch (err) {
            console.log(err);
        }
    };

    useLayoutEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setTimeout(() => onClose(), 100);
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return ReactDOM.createPortal(
        <div
            ref={modalRef}
            className="fixed bg-white p-3 shadow-lg rounded-md flex flex-col gap-4 items-start"
            style={{ position: 'absolute', top: `${modalPosition.top}px`, left: `${modalPosition.left}px` }}
        >
            <button onClick={deletingTicket} className='w-full justify-between transition flex gap-2 duration-150 hover:text-red-500'>
                <p>удалить</p>
                <DeleteIcon />
            </button>
            <button onClick={redactTicket} className='w-full justify-between transition flex gap-2 duration-150 hover:text-blue-500'>
                <p>редактировать</p>
                <CreateIcon />
            </button>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default OptionModal;
