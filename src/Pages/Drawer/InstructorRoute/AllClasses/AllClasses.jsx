import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';


const AllClasses = () => {
    const { user } = useAuth()
    const [classes, setClasses] = useState([])
    const [users, setUsers] = useState([])
    const [classId, setClassId] = useState([])
    const [myCreateClass, setMyCreateClass] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => {
                
                const AproveClasses = data.filter(d => d.status === "approved")
setClasses(AproveClasses)
                const createclasses = data.filter(d => d.email === user.email)

                const createClassIds = createclasses.map(createClass => createClass._id)
                setMyCreateClass(createClassIds)
            })
    }, [user])

    useEffect(() => {
        fetch('http://localhost:5000/payment')
            .then(res => res.json())
            .then(data => {
                const myclass = data.filter(d => d.studentEmail === user?.email)
                const myclassIds = myclass.map(c => c.classId)

                setClassId(myclassIds)
            })
    }, [user])

    console.log("classsssss", classId);
    console.log("myclass", myCreateClass);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                const email = user.email;
                const userEmail = data.find(d => d.email === email)
                setUsers(userEmail)

            })
    }, [user])





    return (
        <div className="m-16 grid xl:grid-cols-3 lg:grid-cols-2 gap-2">

            {
                classes.map(c =>

                    <div key={c._id} className={c.seat == 0 ? "card w-96 glass m-4 bg-red-500 text-white" : "card w-96 glass m-4 "}>
                        <figure ><img className=' max-h-72' src={c.image} alt="car!" /></figure>
                        <div className="card-body">
                            {
                                myCreateClass.find(id => id === c._id) === c._id && <h1 className='text-center font-black text-green-500'>You create This class</h1>
                            }
                            <h2 className="card-title">{c.name}</h2>
                            <div className='flex py-4'>
                                <p> Teacher Name: {c.email}</p>
                                <p >Availavle seat: <span className='text-cyan-600'>{c.seat}</span>  </p>
                            </div>


                            <div className="card-actions justify-end ">

                                <p>Price: ${c.price}</p>

                                {users.roll === "Admin" || users.roll === "Instructor" || c.seat == 0 || classId.filter(Id => Id === c._id) == c._id ? "" : <Link to={`/payment/${c._id}`}><button className="btn btn-primary">Percess now!</button></Link>}

                                {c.seat == 0 ? <button className="btn btn-warning"  >Seat full</button> : ""}

                                {classId.filter(Id => Id === c._id) == c._id ? <button className="btn btn-info">All ready purcess!</button> : ""}
                                {
                                    users.roll === "Admin" ? <button className="btn btn-info"  >Admin Access</button> : ""
                                }
                                {
                                    users.roll === "Instructor" ? <button className="btn btn-info"  >Instructor Access</button> : ""
                                }


                            </div>
                        </div>
                    </div>
                )
            }





        </div>
    );
};

export default AllClasses;