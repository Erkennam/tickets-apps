import React,{FC} from "react";
import {types,priority} from '../mainPage/create-ticket';
import TodayIcon from '@mui/icons-material/Today';
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { setFilterParams } from "../ticket-slice";

interface props {
    changeSearchValue: (e:React.ChangeEvent<HTMLInputElement>)=> void;
}
export interface filterParams {
    type: string,
    priority: string,
    status: string,
    sort: string,
}

const FiltersComponent:FC<props> = ({changeSearchValue})=>{
    const prioritys = ['все',...priority.map((el)=> el.name)];
    const dispatch = useDispatch();
    const {filterParams} = useSelector((state:RootState)=> state.Tickets);
    const handleParamChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        dispatch(setFilterParams([e.target.name,e.target.value]));
    }
    return (
        <div className="p-4 px-8 flex gap-8 text-gray-500 items-center border-b-2 justify-between">
            <div className="flex gap-8">
                <input 
                    type="text" 
                    onChange={changeSearchValue} 
                    placeholder="поиск" 
                    className="p-1 text-black border-2 shadow-sm rounded-md outline-none focus:">
                </input>
                <select
                    name="type" 
                    className="p-1 outline-none border-2 shadow-sm rounded-md" 
                    onChange={handleParamChange} 
                    value={filterParams.type}>
                    {['все',...types].map((el:string)=>{
                        return(
                            <option key={el}>{el}</option>
                        )
                    })}
                </select>
                <select 
                    name="priority"
                    className="p-1 outline-none border-2 shadow-sm rounded-md" 
                    onChange={handleParamChange}
                    value={filterParams.priority}>
                    {prioritys.map((el:string)=>{
                        return(
                            <option key={el}>{el}</option>
                        )
                    })}
                </select>
                <select
                    name="status" 
                    className="p-1 outline-none border-2 shadow-sm rounded-md" 
                    onChange={handleParamChange} 
                    value={filterParams.status}>
                    {['невыполненно','выполненно','все'].map((el:string)=>{
                        return(
                            <option key={el}>{el}</option>
                        )
                    })}
                </select>
            </div>
            <div className="p-1 border-2 rounded-md flex gap-2">
                <TodayIcon></TodayIcon>
                <select className='outline-none' value={filterParams.sort} name="sort" onChange={handleParamChange}>
                    <option>новые</option>
                    <option>старые</option>
                </select>
            </div>
        </div>
    )
}

export default FiltersComponent;