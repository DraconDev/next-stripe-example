import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-slate-200">
            <Link href="/checkout/pay">Checkout</Link>
        </main>
    );
}
