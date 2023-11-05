import React from 'react';

const TeacterClassDetails = ({classes}) => {
    return (
        <div className="grid  lg:grid-cols-1 gap-2">

            {
                classes.map(c =>

                    <div key={c._id} className={c.seat == 0 ? "card w-96 glass m-4 bg-red-500 text-white" : "card w-96 glass m-4 "}>
                        <figure ><img className=' max-h-72' src={c.image} alt="car!" /></figure>
                        <div className="card-body">

                            <h2 className="card-title">{c.name}</h2>
                            


                            <div className="card-actions justify-end ">

                                <p>Price: ${c.price}</p>



                            </div>
                        </div>
                    </div>
                )
            }





        </div>
    );
};

export default TeacterClassDetails;