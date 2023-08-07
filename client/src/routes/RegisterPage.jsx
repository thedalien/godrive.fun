import { useEffect, useState } from 'react';
import './css/Login.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
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
                navigate('/login');
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
                navigate("/login");
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default RegisterPage;
