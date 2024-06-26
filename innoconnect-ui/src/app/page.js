import Image from "next/image";
import ButtonLink from "@/app/components/ButtonLink";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-4 align-middle">
      <div className="flex items-center">
        <Image src="/inno-logo.svg" width="100" height="100" />
        <h1 className="flex justify-center items-center text-9xl">
          InnoConnect
        </h1>
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
      <br />
      <div>
        <ButtonLink route="/ui/home" text="Start Innovating" />
      </div>
    </div>
  );
}
