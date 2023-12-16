import { CartItem } from "@/types/cart";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

function useGetClientSecret(cartItems: CartItem[]) {
    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
    );
    const [clientSecret, setClientSecret] = useState("");

    fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cartItems }),
    })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
}
