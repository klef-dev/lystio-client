import {
  ChevronDownIcon,
  GlobeIcon,
  SearchIcon,
  SparklesIcon
} from "lucide-react";
import React from "react";
import { Logo } from "./brand";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Input } from "./ui/input";

const NavBar = () => {
  return (
    <nav className="">
      <div className="container mx-auto  py-4 flex items-center justify-between ">
        <Logo />
        <div className="flex items-center relative w-1/3 border rounded-full p-1">
          <Input
            type="text"
            placeholder="Search"
            className="w-full rounded-full border-none"
          />
          <div className="absolute top-0 right-0  h-full items-center flex px-1">
            <Button className=" hover:bg-transparent" variant={"ghost"}>
              <SparklesIcon size={16} />
              <span>AI Search</span> <ChevronDownIcon size={14} />
            </Button>

            <Button size={"icon"} className="rounded-full flex-shrink-0">
              <SearchIcon />
            </Button>
          </div>
        </div>
        <div className="gap-x-4 flex items-center">
          <Link href="#" className="px-5">
            Advertise
          </Link>
          <Button size={"icon"} variant={"outline"} className="rounded-full ">
            <GlobeIcon />
          </Button>
          <Button variant={"ghost"}>
            <Image
              src={
                "https://s3-alpha-sig.figma.com/img/7c25/22db/2d5bf30553c6ddc1b1f1202fcdbfe28a?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Xq~Zvf-AT1er0ahf1tZf-urmFvG9SCy9exyOs9O1GAoaX4Gr0oWZLqDisHBZBkVN7mEh8MCR8Gx0b~V9jyT55hUBk6zYbWWQHmZ~UNmsIf4M3rKYBxjLxo8mjlpBJ5hxLrzfqootKDWpZru8XXjzVS9XjGttA-09LBCg35Lplz2Qv35A4tb8aMPPVZa92dWAH2QMFIoGFvPvfkbNoHBXYJz3hUJbJcj2h-Tj5lUMeM2odEn0yA2KgJhf0sIMOYoLFxqIQLRLxFuY0QjLTauAJe2NVNDbOWeMiy-dBGRYg3ab9U2~V66SV38jn6BCpRTfC7PuDLpnLMVFbFW-qsKiEA__"
              }
              alt="profile"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <ChevronDownIcon size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
