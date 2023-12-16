import { CartItem } from "@/types/cart";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items: CartItem[]) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

export async function POST(req: NextRequest, res: NextResponse) {
    const { cartItems }: { cartItems: CartItem[] } = await req.json();

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(cartItems),
            currency: "eur",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            error: "Error creating checkout session",
        });
    }
}
