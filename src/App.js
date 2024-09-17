import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from './auth-slice.ts';
import Router from './routes.js';
import Dark from './pages/dark.tsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './utils/loader.tsx';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dark } = useSelector((state) => state.Pages);
  const { profile, auth, profileError } = useSelector((state) => state.Auth);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(getProfile(token))
    if (token) {
        dispatch(getProfile(token))
            .unwrap()
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                toast.error("Ошибка загрузки профиля");
                setLoading(false); 
                localStorage.removeItem('token'); 
                navigate('/login');
            });
    } else {
        setLoading(false);
        navigate('/login');
    }
  }, [dispatch, navigate]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="h-full">
      {dark && <Dark />}
      <Router />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
