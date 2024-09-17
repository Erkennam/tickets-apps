import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Authorization } from "../auth-slice";
import { User } from "./Registration";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';

const Login: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>({
        mode: 'onSubmit'
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState<string | null>(null);
    const [showPassword,setShowPassword] = useState<boolean>(false);
    const showingPassword = ()=>{
        setShowPassword((prev)=> !prev);
    }
    const submit = async (data: User) => {
        try {
            const result: any = await dispatch(Authorization(data));
            if (Authorization.rejected.match(result)) {
                setLoginError(result.payload || 'Ошибка авторизации, проверьте данные и попробуйте снова.');
            } else if (result.payload) {
                navigate('/main');
            }
        } catch (error) {
            setLoginError('Произошла ошибка при авторизации');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit(submit)} className="w-1/3 p-4 border-2 border-gray-400 rounded-md flex flex-col gap-4">
                <h1 className="text-xl font-medium mb-2">Авторизация</h1>
                <div className="flex flex-col gap-2">
                    <label className="mb-1">Email</label>
                    <input {...register('email', {
                        required: 'это поле обязательно', pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'невалидный email'
                        }
                    })} type="text" placeholder="Email" className="p-2 border rounded-md outline-none mb-3" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="mb-1">Пароль</label>
                    <div className="w-full flex gap-4">
                        <input {...register('password',
                            {
                                required: 'это поле обязательно',
                                minLength: {
                                    value: 8,
                                    message: 'Пароль должен содержать как минимум 8 символов',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: 'Пароль должен содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ',
                                },
                            })}
                            type={showPassword ? "text" : "password"} placeholder="Password" className="w-full p-2 border rounded-md outline-none mb-3" 
                        />
                        <div 
                            className={`flex p-2 border mb-3 rounded-md items-center transition duration-300 ${showPassword ? 'text-blue-500' : ''}`} 
                            onClick={showingPassword}><VisibilityIcon></VisibilityIcon>
                        </div>
                    </div>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                {loginError && <p className="text-red-500">{loginError}</p>}
                <input type="submit" value="Войти" className="p-3 bg-blue-600 text-white rounded-md border-2 border-blue-600 transition duration-300 hover:bg-transparent hover:text-blue-600" />
                <div className="mt-3 flex justify-center items-center">
                    <p>У вас нету аккаунта? <Link to={'/'}><span className="text-blue-600">зарегистрируйтесь</span></Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login;
