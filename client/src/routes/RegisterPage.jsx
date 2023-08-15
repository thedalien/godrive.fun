import {useEffect, useState } from 'react';
import './css/Login.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../features/appSlice';
// import useAuthToken from '../functions/useAuthToken';


const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const serverURL = useSelector((state) => state.app.serverURL);
    const dispatch = useDispatch();


    // useAuthToken("login");
        useEffect(() => {
      const isLogged = async () => {
        const token = localStorage.getItem('token');
    
        // Log the token and inspect it in your browser's console
        console.log(`Raw token from localStorage: ${token}`); //MAG, I know we were working on this on Wednesday, is the token resolved?
    
        if (token && token !== "undefined") { // if token exists
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
            } else {
                navigate('/login');
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
        axios.post(`${serverURL}/api/user/register`, {
            name,
            email,
            password
        }).then((res) => {
            console.log(res);
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                console.log(res.data.token);
                const user = {name:res.data.user.name, email:res.data.user.email, id:res.data.user._id, token:res.data.token, role: res.data.user.role, verified: res.data.user.verified}
                dispatch(setUser(user));
                navigate("/login");
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
                <button onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
};

export default RegisterPage;
