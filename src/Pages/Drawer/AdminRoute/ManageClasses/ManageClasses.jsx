import React, { useEffect,  useState } from 'react';
import Swal from 'sweetalert2';

const ManageClasses = () => {
    const [classes, setClasses] = useState([])


    const url = "http://localhost:5000/classes"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })
    }, [url])

    const handleUpdate = (sta, id) => {

        const status = sta;
        if (status === "approved" || status === "denied") {
            Swal.fire({
                title: 'Submit your feedback',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Look up',
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading()
            })
                .then((result) => {
                    if (result.isConfirmed) {
              
                        const info = {
                            id: id, status: status, feedback: result.value
                        }
        

                        fetch("http://localhost:5000/class/instructor", {
                            method: "PUT",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(info)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                            })

                    }
                    else {
                        const info = {
                            id: id, status: status, feedback: ""
                        }

                        fetch("http://localhost:5000/class/instructor", {
                            method: "PUT",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(info)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                            })
                    }




                })
        }
        else {
            const info = {
                id: id, status: status, feedback: ""
            }

            fetch("http://localhost:5000/class/instructor", {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(info)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }



    }
    ////*******Options update */
    // const handleUpdate = (e, id) => {
    //     e.preventDefault()
    //     const status = e.target.status.value




    //     const info = {
    //         id: id, status: status
    //     }
    //     console.log(info);



    //     fetch("http://localhost:5000/class/instructor", {
    //         method: "PUT",
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(info)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //         })
    // }
    const handleNumber=(e,id)=>{
        e.preventDefault()
        const num=e.target.number.value;
        const updata={
            seat:num,id
        }
        console.log(updata);
        fetch("http://localhost:5000/class/instructor", {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updata)
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
                            <th>Name</th>
                            <th>Teacther</th>
                            <th >Price</th>
                            <th >Avilable Seats</th>
                            <th >Increase Seats</th>
                            <th >status</th>
                            <th >Change status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            classes.map(c =>
                                <tr key={c?._id}>

                                    <td>
                                        <div className="flex items-center ">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={c?.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold ml-2">{c?.name}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">Teacher: {c?.email}</div>

                                    </td>
                                    <td >${c?.price}</td>
                                    <td >Seat:{c?.seat}</td>
                                    <td >
                                      <form onSubmit={(e)=>handleNumber(e,c._id)} >
                                      <input type="number"
                                            name='number'
                                            placeholder="number" className="input input-bordered input-accent w-full max-w-xs" />
                                        <button className='btn btn-primary'>Submit</button>
                                      </form>
                                    </td>
                                    {
                                        c?.status ? <td> {c?.status}</td> : <td> pending</td>
                                    }

                                    {/* OPtions Update */}
                                    {/* <td>
                                        <form onSubmit={(e) => handleUpdate(e, c._id)}>

                                            <select onChange={() => setIds(c._id)} name="status" className="input input-bordered input-accent w-full max-w-xs">
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="denied">Denied</option>
                                            </select>
                                            {
                                                c._id === ids && <button className="btn btn-primary">submit </button>
                                            }

                                        </form>
                                    </td> */}
                                    <td >

                                        <button onClick={() => handleUpdate("pending", c._id)} className="btn btn-warning my-2">pending </button>
                                        <br />
                                        <button onClick={() => handleUpdate("approved", c._id)} disabled={c.status === "approved" || c.status === "denied"} className="btn btn-success">approved</button>
                                        <br />
                                        <button onClick={() => handleUpdate("denied", c._id)} disabled={c.status === "approved" || c.status === "denied"} className="btn btn-error my-2">denied</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ManageClasses;