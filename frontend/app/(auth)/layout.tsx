import Link from "next/link";
import Logo from "@/app/_components/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
        <Logo />
        <Link
          href="/"
          className="text-xs uppercase tracking-[1.5px] text-muted transition-colors hover:text-on-dark"
        >
          ← Home
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  );
}
