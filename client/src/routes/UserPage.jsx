import "./css/User.css";
import api from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser, setLoggedOut } from "../features/appSlice";
import { useDispatch } from "react-redux";

export default function UserPage() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.post('/api/user/login/token', { token });
        setUserData(response.data.user);
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("logout", "true");
    dispatch(setLoggedOut(true));
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <div id="user">
      { userData && (
      <>
      <div id="userEdit">
        <h1>Hello {userData.name}</h1>
        <h3>Current Details</h3>
        <div id="detailContainer">
          <div className="currentDetail">
            Current E-Mail:
          </div>
          <div className="userDetail">
            {userData.email}
          </div>
        </div>
        <br />
          <button >Change Password</button>
        <br />
        
        <button style={{backgroundColor: 'red'}} onClick={logoutHandler}>Logout</button>
          
        {userData.role === "admin" &&<div> <br/> <button onClick={() => navigate('/admin')}>Admin Page</button></div>}
        
{/*         <form >
          <label>Current E-Mail</label>
          <input type="text" name="updateMail" disabled/>
          <label>Current Password</label>
          <input type="text" name="updatePw" disabled />
        </form>
*/}
      </div>
      <div id="userRes">
        Your current reservations
      </div>
      <div id="userPrevRes">
        Your previous reservations
      </div>
      </>
      )}
    </div>
  )
}
