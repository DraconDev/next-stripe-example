"use client";
import { CartItem } from "@/types/cart";
import getStripe from "@/utils/get-stripe";
import { FormEvent } from "react";
import { Stripe } from "stripe";

type Props = {};

const CheckoutForm = (props: Props) => {
    const cartItems: CartItem[] = [];
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Create a Checkout Session.
        const response = await fetch("/api/checkout_sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cartItems }),
        });

        if (!response.ok) {
            console.error("Network response was not ok");
            return;
        }

        const checkoutSession: Stripe.Checkout.Session = await response.json();

        // Redirect to Checkout.
        const stripe = await getStripe();
        const { error } = await stripe!.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: checkoutSession.id,
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        console.warn(error.message);
    };
    // ...

    return (
        <div className="flex flex-col">
            CheckoutForm
            <button
                onClick={handleSubmit}
                className="p-2"
            >
                buy
            </button>
        </div>
    );
};

export default CheckoutForm;
