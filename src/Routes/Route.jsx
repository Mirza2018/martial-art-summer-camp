import '../index.css'
import {
    createBrowserRouter,
} from "react-router-dom";
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Login/Register';
import Dashboard from '../Pages/Home/Dashboard';
import Allusers from '../Pages/Drawer/AdminRoute/AllUsers/Allusers';
import AddCourses from '../Pages/Drawer/AdminRoute/AddCourses/AddCourses';
import AllClasses from '../Pages/Drawer/InstructorRoute/AllClasses/AllClasses';
import Payment from '../Pages/Payment/Payment';
import PrivetRoute from './PrivetRoute';
import AllTeacher from '../Pages/Drawer/AdminRoute/AllTeacher/AllTeacher';
import MyClassesUser from '../Pages/Drawer/UserRoute/MyClass/MyClassesUser';
import MyClassesInstructor from '../Pages/Drawer/InstructorRoute/MyClass/MyClassesInstructor';
import ManageClasses from '../Pages/Drawer/AdminRoute/ManageClasses/ManageClasses';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        children: [
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            }
        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'allusers',
                element: <Allusers></Allusers>
            },
            {
                path: 'addcourses',
                element: <AddCourses></AddCourses>
            },
            {
                path: 'allclasses',
                element: <AllClasses></AllClasses>
            },
            {
                path: 'allteacher',
                element: <AllTeacher></AllTeacher>
            },
            {
                path: 'myclassuser',
                element: <MyClassesUser></MyClassesUser>
            },
            {
                path: 'myclassinstructor',
                element: <MyClassesInstructor></MyClassesInstructor>
            },
            {
                path: 'manageclasses',
                element: <ManageClasses></ManageClasses>
            },
        ]
    },
    {
        path: 'payment/:id',
        element: <PrivetRoute><Payment></Payment></PrivetRoute>
    }
]);


export default router;
