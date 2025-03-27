import { Button } from "@/components/ui/button";
import { Outlet, Link } from "react-router-dom";
export default function Header() {
  return (
    <>
      <header className="sticky top-0 flex h-16 w-full items-center space-x-2 border-b border-zinc-100 bg-white px-8">
        <Button variant="link" className="font-sans font-medium">
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
