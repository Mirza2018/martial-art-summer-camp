import React from 'react';
import useAuth from '../hooks/useAuth';
import { Children } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation();

    if (loading) {
        return <h1>loading..........</h1>
    }
    if (user) {
        return children
    }

    else return <Navigate state={{ from: location }} to='/login'></Navigate>
};

export default PrivetRoute;