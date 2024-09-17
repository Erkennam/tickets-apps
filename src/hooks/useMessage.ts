import { useDispatch,useSelector } from "react-redux";
import { getMessages, message } from "../messages-slice";
import { RootState } from "../store";
import { useState } from "react";

export const useMessage = ()=>{
    const dispatch = useDispatch();
    const [loading,setLoading] = useState<boolean>(false);
    const messages:message[] = useSelector((state:RootState)=> state.Message.messages);
    const fetchMessages = async(ticket:string | any)=>{
        setLoading(true);
        try{
            await dispatch(getMessages(ticket));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }
    return {fetchMessages,messages,loading};
}