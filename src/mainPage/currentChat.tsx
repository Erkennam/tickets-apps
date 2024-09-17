import React, { FC, useEffect, useRef, useState } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Menu from "./Menu";
import io from 'socket.io-client';
import { useSelector } from "react-redux";
import { setCompleteTicket } from "../page-slice";
import { RootState } from "../store";
import { ticket } from "../ticket-slice";
import { useNavigate } from "react-router-dom";
import { User } from "../auth/Registration";
import { useMessage } from "../hooks/useMessage";
import { groupMessagesByDate } from "../utils/groupMessage";
import { message } from "../messages-slice";
import { useDispatch } from "react-redux";
import MessageComponent from "../components/message-component";

const socket = io('http://localhost:3001', {
  transports: ['websocket'],
  withCredentials: true,
});

const CurrentChat: FC = () => {
  const currentTicket: ticket = useSelector((state: RootState) => state.Tickets.currentTicket);
  const profile: User = useSelector((state: RootState) => state.Auth.profile);
  const { fetchMessages, messages } = useMessage();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const groupedMessages = groupMessagesByDate(messages);

  useEffect(() => {
    fetchMessages(currentTicket._id);
  }, [currentTicket._id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const redirect = () => {
    navigate('/main');
  };

  const completeTicket = () => {
    dispatch(setCompleteTicket(currentTicket._id));
  };

  const sendMessage = () => {
    socket.emit('message', { sender: profile._id, message, ticket: currentTicket._id });
    fetchMessages(currentTicket._id);
    setMessage('');
  };

  return (
    <div className='w-full min-h-screen flex'>
      <Menu />
      <div className="w-4/5 h-full flex flex-col relative">
        <div className="w-full flex justify-between items-center h-24 px-8 py-6 border-b-2 text-xl">
          <button
            className="flex gap-4 items-center"
            onClick={redirect}>
            <KeyboardBackspaceIcon /> Тикеты
          </button>
          <div className="flex gap-4">
            <p>{currentTicket.ticketId}</p>
            <div>{currentTicket.title}</div>
          </div>
          {currentTicket.status === 'невыполненно' && <button onClick={completeTicket} className="p-2 bg-green-500 rounded-md border-2 border-green-500 text-white transition hover:bg-transparent hover:text-green-500">
            Закрыть Тикет
          </button>}
        </div>
        <div className="w-full overflow-auto max-h-[calc(100vh-4rem)] h-full flex flex-col gap-3 py-8 pt-6 px-8">
          {Object.keys(groupedMessages).map((dateKey) => (
            <div key={dateKey} className="flex flex-col gap-6">
              <div className="font-bold text-lg mb-2 w-full flex justify-center">{dateKey}</div>
              {groupedMessages[dateKey].map((msg: message) => (
                <MessageComponent key={msg._id} chat={msg}></MessageComponent>
              ))}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-0 right-0 w-4/5 p-4 bg-white border-t-2 flex justify-center items-center gap-4">
          <input
            type="text"
            className="w-5/6 border-2 p-3 rounded-md outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Введите сообщение"
          />
          <button
            onClick={sendMessage}
            className="p-3 bg-black rounded-md border-2 border-black text-white transition duration-150 hover:bg-transparent hover:text-black">
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentChat;