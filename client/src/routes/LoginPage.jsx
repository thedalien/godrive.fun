import { useEffect, useState } from 'react';
import './css/Login.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../features/appSlice'


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const serverURL = useSelector((state) => state.app.serverURL);

    useEffect(() => {
        const isLogged = async () => {
          const token = localStorage.getItem('token');
      
          if (token && token !== "undefined") {
            try {
              const res = await axios.post(`${serverURL}/api/user/login/token`, token, {
                headers: { 'Content-Type': 'application/json' }
              });
      
              if (res.data.success) {
                dispatch(setUser({ loggedIn: true, userData: res.data.user }));
                navigate('/profile');
              }
            } catch (err) {
              dispatch(setUser({ loggedIn: false, userData: {} }));
              console.error(err);
            }
          }
        };
      
        isLogged();
      }, []);
      
      


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${serverURL}/api/user/login`, {
            email,
            password
        }).then((res) => {
            console.log(res);
            if (res.data.success) {
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
