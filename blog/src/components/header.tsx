// Header.js
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 w-full border-b border-zinc-100 bg-white px-4 sm:px-8">
        <div className="flex h-12 items-center justify-between sm:h-16">
          <Button
            variant="link"
            className="font-sans text-sm font-medium sm:text-base"
          >
            <Link to="/">MAOSHUO CHEN</Link>
          </Button>

          {/* Desktop navigation */}
          <nav className="hidden items-center space-x-2 sm:flex">
            <Button variant="link" className="text-sm font-normal sm:text-base">
              <Link to="/projects">Projects</Link>
            </Button>
            <Button variant="link" className="text-sm font-normal sm:text-base">
              <Link to="/about">About me</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="p-2 sm:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile navigation */}
        {open && (
          <nav className="flex flex-col space-y-2 py-2 sm:hidden">
            <Button
              variant="link"
              className="text-left text-sm font-normal"
              onClick={() => setOpen(false)}
            >
              <Link to="/projects">Projects</Link>
            </Button>
            <Button
              variant="link"
              className="text-left text-sm font-normal"
              onClick={() => setOpen(false)}
            >
              <Link to="/about">About me</Link>
            </Button>
          </nav>
        )}
      </header>
      <Outlet />
    </>
  );
}
