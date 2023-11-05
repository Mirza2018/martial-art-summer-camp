import React, { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import { useEffect } from 'react';

const MyClassesUser = () => {
    const { user } = useAuth()
    const [classes, setClasses] = useState([])
    const [payments, setPayments] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/classes")
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })
    }, [])


    useEffect(() => {
        fetch("http://localhost:5000/payment")
            .then(res => res.json())
            .then(data => {
                const studentPayClasses = [];
                for (const pay of data) {
                    if (pay.studentEmail === user?.email) {

                        const matchId = classes.find(c => c._id === pay.classId)
                        studentPayClasses.push(matchId)
                    }
                   
                }
                setPayments(studentPayClasses)
            })
    }, [user,classes])

if(!payments){
return <h1>Loading.....</h1>
}
    return (
        <div>
  <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Teacther</th>
                            <th className='text-rigth'>Price</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            payments.map(c =>
                                <tr key={c?._id}>

                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={c?.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{c?.name}</div>
                                                

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    <div className="font-bold">Teacher: {c?.email}</div>

                                    </td>
                                    <td className='text-right'>${c?.price}</td>
                                  
                                   
                                </tr>
                            )
                        }




                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default MyClassesUser;