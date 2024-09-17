import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { setTicketModal } from "../page-slice";
import { useGetTickets } from "../hooks/useGetTickets";
import { ticket } from "../ticket-slice";
import TicketComponent from "../components/ticket-component";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import FiltersComponent from "../components/filtersComponent";
import { useFilters } from "../hooks/useFilters";

const UsersTickets: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useGetTickets();
  const { filteredData } = useFilters();
  const [searchValue, setSearchValue] = React.useState<string>('');
  const openModal = () => {
    dispatch(setTicketModal());
  }
  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }
  const filterSearch = filteredData.filter((el: ticket) => el.title.toLowerCase().includes(searchValue.toLowerCase()));
  return (
    <div className="w-4/5 flex flex-col min-h-screen overflow-auto"> 
      <div className="flex w-full justify-between items-center h-24 px-8 border-b-2">
        <p className="text-3xl font-medium">Мой тикеты</p>
        <button 
          onClick={openModal} 
          className="py-2 px-4 border-2 transition duration-150 border-green-500 bg-green-500 text-white rounded-md hover:bg-transparent hover:text-green-500">
          Добавить тикет
        </button>
      </div>
      <FiltersComponent changeSearchValue={changeSearchValue}></FiltersComponent>
      <div className="w-full flex border-b-2">
        <div className="w-1/5 p-4 px-8">ID тикета</div>
        <div className="w-2/6 p-4 px-8">Название</div>
        <div className="w-1/6 p-4 px-8">Приоритет</div>
        <div className="w-1/6 p-4 px-8">Тип</div>
        <div className="w-1/6 p-4 px-8">Клиент</div>
      </div>
      <div className="w-full flex-1 overflow-y-auto">  
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-full flex justify-between border-b-2 p-4 px-8">
              <Skeleton width="20%" height="20px" />
              <Skeleton width="30%" height="20px" className="ml-4" />
              <Skeleton width="20%" height="20px" className="ml-4" />
              <Skeleton width="20%" height="20px" className="ml-4" />
              <Skeleton width="20%" height="20px" className="ml-4" />
            </div>
          ))
        ) : (
          filterSearch.length > 0 ? filterSearch.map((el: ticket) => (
            <TicketComponent key={el._id} ticket={el} />
          )) : <p className="mt-4 mx-8">список тикетов пуст</p>
        )}
      </div>
    </div>
  );
};

export default UsersTickets;
