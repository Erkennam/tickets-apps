import { useSelector } from "react-redux";
import { RootState } from "../store";
import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { GetTickets,GetEmailTicket, ticket } from "../ticket-slice";
import axios from "axios";

export const useGetTickets = ()=>{
    const {tickets} = useSelector((state:RootState)=> state.Tickets);
    const {profile} = useSelector((state:RootState)=> state.Auth);
    const [loading,setLoading] = useState(true);
    const [currentTicket,setCurrentTicket] = useState<ticket | null>(null);
    const dispatch = useDispatch();
    const fetchData = async ()=>{
        try{
            await dispatch(GetTickets());
            await dispatch(GetEmailTicket(profile._id));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    const getCurrentTicket = async (id:string)=>{
        try{
            const resp = await axios.get(`http://localhost:3001/tickets/${id}`);
            setCurrentTicket(resp.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{
       fetchData();
    },[dispatch]);
    return {tickets,fetchData,getCurrentTicket,currentTicket,loading};
}