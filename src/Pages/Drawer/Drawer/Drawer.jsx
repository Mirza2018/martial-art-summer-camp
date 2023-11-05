import React from 'react';
import { Link } from 'react-router-dom';

const Drawer = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <Link to='/dashboard/allusers'><li className='btn '>All users</li></Link>
                        <Link to='/dashboard/manageclasses'><li className='btn '>Manage Clasees</li></Link>


                        <Link to='/dashboard/myclassinstructor'><li className='btn '>Instructor My class</li></Link>
                        <Link to='/dashboard/addcourses'><li className='btn '>ADD Classes</li></Link>



                        <Link to='/dashboard/myclassuser'><li className='btn '>User My Class</li></Link>
                        <Link to='/dashboard/allteacher'><li className='btn '>All Teacher</li></Link>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Drawer;