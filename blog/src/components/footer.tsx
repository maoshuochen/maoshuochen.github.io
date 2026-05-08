export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex h-full w-full flex-col items-center justify-center px-4 pb-10 pt-16">
      <p className="text-sm text-zinc-400">@{year} Maoshuo Chen </p>
    </footer>
  );
}
