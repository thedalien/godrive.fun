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
  const [showChangePw, setShowChangePw] = useState(false);

  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");


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

  const handleUserChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      api.put(`/api/user/update/${userData.id}`, {
        // name,
        // email: newEmail,
        currentPassword,
        newPassword,
      }).then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("User updated successfully");
          localStorage.setItem("user", JSON.stringify(res.data.user));
          dispatch(setUser(res.data.user));
          setShowChangePw(false);
        } else {
          alert(res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div id="user">
      {userData && (
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
            <button onClick={() => setShowChangePw(!showChangePw)}>Change Password</button>
            {showChangePw && (
              <form>
                {/* <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>E-Mail</label>
                  <input type="text" name="email" onChange={e => setNewEmail(e.target.value)} />
                </div> */}
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" name="currentPassword" onChange={e => setCurrentPassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" name="newPassword" onChange={e => setNewPassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" name="confirmNewPassword" onChange={e => setConfirmNewPassword(e.target.value)} />
                </div>
                <button onClick={handleUserChange} type="submit">Submit</button>
              </form>
            )}
            <br />
            <br />
            <button style={{backgroundColor: 'red'}} onClick={logoutHandler}>Logout</button>
            {userData.role === "admin" && (
              <div>
                <br/>
                <button onClick={() => navigate('/admin')}>Admin Page</button>
              </div>
            )}
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
