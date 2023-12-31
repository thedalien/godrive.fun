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
        <h3>{booking.car.brand} {booking.car.model}</h3>
        <div className="bookingDetails">
          <p>Booking ID:</p>
          <div className="bookingData">{booking.id}</div>
        </div>
        <div className="bookingDetails">
          <p>Start Date:</p>
          <div className="bookingData">{new Date(booking.startDate).toLocaleDateString()}</div>
        </div>
        <div className="bookingDetails">
          <p>End Date:</p>
          <div className="bookingData">{new Date(booking.endDate).toLocaleDateString()}</div>
        </div>
        <div className="bookingDetails">
          <p>Price:</p>
          <div className="bookingData">{booking.totalPrice} EUR</div>
        </div>
        <div className="bookingDetails">
          <p>Status:</p>
          <div className="bookingData">{booking.status}</div>
        </div>
        <button className="mainButtons" onClick={() => handleBookingCancel(booking.id)}>Cancel</button>
        {booking.status === "active" && (
          <div className="bookingWarning">
            <span style={{ color: "red" }}>WARNING:</span> This booking is still active.
          </div>
        )}                
      </div>
    )
  });

  const previousBookingsList = bookins.map((booking) => {
    // show only previous bookings and cancelled bookings
    if (booking.status !== "cancelled" && new Date(booking.endDate) > new Date()) return;
    return (
      <div className="booking" key={booking.id}>
        <h3>{booking.car.brand} {booking.car.model}</h3>
        <div className="bookingDetails">
          <p>Booking ID:</p>
          <div className="bookingData">{booking.id}</div>
        </div>
        <div className="bookingDetails">
          <p>Start Date:</p>
          <div className="bookingData">{new Date(booking.startDate).toLocaleDateString()}</div>
        </div>
        <div className="bookingDetails">
          <p>End Date:</p>
          <div className="bookingData">{new Date(booking.endDate).toLocaleDateString()}</div>
        </div>
        <div className="bookingDetails">
          <p>Price:</p>
          <div className="bookingData">{booking.totalPrice} EUR</div>
        </div>
        <div className="bookingDetails">
          <p>Status:</p>
          <div className="bookingData">{booking.status}</div>
        </div>
        {booking.status === "active" && (
          <div className="bookingWarning">
            <span style={{ color: "red" }}>WARNING:</span> This booking is still active.
          </div>
        )}                
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
              <button className="mainButtons" onClick={() => navigate('/admin')}>Admin Page</button>
            )}
            <button className="mainButtons" onClick={logoutHandler}>Logout</button>
          </div>
          <div className="userData">
            <fieldset className="userDetails">
              <legend>Your current Details</legend>
              <div className="detailContainer">
                <div>
                  <div className="details">
                    E-Mail
                  </div>
                  <div className="details">
                    {userData.email}
                  </div>
                </div>
                <button className="mainButtons changePw" onClick={() => setShowChangePw(!showChangePw)}>Change E-Mail</button>
              </div>
              {!showChangePw ? (
                <div className="detailContainer">
                  <div>
                    <div className="details">
                      Password
                    </div>
                    <div className="details">
                      **********
                    </div>
                  </div>
                  <button className="mainButtons changePw" onClick={() => setShowChangePw(true)}>Change Password</button>
                </div>
              ) : (
                <div className="detailContainer show">
                  <form>
                    <div className="changeContainer">
                      <label className="changePwLabel">Current Password</label>
                      <input className="changePwInput" type="password" name="currentPassword" onChange={e => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="changeContainer">
                      <label className="changePwLabel">New Password</label>
                      <input className="changePwInput" type="password" name="newPassword" onChange={e => setNewPassword(e.target.value)} />
                    </div>
                    <div className="changeContainer">
                      <label className="changePwLabel">Confirm New Password</label>
                      <input className="changePwInput" type="password" name="confirmNewPassword" onChange={e => setConfirmNewPassword(e.target.value)} />
                    </div>
                    <div className="changeContainer">
                      <button className="mainButtons changeCancel" onClick={handleUserChange} type="submit">Submit</button>
                      <button className="mainButtons changeSubmit" onClick={() => setShowChangePw(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </fieldset>
            <fieldset className="userResList">
              <legend>Your current reservations</legend>
              {upcommingbookingsList}
            </fieldset>
            <fieldset className="userPrevRes">
              <legend>Your previous reservations</legend>
              {previousBookingsList}
            </fieldset>
          </div>
        </>
      )}
    </div>
  )
}