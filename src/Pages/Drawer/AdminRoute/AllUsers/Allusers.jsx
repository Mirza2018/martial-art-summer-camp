import { useEffect, useState } from "react";

const Allusers = () => {
    const [users, setUsers] = useState([])
    const [optionValue, setOptionValue] = useState("")


    const url = 'http://localhost:5000/users'
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
    }, [url])

    const handleRole = (e, user) => {
        e.preventDefault()
        const roll = e.target.roll.value;
        setOptionValue("")
        // const updata = {
        //     addreess: user.addreess,
        //     email: user.email,
        //     gender: user.gender,
        //     name: user.name,
        //     phone: user.phone,
        //     photo: user.photo,
        //     id: user._id,
        //     roll
        // }
        // ************POST OPERATION***?????
        // fetch(`http://localhost:5000/user/admin`, {
        //     method: "POST",
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(roll)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //     })

        // fetch(`http://localhost:5000/user/admin/${user._id}`, {
        //     method: "PATCH",
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify([roll])
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);

        //     })
        fetch(`http://localhost:5000/user/admin/${user._id}?roll=${roll}&mirza=${"mirza"}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify([roll])
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            })



    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>#</th>
                            <th>User</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Change Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.photo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                                <div className="text-sm opacity-50">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user.addreess}
                                    </td>
                                    <td>{user.phone}</td>
                                    <td>
                                        {
                                            user?.roll || "Student"

                                        }
                                    </td>

                                    <td>
                                        {/* <select>
                                            <option value="admin">Admin</option>
                                            <option value="instructor">Instructor</option>
                                            <option value="Studrnt">Student</option>
                                        </select> */}
                                        <form onSubmit={(e) => handleRole(e, user)}>
                                            <select name="roll" onChange={()=>setOptionValue(user._id)} className="select select-primary w-full max-w-xs">
                                               
                                                <option disabled selected value="Change Authority!!">Change Authority!!</option>
                                                <option value="Student">Student</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Instructor">Instructor</option>
                                            </select>
                                            {
                                                optionValue===user._id?<button className="btn btn-primary">submit </button>:""
                                            }
                                                     
                                        </form>
                                    </td>

                                </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Allusers;