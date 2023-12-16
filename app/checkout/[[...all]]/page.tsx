import CheckoutBox from "@/components/Payment/CheckoutBox";
import { NextPage } from "next";

const DonatePage: NextPage = () => {
    return (
        <div title="Donate with Checkout | Next.js + TypeScript Example">
            <div className="page-container">
                <CheckoutBox />
            </div>
        </div>
    );
};

export default DonatePage;
