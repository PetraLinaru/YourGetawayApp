import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const [auth, setAuth] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (localStorage.getItem('token')) {
            setAuth(localStorage.getItem('token'));
        }
    }, []);

    useEffect(() => {
        console.log(auth); // This will log the updated value of auth
    }, [auth]);

    return sessionStorage.getItem('token')!=null ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
