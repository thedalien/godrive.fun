import "./css/User.css";
import api from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser, setLoggedOut } from "../features/appSlice";
import { useDispatch } from "react-redux";

export default function UserPage() {
  const [userData, setUserData] = useState([]);
  const [showChangePw, setShowChangePw] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await api.post('/api/user/login/token', { token });
        setUserData(response.data.user);
        dispatch(setUser(response.data.user));
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        setUserData(null);
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.setItem("logout", "true");
        navigate('/login');
      }
    };
    fetchUserData();

    const fetchBookings = async () => {
      if (!userData?.id) return;
      try {
        const response = await api.get('/api/book/getBookingByUser/' + userData.id);
        setBookings(response.data);
      } catch (error) { }
    };
    fetchBookings();
  }, [userData]);

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
        currentPassword,
        newPassword,
      }).then((res) => {
        if (res.data.success) {
          alert("User updated successfully");
          localStorage.setItem("user", JSON.stringify(res.data.user));
          dispatch(setUser(res.data.user));
          setShowChangePw(false);
        } else {
          alert(res.data.message);
        }
      });
    } catch (error) { }
  };

  const handleBookingCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const response = await api.put(`/api/book/cancel/${bookingId}`);
      if (response.data.success) {
        alert("Booking cancelled successfully");
        setBookings(bookings.filter(booking => booking.id !== bookingId));
      } else {
        alert(response.data.message);
      }
    } catch (error) { }
  }

  const renderBookings = (condition) => bookings.map((booking) => {
    if (condition(booking)) return;
    return (
      <div className="booking" key={booking.id}>
        <div className="bookingDetail">
        <div className="bookingDetailTitle">
          {booking.car.brand} {booking.car.model}
        </div>
        <div className="bookingDetail">
          <div className="bookingDetailTitle">
            Booking ID: {booking.id}
          </div>
          <div className="bookingDetail">
            <div className="bookingDetail">
              <div className="bookingDetailTitle">
                Start Date: {new Date(booking.startDate).toLocaleDateString()}
              </div>
              <div className="bookingDetailTitle">
                End Date: {new Date(booking.endDate).toLocaleDateString()}
              </div>
              <div className="bookingDetailTitle">
                Price: {booking.totalPrice} EUR
              </div>
              <div className="bookingDetailTitle">
                Status: {booking.status}
              </div>
              <button style={{backgroundColor: "red"}} onClick={() => handleBookingCancel(booking.id)}>Cancel</button>
              {booking.status === "active" && (
                <div className="bookingWarning">
                  <span style={{ color: "red" }}>WARNING:</span> This booking is still active.
                </div>
              )}                
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  });

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
          <div id="userResList">
            <h2>Active Bookings</h2>
            {renderBookings(booking => booking.status === "cancelled" || new Date(booking.endDate) < new Date())}
          </div>
          <h2>Previous Bookings</h2>
          <div id="userPrevRes">
            {renderBookings(booking => booking.status !== "cancelled" && new Date(booking.endDate) > new Date())}
          </div>
        </>
      )}
    </div>
  )
}
