import React,{FC} from "react";
import { CreatingTicket } from "../ticket-slice";
import { setTicketModal } from "../page-slice";
import {useForm } from 'react-hook-form';
import { ticket } from "../ticket-slice";
import { useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { useGetTickets } from "../hooks/useGetTickets";
import {toast} from 'react-toastify';
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const priority = [
    {
        name: 'легкий',
        style: 'text-green-500'
    }, 
    {
        name: 'средний',
        style: 'text-orange-500'
    },
    {
        name: 'высокий',
        style: 'text-red-500'
    }
];
export const types = ['проблема','инцидент'];

const CreateTicket:FC = ()=>{
    const {handleSubmit,register} = useForm<ticket>();
    const {fetchData,tickets} = useGetTickets();
    const {profile} = useSelector((state:RootState)=> state.Auth);
    const [currentPriority,setPriority] = React.useState<string>(priority[0].name);
    const changePriority = (el:string)=>{
        setPriority(el)
    }
    const dispatch = useDispatch();
    const submit = async (data:ticket)=>{
        try{
            const date = new Date();
            const body:ticket = {...data,
                priority:currentPriority, 
                user: profile._id,
                createdAt: date,
                updatedAt: date,
                status: 'невыполненно',
                ticketId: `#TC-${tickets.length + 1}`
            };
            await dispatch(CreatingTicket(body));
            await fetchData();
            dispatch(setTicketModal());
            toast.success('тикет успешно создан');
        } catch (err) {
            console.log(err);
        }
    }
    const closeModal = ()=>{
        dispatch(setTicketModal());
    }
    return(
        <div className="flex w-1/3 h-full bg-white flex-col gap-4 rounded-md absolute right-0">
            <div className="w-full flex justify-between p-3 border-b-2">
                <div className="flex gap-3 items-center">
                    <div className="p-2 bg-[#eaecee] text-xs text-green-600 rounded-md"><LocalActivityIcon></LocalActivityIcon></div>
                    <p className="text-xl font-medium">создание тикета</p>
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
                <input className="w-full p-2 rounded-md bg-green-600 text-white mb-2" type="submit" value={'добавить'}></input>
            </form>
        </div>
    )
}

export default CreateTicket;