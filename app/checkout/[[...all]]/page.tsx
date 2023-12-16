import PaymentBox from "@/components/Payment/PaymentBox";
import { NextPage } from "next";

const DonatePage: NextPage = () => {
    return (
        <div title="">
            <div className="page-container">
                <PaymentBox />
            </div>
        </div>
    );
};

export default DonatePage;
