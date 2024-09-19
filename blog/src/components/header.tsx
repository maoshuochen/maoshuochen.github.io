import { Button } from "@/components/ui/button";
import { Outlet, Link } from "react-router-dom";
export default function Header() {
    return (
        <>
            <header className="sticky top-0 w-full h-16 flex items-center space-x-2 px-8 bg-white border-b border-zinc-100">
                <Button variant="ghost">
                    <Link to="/">MAOSHUO CHEN</Link>
                </Button>
                <Button variant="link" className="font-normal">
                    <Link to="/">Projects</Link>
                </Button>
                <Button variant="link" className="font-normal">
                    About me
                </Button>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}