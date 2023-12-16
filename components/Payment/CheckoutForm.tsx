"use client";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { IS_TEST_MODE, TEST_CARD_NUMBER } from "./consts";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // http://localhost:3000/checkout/success"
    const return_url = "http://localhost:3000/orders";

    React.useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage(
                        "Your payment was not successful, please try again."
                    );
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
        // Add window.location.search as a dependency
    }, [stripe]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: return_url,
            },
        });
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (
            error?.type === "card_error" ||
            error?.type === "validation_error"
        ) {
            setMessage(error.message ?? "");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <div className="flex flex-col p-2 ">
            <div className="p-1 text-sm">
                {IS_TEST_MODE
                    ? "Use this card to test: " + TEST_CARD_NUMBER
                    : ""}
            </div>
            <form
                id="payment-form"
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded-lg gap-2 flex flex-col"
            >
                <PaymentElement
                    id="payment-element"
                    // options={paymentElementOptions}
                />
                <div className="flex justify-end">
                    <button
                        disabled={isLoading || !stripe || !elements}
                        id="submit"
                        className="p-2 bg-slate-200 rounded h-10 w-1/2                        "
                    >
                        <span id="button-text">
                            {isLoading ? "Processing..." : "Pay now"}
                        </span>
                    </button>
                </div>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
}
