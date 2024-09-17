import React,{ FC } from "react";
import Menu from "../mainPage/Menu";
import { useGetUsers } from "../hooks/useGetUsers";
import UserComponent from "../components/userComponent";
import { User } from "../auth/Registration";

const Users:FC = ()=>{
    const {users} = useGetUsers();
    return(
        <div className="min-h-screen w-full flex ">
            <Menu></Menu>
            <div className="w-4/5">
                <div className="w-full flex flex-col min-h-screen">
                    <div className="flex w-full justify-between items-center h-24 px-8 border-b-2">
                        <p className="text-3xl font-medium">Пользователи</p>
                    </div>
                    <div className="w-full flex border-b-2">
                        <div className="w-2/6 p-4 px-8 flex justify-start">ID пользователя</div>
                        <div className="w-2/6 p-4 px-8 flex justify-start">Имя пользователя</div>
                        <div className="w-2/6 p-4 px-8 flex justify-start">Email</div>
                        <div className="w-1/6 p-4 px-8 flex jus">Роль</div>
                        <div className="py-1 px-8"></div>
                    </div>
                    <div>{users.map((el:User)=>{
                        return(
                            <UserComponent user={el}></UserComponent>
                        )
                    })}</div>
                    <div className="w-full">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users;