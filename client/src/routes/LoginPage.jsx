import {useEffect, useState } from 'react';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { setUser } from '../features/appSlice';
import { useDispatch } from 'react-redux';



const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
      const isLogged = async () => {
        const token = localStorage.getItem('token');
      
        if (token && token !== "undefined") {
          try {
            const res = await api.post(`/api/user/login/token`, {});
            if (res.data.success) {
              dispatch(setUser(res.data.user));
              localStorage.setItem('user', JSON.stringify(res.data.user));
              console.log(res.data.user);
              navigate('/profile');
            }
          } catch (err) {
            console.error(err);
          }
        }
      };
    
      isLogged();
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        api.post(`/api/user/login`, {
            email,
            password
        }).then((res) => {
            console.log(res);
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                dispatch(setUser(res.data.user));
                navigate("/profile");
            } else {
                alert(res.data.message);
            }
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
