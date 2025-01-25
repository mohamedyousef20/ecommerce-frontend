import axios from "axios";
import { useEffect } from "react";
import Notification from "../../customHooks/useNotification";

const CheckSession = () => {

    axios.interceptors.response.use(
        
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                // Notify the user
                Notification("Session expired. Please log in again.", "error");

                // Clear stored user data
                localStorage.removeItem("token");

                // Redirect to login page
                window.location.href = "/login";
            }
            return Promise.reject(error);
        }
    );
};

export default CheckSession;
