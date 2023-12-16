import { CartItem } from "@/types/payment";
import { ACTIVE_CURRENCY } from "./consts";

export async function generatePaymentIntentWithCart(cartItems: CartItem[]) {
    try {
        const response = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cartItems: cartItems,
                currency: ACTIVE_CURRENCY,
            }),
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

// export function convertBasketToCart(basket: BasketItemType[]) {
//     return basket.map((item) => {
//         return {
//             quantity: item.quantity,
//             price: item.product.price,
//         };
//     });
// }
