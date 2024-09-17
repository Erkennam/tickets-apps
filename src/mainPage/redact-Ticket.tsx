import React,{FC,useEffect} from "react";
import { useDispatch } from "react-redux";
import { setRedactTicketModal } from "../page-slice";
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { ticket, UpdateTicket } from "../ticket-slice";
import { priority,types } from "./create-ticket";
import {toast} from 'react-toastify';
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetTickets } from "../hooks/useGetTickets";

const RedactTicketModal:FC = ()=>{
    const dispatch = useDispatch();
    const {redactTicket} = useSelector((state:RootState)=> state.Tickets);
    const {fetchData} = useGetTickets();
    const {register,handleSubmit,reset} = useForm<ticket>({defaultValues:{...redactTicket || {}}});
    const [currentPriority,setPriority] = React.useState<string>(redactTicket?.priority || '');
    const changePriority = (el:string)=>{
        setPriority(el);
    }
    useEffect(() => {
        if (redactTicket) {
            reset(redactTicket);
            setPriority(redactTicket.priority);
        }
    }, [redactTicket, reset]);
    const closeModal = ()=>{
        dispatch(setRedactTicketModal());
    }
    const submit = async (data:ticket)=>{
        try{
            await dispatch(UpdateTicket({id:data._id,body:{...data,priority: currentPriority}}));
            await fetchData();
            closeModal();
            toast.success('успешно изменено')
        } catch (err) {
            console.log(err);
        }
    }
    if(!redactTicket){
        return <p>error</p>
    }
    return(
        <div className="flex w-1/3 h-full absolute right-0 bg-white flex-col gap-4 rounded-md">
            <div className="w-full flex justify-between p-3 border-b-2">
                <div className="flex gap-3 items-center">
                    <div className="p-2 bg-[#eaecee] text-xs text-green-600 rounded-md"><LocalActivityIcon></LocalActivityIcon></div>
                    <p className="text-xl font-medium">редактирование тикета</p>
                </div>
                <button onClick={closeModal}><CloseIcon></CloseIcon></button>
            </div>
            <form className="px-3 py-2 h-full flex flex-col justify-between" onSubmit={handleSubmit(submit)}>
                <div className="flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-2">
                        <p>Название тикета</p>
                        <input {...register('title',{required: 'это поле обязательно'})} type="text" className="p-2 border-2 w-full rounded-md"></input>
                    </div>
                    <div className="w-full flex gap-3 justify-between">
                        {priority.map((el:{name: string, style: string})=>{
                            return(
                                <div 
                                    className={`w-1/3 flex items-center justify-center border-2 p-2 rounded-md 
                                    ${currentPriority === el.name && 'bg-green-100 border-green-300'}`} 
                                    key={el.name} 
                                    onClick={()=>{changePriority(el.name)}}>
                                    {el.name}
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Тип тикета</p>
                        <select className="w-full p-2 rounded-lg border-2" {...register('type',{required: 'это поле обязательно'})}>{types.map((el)=>{
                            return(
                                <option key={el}>{el}</option>
                            )
                        })}</select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Описание тикета</p>
                        <textarea className="h-44 border-2 p-4 rounded-lg" {...register('description',{required: 'это поле обязательно'})}>

                        </textarea>
                    </div>
                </div>
                <input className="w-full p-2 rounded-md bg-green-600 text-white mb-2" type="submit" value={'редактировать'}></input>
            </form>
        </div>
    )
}

export default RedactTicketModal;