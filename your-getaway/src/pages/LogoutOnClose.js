import React, { useEffect } from 'react';

const LogoutOnClose = () => {
    // Define a function to remove the token from localStorage
    const clearLocalStorage = () => {
        localStorage.removeItem('token');
    };

    // Add an event listener for the beforeunload event
    useEffect(() => {
        const handleBeforeUnload = () => {
            clearLocalStorage();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []); // Empty dependency array to ensure this effect runs only once

    return null; // This component doesn't render anything to the DOM
};

export default LogoutOnClose;
