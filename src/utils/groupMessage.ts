import { message } from "../messages-slice";

export const groupMessagesByDate = (messages: message[]) => {
  const groupedMessages: Record<string, message[]> = {};

  messages.forEach((msg: any) => {
    const date = new Date(msg.createdAt);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let key = '';

    if (date.toDateString() === today.toDateString()) {
      key = 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
      key = 'Вчера';
    } else {
      key = 'Прочее';
    }

    if (!groupedMessages[key]) {
      groupedMessages[key] = [];
    }

    groupedMessages[key].push(msg);
  });

  return groupedMessages;
};
