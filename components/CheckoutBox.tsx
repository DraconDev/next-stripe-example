"use client";
import { generatePaymentIntentWithCart } from "@/utils/generatePaymentIntentWithCart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const CheckoutWrapper = ({ children }: { children?: React.ReactNode }) => {
    const [clientSecret, setClientSecret] = React.useState("");

    useEffect(() => {
        generatePaymentIntentWithCart([]).then((secret) => {
            setClientSecret(secret);
        });
    }, []);

    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret,
    };

    return (
        <div className="">
            {clientSecret && (
                <Elements
                    options={options}
                    stripe={stripePromise}
                >
                    <CheckoutForm />
                    {children && children}
                </Elements>
            )}
        </div>
    );
};

export default CheckoutWrapper;
