import Image from "next/image";
import ButtonLink from "@/app/components/ButtonLink";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex items-center">
          <Image src="/inno-logo.svg" width="100" height="100" />
          <h1 className="flex justify-center items-center text-9xl">
            Innoconnect
          </h1>
        </div>
      </div>
      <div className="object-left">
        <p className="p-5">
          Empower Your Ideas, Connect for Impact - InnoConnect: Building
          Tomorrow Together
        </p>
        <p className="p-5">
          Innovation waits for no one. Will you be left behind? Join
          InnoConnect!
        </p>
      </div>
      <div>
        <ButtonLink route="/ui/home" text="Start Innovating" />
      </div>
    </main>
  );
}
