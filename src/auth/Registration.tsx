import React, { FC,useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { Register, UserRole } from "../auth-slice";
import {useForm} from 'react-hook-form';
import { useDispatch } from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';
export interface User {
    _id?: string,
    username: string,
    email: string,
    password: string,
    role: UserRole,
}

const Registration: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register,reset,handleSubmit,formState: { errors }} = useForm<User>({
        mode: 'onSubmit'
    });
    const [showPassword,setShowPassword] = useState<boolean>(false);
    const showingPassword = ()=>{
        setShowPassword((prev)=> !prev);
    }
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const submit = async (data:User)=>{
        try {
            const user = {...data,role: 'user'};
            await dispatch(Register(user));
            setIsRegistered(true);
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
        }
    }
    React.useEffect(() => {
        if (isRegistered) {
            navigate('/login');
        }
    }, [isRegistered, navigate]);
    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit(submit)} className="w-1/3 p-4 border-2 border-gray-400 rounded-md flex flex-col gap-2">
                <h1 className="text-xl font-medium mb-2">Регистрация</h1>
                <div className="flex flex-col gap-2">
                    <label className="mb-1">Имя пользователя</label>
                    <input {...register('username',{required: 'это поле обязательно', minLength:{
                        value: 4,
                        message: 'в поле должно быть 4 или более символов'
                    }})} type="text" autoComplete="off"  placeholder="Username" className="p-2 border rounded-md outline-none mb-3" />
                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="mb-1">Email</label>
                    <div>
                        <input {...register('email',{required: 'это поле обязательно',pattern:{
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'невалидный email'
                        }})} autoComplete="off"  type="text" placeholder="Email" className="p-2 w-full border rounded-md outline-none mb-3" />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="mb-1">Пароль</label>
                    <div className="flex flex-col gap-1">
                        <div className="w-full flex gap-3">
                            <input {...register('password',{required: 'это поле обязательно', minLength: {
                            value: 8,
                            message: 'Пароль должен содержать как минимум 8 символов',
                            },
                            pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: 'Пароль должен содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ',
                            },})} 
                            type={showPassword ? "password" : 'text'} autoComplete="off" placeholder="Password" 
                            className="w-full p-2 border rounded-md outline-none mb-3" />
                            <div 
                                className={`flex p-2 border mb-3 rounded-md items-center transition duration-300 ${showPassword ? 'text-blue-500' : ''}`} 
                                onClick={showingPassword}>
                                <VisibilityIcon></VisibilityIcon>
                            </div>
                        </div>
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                </div>
                <input type="submit" value="Зарегистрироваться" className="mt-2 p-3 bg-blue-600 text-white rounded-md border-2 border-blue-600 transition duration-300 hover:bg-transparent hover:text-blue-600" />
                <div className="mt-3 flex justify-center items-center">
                    <p>У вас уже есть аккаунт? <Link to={'/login'}><span className="text-blue-600">Авторизуйтесь</span></Link></p>
                </div>
            </form>
        </div>
    )
}

export default Registration;
