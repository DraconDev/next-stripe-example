import CheckoutBox from "@/components/Payment/CheckoutBox";
import { NextPage } from "next";

const DonatePage: NextPage = () => {
    return (
        <div title="Donate with Checkout | Next.js + TypeScript Example">
            <div className="page-container">
                <h1>Donate with Checkout</h1>
                <p>Donate to our project 💖</p>
                <CheckoutBox />
            </div>
        </div>
    );
};

export default DonatePage;
