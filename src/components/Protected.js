import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Protected = ({Children}) => {
    const {user} = useAuth()
    if (!user) {
        return <Navigate to='/' />;
    }


return Children
};

export default Protected