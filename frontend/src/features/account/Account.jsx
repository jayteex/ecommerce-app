// frontend/src/features/account/Account.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../signin/signInSlice'; // Assuming this selector exists to get the user

export default function Account() {
    const user = useSelector(selectUser); // Get the user from Redux store

    // Check if the user is authenticated
    if (!user) {
        // If user is not authenticated, render a message or redirect to login
        return (
            <div>
                <p>You need to be authenticated to access this page.</p>
                {/* Add code to redirect to login page */}
            </div>
        );
    }

    // If user is authenticated, render the account page
    return (
        <>
            <h1>Account Page</h1>
            {/* Add account-related content here */}
        </>
    );
};