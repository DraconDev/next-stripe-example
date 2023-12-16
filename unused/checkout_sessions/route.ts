// import stripe from "@/config/stripe";
// import { CartItem } from "@/types/cart";

// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest, res: NextResponse) {
//     const headersList = headers();
//     const { cartDetails } = await req.json();
//     const cartDetailsArray: CartItem[] = Object.values(
//         cartDetails
//     ) as CartItem[];

//     const lineItems = cartDetailsArray.map((item: CartItem) => {
//         return {
//             price_data: {
//                 currency: item.currency,
//                 product_data: {
//                     name: item.name,
//                 },
//                 unit_amount: item.price,
//             },
//             quantity: item.quantity,
//         };
//     });

//     try {
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: `${headersList.get("origin")}/thank-you`,
//             cancel_url: `${headersList.get("origin")}/`,
//         });

//         return NextResponse.json({ sessionId: session.id });
//     } catch (err) {
//         console.log(err);
//         return NextResponse.json({ error: "Error creating checkout session" });
//     }
// }

import stripe from "@/config/stripe";
import { CartItem } from "@/types/cart";
import { headers } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const { cartDetails } = await req.json();

    const cartDetailsArray: CartItem[] = Object.values(cartDetails);

    const lineItems = cartDetailsArray.map((item: CartItem) => {
        return {
            price_data: {
                currency: item.currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Assuming price is in dollars, convert to cents
            },
            quantity: item.quantity,
        };
    });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${headersList.get("origin")}/thank-you`,
            cancel_url: `${headersList.get("origin")}/`,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Error creating checkout session" });
    }
}

// This is your test secret API key.