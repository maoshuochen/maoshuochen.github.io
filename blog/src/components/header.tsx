import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ to, children, onClick }: NavLinkProps) => (
  <Button
    variant="link"
    className={clsx("text-sm font-normal", "sm:text-base")}
    onClick={onClick}
  >
    <Link to={to}>{children}</Link>
  </Button>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const links = [
    { to: "/", label: t('projects') },
    { to: "/about", label: t('aboutMe') },
  ];

  return (
    <>
      <header
        className={clsx(
          "sticky top-0 w-full border-b px-4",
          "bg-background dark:bg-background",
          "border-zinc-100 dark:border-zinc-800",
          "sm:px-8",
        )}
      >
        <div
          className={clsx("flex h-12 items-center justify-between", "sm:h-16")}
        >
          <Button
            variant="link"
            className={clsx("font-sans text-sm font-medium", "sm:text-base")}
          >
            <Link to="/">MAOSHUO CHEN</Link>
          </Button>

          {/* Desktop navigation */}
          <nav className="hidden items-center space-x-2 sm:flex">
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to}>
                {label}
              </NavLink>
            ))}
            <ThemeToggle />
            <LanguageToggle />
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
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
            <div className="flex items-center space-x-2 px-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </nav>
        )}
      </header>
      <Outlet />
    </>
  );
}
