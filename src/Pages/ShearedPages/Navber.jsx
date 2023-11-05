import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navber = () => {
    const { user, handleLogOut } = useAuth()
    const liTag = <>

        <NavLink className={({ isActive }) => (isActive ? "btn  rounded-lg  border-0 text-white  bg-orange-400 m-2" : "btn  border-0 btn-outline rounded-lg border-b-4 bg-orange-400  m-2")} to='/'><li><a>Home</a></li>  </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "btn border-0 rounded-lg text-white bg-orange-400  m-2" : "btn btn-outline border-0 rounded-lg border-b-4 bg-orange-400  m-2")} to='/login'> <li><a>Login</a></li> </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "btn border-0 rounded-lg text-white  bg-orange-400  m-2" : "btn btn-outline border-0 rounded-lg border-b-4 bg-orange-400  m-2")} to='/register'> <li><a>Register</a></li> </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "btn border-0 rounded-lg text-white  bg-orange-400  m-2" : "btn btn-outline border-0 rounded-lg border-b-4 bg-orange-400  m-2")} to='/dashboard/addcourses'> <li><a>DashBoard</a></li> </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "btn border-0 rounded-lg text-white  bg-orange-400  m-2" : "btn btn-outline border-0 rounded-lg border-b-4 bg-orange-400  m-2")} to='/dashboard/allclasses'> <li><a>AllClasses</a></li> </NavLink>




    </>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {liTag}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {liTag}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ?
                        <><button className="btn btn-outline border-0 rounded-lg border-b-4 bg-orange-400"> {user?.email}</button></>
                        : ""}

                    {user ?
                        <><button className="btn btn-outline border-0 rounded-lg border-b-4 bg-orange-400"> <span onClick={() => handleLogOut()} >Logout</span></button></>
                        : ""}

                </div>
            </div>
        </div>
    );
};

export default Navber;