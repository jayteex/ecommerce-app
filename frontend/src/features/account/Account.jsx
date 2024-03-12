// frontend/src/features/account/Account.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography, InputLabel } from '@mui/material';
import { selectUser } from '../signin/signInSlice';
import { updateUserRequest, updateUserSuccess, updateUserFailure } from './accountSlice';
import { updateAccount } from '../../api/updateAccount'; 
import { fetchSessionDataAndUpdateStore } from '../signin/signInSlice'; 
import './Account.css'; 

export default function Account() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        // Check if there are any changes
        const isChanged =
            editedUser.firstname !== user.firstname ||
            editedUser.lastname !== user.lastname ||
            editedUser.email !== user.email ||
            editedUser.address !== user.address ||
            editedUser.city !== user.city;
    
        if (isChanged) {
            dispatch(updateUserRequest());
            try {
                // Call API to update account
                await updateAccount(editedUser);
                dispatch(updateUserSuccess(editedUser));
                dispatch(fetchSessionDataAndUpdateStore());
            } catch (error) {
                dispatch(updateUserFailure(error.message));
            }
        }
        setEditMode(false); 
    };
    
    const handleChange = (e) => {
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.value,
        });
    };

    if (!user) {
        return (
            <div>
                <p>You need to be logged in to access this part of the page.</p>
            </div>
        );
    }

    return (
        <div className="account-container"> 
            <Typography variant="h3" className="account-title">Account Page</Typography>
            <div>
                <InputLabel>First Name</InputLabel>
                <TextField
                    className="account-field"
                    name="firstname"
                    value={editMode ? editedUser.firstname : user.firstname}
                    onChange={handleChange}
                    disabled={!editMode}
                />
                <InputLabel>Last Name</InputLabel>
                <TextField
                    className="account-field"
                    name="lastname"
                    value={editMode ? editedUser.lastname : user.lastname}
                    onChange={handleChange}
                    disabled={!editMode}
                />
                <InputLabel>Email</InputLabel>
                <TextField
                    className="account-field" 
                    name="email"
                    value={editMode ? editedUser.email : user.email}
                    onChange={handleChange}
                    disabled={!editMode}
                />
                <InputLabel>Address</InputLabel>
                <TextField
                    className="account-field" 
                    name="address"
                    value={editMode ? editedUser.address : user.address}
                    onChange={handleChange}
                    disabled={!editMode}
                />
                <InputLabel>City</InputLabel>
                <TextField
                    className="account-field" 
                    name="city"
                    value={editMode ? editedUser.city : user.city}
                    onChange={handleChange}
                    disabled={!editMode}
                />
                {editMode ? (
                    <Button className="account-button" onClick={handleSave}>Save</Button>
                ) : (
                    <Button className="account-button" onClick={handleEdit}>Edit</Button>
                )}
            </div>
        </div>
    );
}



