/**
 * @author Tom Shortridge
 */
import Image from "next/image";
import { auth } from "@/app/auth";
import Navbar from "@/app/components/Navbar";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      <Navbar />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex items-center">
          <Image src="/inno-logo.svg" width="100" height="100" />
          <h1 className="flex justify-center items-center text-9xl">
            Profile Page {session?.user.firstname}
          </h1>
        </div>
      </div>
    </main>
  );
}
