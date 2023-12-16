"use client";
import { CartItem } from "@/types/cart";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

export async function generatePaymentIntentWithCart(cartItems: CartItem[]) {
    try {
        const response = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cartItems: cartItems }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data.clientSecret;
    } catch (error) {
        throw error;
    }
}

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
