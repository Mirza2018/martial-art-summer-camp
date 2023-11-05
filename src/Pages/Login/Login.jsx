import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const { handleLogin } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleForm = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        //console.log(email, password);
        handleLogin(email, password)
            .then(res => {
                Swal.fire(
                    'Login successfully done!',
                    'You Logged in!',
                    'success'
                )
                e.target.value = "";
                navigate(from)

            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center md:1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleForm} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                New user?<Link to='/register'> <a href="#" className="label-text-alt link link-hover">Sign Up</a></Link>

                            </label>

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login </button>
                        </div>


                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;