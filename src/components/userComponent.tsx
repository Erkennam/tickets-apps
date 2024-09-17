import React,{FC} from "react";
import { User } from "../auth/Registration";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
interface props{
    user: User | any
}

const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const UserComponent:FC<props> = ({user})=>{
    const s = (user.username.charAt(0) + user.username.charAt(user.username.length - 1)).toLocaleUpperCase();
    return(
        <div className="w-full flex border-b-2">
            <div className="w-1/6 p-2 px-10 border-r-2 flex gap-6">
                <p>{truncateText(user._id, 12)}</p>
            </div>
            <div className="w-2/6 p-2 px-8 text font-medium border-r-2 flex gap-6">
                <div className="w-6 h-6 rounded-full bg-slate-400 flex justify-center items-center">
                    <p className="text-white text-xs font-medium">{s}</p>
                </div>
                {truncateText(user.username, 22)}
            </div>
            <div className="w-2/6 p-2 px-8 border-r-2">
                {truncateText(user.email, 24)}
            </div>
            <div className="w-1/6 p-2 px-8">{user.role}</div>
            <div className="py-1 flex justify-center items-center px-8 border-l-2">
                <MoreHorizIcon></MoreHorizIcon>
            </div>
        </div>
    )
}

export default UserComponent;