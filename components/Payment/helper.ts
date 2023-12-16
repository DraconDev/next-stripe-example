import { CartItem } from "@/types/cart";

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
