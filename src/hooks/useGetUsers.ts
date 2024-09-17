import { useEffect } from "react";
import { getAllUsers } from "../auth-slice";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../store";

export const useGetUsers = ()=>{
    const dispatch = useDispatch();
    const {users} = useSelector((state:RootState)=> state.Auth);
    const fetchData = async()=>{
        try{
            await dispatch(getAllUsers());
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchData();
    },[dispatch])
    return {users,fetchData};
}

