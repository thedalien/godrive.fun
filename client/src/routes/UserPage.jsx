import "./css/User.css";
import api from "../api";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.post('/api/user/login/token', { token });
        setUserData(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);


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
          <button >Change Password</button>
        </div>
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
