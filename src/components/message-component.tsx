import React, { FC } from "react";
import { message } from "../messages-slice";
import { useGetDate } from "../hooks/useGetDate";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../auth/Registration";

interface Props {
  chat: message;
}

const MessageComponent: FC<Props> = ({ chat }) => {
  const profile: User = useSelector((state: RootState) => state.Auth.profile);
  const { sender } = chat;
  const date = useGetDate(chat.createdAt);
  const own = profile._id === sender._id;
  return (
    <div className={`w-full flex flex-col gap-2 ${own ? 'items-start' : 'items-end'}`}>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <p className="text-lg font-medium">{sender.username}</p>
          <p className="text-sm">{date}</p>
        </div>
        <div
          className={`flex gap-2 rounded-md max-w-sm break-words whitespace-pre-wrap ${own ? 'justify-start' : 'justify-end'}`}
        >
          <p className="w-full text">{chat.message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
