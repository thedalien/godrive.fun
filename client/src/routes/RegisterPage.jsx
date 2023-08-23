import {useEffect, useState } from 'react';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { setUser } from '../features/appSlice';
import { useDispatch } from 'react-redux';
import { setToken } from '../features/appSlice';


const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();



        useEffect(() => {
          const isLogged = async () => {
            const token = localStorage.getItem('token');

            if (token && token !== "undefined") { 
              console.log(`Getting user with token ${token}`);
              try {
                const res = await api.post(`/api/user/login/token`,{});
    
                if (res.data.success) {
                  dispatch(setUser(res.data.user));
                  localStorage.setItem('user', JSON.stringify(res.data.user));
                  navigate('/profile');
                } else {
                    console.error(res.data.message);
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
        api.post(`/api/user/register`, {
            name,
            email,
            password
        }).then((res) => {
            console.log(res);
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                dispatch(setUser(res.data.user));
                dispatch(setToken(res.data.token));

                navigate("/profile");
            } else {
                alert(res.data.message);
            }
        }
        ).catch((err) => {
          // if error 409, user already exists
          if (err.response.status === 409) {
            alert(err.response.data.message);
            navigate("/login");
          } else {
            alert("An error occurred. Please try again later.");
          }
            console.log(err);
        }
        );
    };

    return (
        <div className="registration-page">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button className="mainButtons" onClick={handleSubmit}>Register</button>
            </form>
            <div className="login">
                <p>Already have an account?</p>
                <button className="mainButtons" onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
    );
};


export default RegisterPage;
