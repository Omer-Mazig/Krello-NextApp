import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="Logo" height={20} width={20} />
        <p className="text-lg text-neutral-700">Krello</p>
      </div>
    </Link>
  );
};
