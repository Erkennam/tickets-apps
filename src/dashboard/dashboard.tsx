import React, { FC } from "react";

const Dashboard:FC = ()=>{
    return(
        <div>
            <div className="flex w-full justify-between items-center h-24 px-8 border-b-2">
                <p className="text-3xl font-medium">Тикеты</p>
                <button  
                    className="py-2 px-4 border-2 transition duration-150 border-green-500 bg-green-500 text-white rounded-md hover:bg-transparent hover:text-green-500">
                    Добавить тикет
                </button>
            </div>
        </div>
    )
}

export default Dashboard;