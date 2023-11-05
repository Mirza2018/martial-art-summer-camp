import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";


const Register = () => {
    const [err, setErr] = useState("")
    const navigate = useNavigate()

    const { handleCreateUser, handleUpdate, handleLogOut, user } = useAuth()
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()


    const onSubmit = (data) => {
        if (data.password !== data.cpassword) {
            return setErr({ type: "password", errMg: "Password Doesn't Match!!!" })
        }
        // if (data.phone.length !== 11) {
        //     return alert("phone nummber must 11 charecter!!!")
        // }
        const saveData = {
            name: data.name,
            email: data.email,
            phone: `+880${data.phone.slice(data.phone.length - 10, data.phone.length)}`,
            addreess: data.address,
            gender: data.gender,
            photo: data.url
        }
        console.log(saveData);
        setErr("")


        handleCreateUser(data.email, data.password)
            .then(res => {
                console.log(res.user);
                handleUpdate(data.name, data.url)
                    .then(() => {


                        fetch('http://localhost:5000/user', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveData)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset()
                                    handleLogOut()
                                    Swal.fire({
                                        title: 'Registartion successfully done!',
                                        icon: 'success',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Click Here to Login!!!',
                                    })
                                        .then((result) => {
                                            if (result.isConfirmed) {
                                                navigate('/login')

                                            }
                                        })
                                }
                            })






                    })
                    .catch(error => console.log(error))




            })
            .catch(error => {
                console.log(error);
            })
    }



    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Register Now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">

                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text"  {...register("url", { required: true })} placeholder="Photo Url" className="input input-bordered" />
                                {errors.url && <span className="text-red-600">Photo Url is required</span>}
                            </div>



                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>

                                <select {...register("gender", { required: true })}>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                    <option value="other">other</option>
                                </select>
                                {errors.gender && <span className="text-red-600">Gender is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input type="tel" name="phone" {...register("phone", { required: true, minLength: 11 })} placeholder="phone" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Phone number is required</span>}
                                {err && <span className="text-red-600">{err}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input type="text" name="address" {...register("address", { required: true })} placeholder="address" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[!@#$%^&*])(?=.*[A-Z])/
                                })} placeholder="password" className="input input-bordered" />

                                {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Password is must be bigger then 6 charecter </span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have one uppercase one spacial cheracter </span>}


                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" name="cpassword" {...register("cpassword", {
                                    required: true,
                                })} placeholder="password" className="input input-bordered" />
                                {err.type === "password" && <span className="text-red-600">{err.errMsg}</span>}


                            </div>

                            <div>
                                <label className="label">
                                    Alreday Have Account?<Link to='/login'> <a href="#" className="label-text-alt link link-hover">Login!!!</a></Link>
                                </label>
                            </div>



                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>



                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;