import React, { FC } from "react";
interface props {
    username: string,
    email: string
}

const ImageComponent:FC<props> = ({username,email})=>{
    const s = (username.charAt(0) + username.charAt(username.length - 1)).toLocaleUpperCase();
    return(
        <div className="flex gap-4 border-b-2 px-4 h-24 items-center">
            <div className="w-14 h-14 rounded-full bg-slate-400 flex justify-center items-center">
                <p className="text-white text-2xl font-medium">{s}</p>
            </div>
            <div>
                <p className="text-xl font-medium">{username}</p>
                <p>{email}</p>
            </div>
        </div>
    )
}

export default ImageComponent;