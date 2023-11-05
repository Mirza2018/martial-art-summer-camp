import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';

const CheckoutFrom = ({ price, cart }) => {


    const { user } = useAuth()
    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transectionId, setTransectionId] = useState('');


    const mirza = "jijjikjidhuehqdjgjhdjbswj"
    useEffect(() => {
        if (price > 0) {
            fetch("http://localhost:5000/create-payment-intent", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ price })
            })
                .then(res => res.json())
                .then(data => {
                    setClientSecret(data.clientSecret)
                })
        }
    }, [price])





    // console.log(clientSecret);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: "card", card
        })
        if (error) {
            console.log("error", error);
            setCardError(error.message)

        }
        else {
            // console.log("Payment Mathod", paymentMethod);
            setCardError('')
        }
        setProcessing(true)
        const { paymentIntent, error: confrimError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "unknow",
                        name: user?.displayName || 'anonymous',
                    },
                },
            },
        );
        if (confrimError) {
            console.log(confrimError);
        }

        console.log("Payment Intent", paymentIntent);
        setProcessing(false)
        if (paymentIntent.status === "succeeded") {
            setTransectionId(paymentIntent.id)
            const payment = {
                studentEmail: user?.email,
                transectionId: paymentIntent.id,
                price,
                date: new Date(),
                status: 'service pending',
                instructorEmail: cart?.email,
                classId: cart?._id
            }
            console.log("paymememmemememememmeme", payment);






            fetch("http://localhost:5000/payment", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Payment success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }

                    console.log(data);
                })

        }
    }
    return (
        <div className='w-1/2 mx-auto'>

            {cardError && <h3 className='text-2xl text-red-600 text-center my-4 rounded bg-slate-600'>{cardError}</h3>}
            {transectionId && <h3 className='text-2xl text-green-600 text-center my-4 rounded bg-slate-600'>Transection success with transsection id:{transectionId}</h3>}
            <form className='w-2/3 m-8' onSubmit={handleSubmit}>
                <CardElement
                    options={{


                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {/* <button className='btn btn-primary btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay {price}
                </button> */}
                <button className='btn btn-primary btn-sm mt-4' type="submit">
                    Pay {price}
                </button>
            </form>
        </div>
    );
};

export default CheckoutFrom;