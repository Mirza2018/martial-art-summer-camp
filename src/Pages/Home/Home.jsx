import React from 'react';
import Navber from '../ShearedPages/Navber';
import { Outlet } from 'react-router-dom';
import Footer from '../ShearedPages/Footer';

const Home = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Home;