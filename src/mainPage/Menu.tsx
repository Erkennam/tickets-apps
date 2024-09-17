import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AppsIcon from '@mui/icons-material/Apps';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ImageComponent from "../utils/image-component";
import { useDispatch } from "react-redux";
import { logoutUser } from "../auth-slice";
import { useNavigate } from "react-router-dom";

const Menu:FC = ()=>{
    const {profile,role} = useSelector((state:RootState)=> state.Auth);
    const navigate = useNavigate();
    console.log(role);
    const Logout = ()=>{
        dispatch(logoutUser());
        navigate('/login');
    }
    const dispatch = useDispatch();
    return(
        <aside className="w-1/5 h-screen-min border-r-2">
            <ImageComponent username={profile.username} email={profile.email}></ImageComponent>
            {role === 'admin' ? <div className="py-10 px-8 flex flex-col gap-8 text-xl">
                <p onClick={()=>{navigate('/main')}} className="flex gap-3 items-center"><LocalActivityIcon></LocalActivityIcon> Тикеты</p>
                <p className="flex gap-3 items-center"><AppsIcon></AppsIcon> Рабочий стол</p>
                <p onClick={()=>{navigate('/users')}} className="flex gap-3 items-center"><PeopleAltIcon></PeopleAltIcon>Пользователи</p>
                <p className="flex gap-3 items-center"><ChatIcon></ChatIcon>Чаты</p>
                <p onClick={Logout} className="flex gap-3 items-center text-red-500"><LogoutIcon></LogoutIcon> Выход</p>
            </div> : <div className="py-10 px-8 flex flex-col gap-8 text-xl">
                <p className="flex gap-3 items-center"><LocalActivityIcon></LocalActivityIcon> Мой тикеты </p>
                <p onClick={Logout} className="flex gap-3 items-center text-red-500"><LogoutIcon></LogoutIcon> Выход</p>
            </div>}
        </aside>
    )
}

export default Menu;