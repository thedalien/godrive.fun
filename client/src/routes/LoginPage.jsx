import {useEffect, useState } from 'react';
import './css/Login.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const serverURL = useSelector((state) => state.app.serverURL);


    useEffect(() => {
      const isLogged = async () => {
        const token = localStorage.getItem('token');
    
        // Log the token and inspect it in your browser's console
        console.log(`Raw token from localStorage: ${token}`); //MAG, I know we were working on this on Wednesday, is the token resolved?
    
        if (token && token !== "undefined") {
          // Check the token format
          const parts = token.split('.');
          if (parts.length !== 3) {
            console.error('Token does not appear to be a valid JWT:', token);
            return; // Exit or handle the error as needed
          }
    
          console.log(`Getting user with token ${token}`);
          try {
            const res = await axios.post(
              `${serverURL}/api/user/login/token`,
              {}, 
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              }
            );
    
            if (res.data.success) {
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
        axios.post(`${serverURL}/api/user/login`, {
            email,
            password
        }).then((res) => {
            console.log(res);
            localStorage.setItem("token", res.data.token);
            console.log(res.data.token);
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
