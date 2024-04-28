/**
 * @author Tom Shortridge
 */
import Image from "next/image";
import { auth } from "@/app/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex items-center">
          <Image src="/inno-logo.svg" width="100" height="100" />
          <h1 className="flex justify-center items-center text-9xl">
            Hello {session?.user.firstname}
          </h1>
        </div>
      </div>
    </main>
  );
}
