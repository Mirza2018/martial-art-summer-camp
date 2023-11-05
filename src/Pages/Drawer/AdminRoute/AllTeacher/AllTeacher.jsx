import { useEffect, useState } from "react";
import TeacterClassDetails from "./TeacterClassDetails";


const AllTeacher = () => {
    const [instructor, setInstructor] = useState()
    const [click, setclick] = useState(false)
    const [check, setcheck] = useState("")
    useEffect(() => {
        fetch("http://localhost:5000/instructordetails")
            .then(res => res.json())
            .then(data => {
                const allInstructor = data.filter(d => d.roll === "Instructor")
                setInstructor(allInstructor)
            })
    }, [])


    const todo= (id,click) => {
        setclick(!click);
        setcheck(id);
    }
console.log(click,check);


if (!instructor) {
    return <h1>Loading!!!!</h1>
}
return (
    <div className="flex gap-20">
        {
            instructor.map(i =>
                <div key={i._id} className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src={i.iamge} /></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {i.name}
                            <div className="badge badge-secondary">{i.email}</div>
                        </h2>

                        <div className="card-actions justify-start">
                            <div className="badge badge-outline">class Taken</div>
                            <div className="badge badge-outline">{i.classes.length}</div>
                        </div>

                        <ol>
                            {
                                i.classes.map((c, index) => <li>{index + 1}.{c.name}</li>)
                            }
                        </ol>

                        <button onClick={() => todo(i._id,click)} className="btn btn-primary">
                            Details
                        </button>
                        {
                           click  && check === i._id ? <TeacterClassDetails classes={i.classes}></TeacterClassDetails> : ""
                        }

                    </div>
                </div>)
        }
    </div>
)
}

export default AllTeacher;