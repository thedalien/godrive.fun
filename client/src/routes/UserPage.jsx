import "./css/User.css";
import api from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser, setLoggedOut } from "../features/appSlice";
import { useDispatch, useSelector } from "react-redux";

export default function UserPage() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showChangePw, setShowChangePw] = useState(false);
  const tokenFromRedux = useSelector((state) => state.app.token);
  console.log(tokenFromRedux);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [bookins, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.post('/api/user/login/token', { token });
        setUserData(response.data.user);
        dispatch(setUser(response.data.user));
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };
    fetchUserData();

  }, []);

  const fetchBookings = async () => {
    try {
      if (!userData.id) return;
      const response = await api.get('/api/book/getBookingByUser/' + userData.id);
      console.log(response.data);
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
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
    if (newPassword !== confirmNewPassword || !newPassword || !confirmNewPassword) {
      alert("Please enter your new password / Confirm your new password");
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

  const handleBookingCancel = async (bookingId) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;
    try {
      const response = await api.put(`/api/book/cancel/${bookingId}`);
      console.log(response.data);
      if (response.data.success) {
        alert("Booking cancelled successfully");
        fetchBookings();
      } else {
        alert(response.data.message);
      }
      // refresh page
      window.location.reload(); // fix this later to not reload the page but to update the state
    } catch (error) {
      console.log(error);
    }
  }

  const upcommingbookingsList = bookins.map((booking) => {
    if (booking.status === "cancelled") return;
    if (new Date(booking.endDate) < new Date()) return;
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
    )
  });

  const previousBookingsList = bookins.map((booking) => {
    // show only previous bookings and cancelled bookings
    if (booking.status !== "cancelled" && new Date(booking.endDate) > new Date()) return;
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
    )
  });


  return (
    <div id="user">
      {userData && (
        <>
          <div className="userHeader">
            <h1>Hello {userData.name}</h1>
            {userData.role === "admin" && (
              <div>
                  <br/>
                  <button onClick={() => navigate('/admin')}>Admin Page</button>
              </div>
            )}
            <button className="loginButtons" onClick={logoutHandler}>Logout</button>
          </div>
          <div className="userData">
            <div className="userDetails">
              <h3>Your current Details</h3>
              <div className="detailContainer">
                <div className="details">
                  E-Mail:
                </div>
                <div className="details">
                  {userData.email}
                </div>
              </div>
              <button className="" onClick={() => setShowChangePw(!showChangePw)}>Change Password</button>


              {showChangePw && (
                <form>
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
                  <button onClick={() => setShowChangePw(false)}>Cancel</button>
                </form>
              )}
            </div>
          <div id="userResList">
            Your current reservations
            {upcommingbookingsList}
          </div>
          <div id="userPrevRes">
            Your previous reservations
            {previousBookingsList}
          </div>
          </div>
        </>
      )}
    </div>
  )
}