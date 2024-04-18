import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { toast } from "react-toastify";

function Logout() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
       
        try {
            await auth.signOut(); // Use auth from Firebase.js
            
            navigate("/");
            toast.success(`Logout  successfully`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button type="button" className="btn btn-dark" onClick={handleSubmit}>Logout</button>
        </div>
    );
}

export default Logout;