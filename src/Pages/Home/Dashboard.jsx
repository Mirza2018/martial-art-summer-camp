import React from 'react';
import Drawer from '../Drawer/Drawer/Drawer';
import { Outlet } from 'react-router-dom';
import Navber from '../ShearedPages/Navber';
import Footer from '../ShearedPages/Footer';

const Dashboard = () => {
    return (
        <div>
            <Navber></Navber>
            <div className='grid grid-cols-4 gap-2'>
                <div className='col-span-1'><Drawer></Drawer></div>
                <div className='col-span-3'><Outlet></Outlet></div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;