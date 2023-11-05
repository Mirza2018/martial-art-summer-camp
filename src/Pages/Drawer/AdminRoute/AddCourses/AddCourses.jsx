import useAuth from "../../../../hooks/useAuth";



const AddCourses = () => {
    const { user } = useAuth()
    const imaegHostUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_secret_key}`


    const handleForm = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const image = e.target.image.files[0];
        const seat = e.target.seat.value;
        const price = e.target.price.value;


        console.log(image);
        const formData = new FormData()
        formData.append("image", image)
        fetch(imaegHostUrl, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                console.log(imageData);
                if (imageData.success) {
                    const updata = {
                        name, image: imageData.data.image.url, seat, price, iname: user.displayName, email: user.email
                    }
                    fetch('http://localhost:5000/class/instructor', {
                        method: "POST",
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
            })




        // console.log(data);

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>

                </div>
                <div className="card shadow-2xl bg-base-100">
                    <form onSubmit={handleForm} className="card-body">
                        <label className="mx-auto my-3 text-3xl font-bold ">Add Class</label>
                        <div className="flex gap-5">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image</span>
                                </label>
                                <input type="file" name="image" placeholder="image" required className="file-input file-input-bordered file-input-success w-full max-w-xs" />
                            </div>
                        </div>
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Total seats</span>
                                </label>
                                <input type="number" name="seat" placeholder="seats" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="number" name="price" placeholder="price" className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Submit </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddCourses;