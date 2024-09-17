import { ticket } from "../ticket-slice";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useFilters = () => {
    const { filterParams, tickets, ticketLoading } = useSelector((state: RootState) => state.Tickets);
    const {sort,...params} = filterParams;
    const filterFunc = () => {
      const keys = Object.keys(params);
      const filteredTickets = tickets.filter((el: ticket | any) => {
        return keys.every((key: string) => {
          if (filterParams[key] === 'все') {
            return true;
          } else {
            return el[key] === params[key];
          }
        });
      })
      const sortedTickets = [...filteredTickets].sort((a: ticket | any, b: ticket | any) => {
          if (sort === 'новые') {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          } else if (sort === 'старые') {
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          } else {
              return 0;
          }
      });
      return sortedTickets;
    };
    const filteredData = filterFunc();
    return { filteredData, ticketLoading };
};
  