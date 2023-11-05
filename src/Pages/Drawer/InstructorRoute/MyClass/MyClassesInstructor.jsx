import React, { useEffect, useState } from 'react';
import TeacterClassDetails from '../../AdminRoute/AllTeacher/TeacterClassDetails';
import useAuth from '../../../../hooks/useAuth';

const MyClassesInstructor = () => {
    const [instructor, setInstructor] = useState([])
    const { user } = useAuth()

    useEffect(() => {
        fetch("http://localhost:5000/instructordetails")
            .then(res => res.json())
            .then(data => {
                const allInstructor = data.filter(d => d.roll === "Instructor")

                const oneInstructor = allInstructor.find(d => d.email === user?.email)

                setInstructor(oneInstructor?.classes)
            })
    }, [user])


    if (!instructor) {
        return <h1>Loading!!!!</h1>
    }
    return (
        <div >


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Seat</th>
                            <th className='text-rigth'>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            instructor.map(c =>
                                <tr key={c._id}>

                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={c.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{c.name}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Seat: {c.seat}

                                    </td>
                                    <td className='text-right'>${c.price}</td>
                                    <th>
                                        {
                                            c.status ? <button className="btn btn-ghost btn-xs">{c.status}</button> : <button className="btn btn-ghost btn-xs">pending</button>
                                        }

                                    </th>
                                </tr>
                            )
                        }




                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default MyClassesInstructor;