import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const useAuthToken = async (redirect) => {
    const serverURL = useSelector((state) => state.app.serverURL);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Log the token and inspect it in your browser's console
    console.log(`Raw token from localStorage: ${token}`);

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
          // if redirect not null, redirect to that page
          if (redirect) {
            console.log(`Redirecting to ${redirect}`);
            navigate(`/${redirect}`);
          }
        } else {
          console.error(res.data.message);
          // refdirect to login page
          navigate('/login');
        } 
      } catch (err) {
        console.error(err);
        // refdirect to login page
        navigate('/login');
      }
    } else {
      // refdirect to login page
      navigate('/login');
    }
  };

export default useAuthToken;