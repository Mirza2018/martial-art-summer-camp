import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutFrom from './CheckoutFrom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);
const Payment = () => {
    const { id } = useParams()
    const [singleClass, setSingleClass] = useState([])
    const [price, setPrice] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => {
                const oneClass = data.find(c => c._id === id)
                setSingleClass(oneClass)

                const price = parseFloat(singleClass.price);
                setPrice(price)
            })

    }, [id, singleClass])





    return (
        <div>

            <div className="card w-96 glass mx-auto" >
                <figure ><img className=' max-h-72' src={singleClass.image} alt="car!" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{singleClass.name}</h2>
                    <div className='flex py-4'>
                        <p> Teacher Name: {singleClass.email}</p>
                        <p >Availavle seat: <span className='text-cyan-600'>{singleClass.seat}</span>  </p>
                    </div>


                    <div className="card-actions justify-end ">

                        <p>Price: ${singleClass.price}</p>
                    </div>
                </div>
            </div>

            <Elements stripe={stripePromise} >
                <CheckoutFrom price={price} cart={singleClass} ></CheckoutFrom>
            </Elements>
        </div>
    );
};

export default Payment;