import Image from "next/image";
import instaIcon from "@/assets/images/instagram.png";
import linkedIcon from "@/assets/images/linkedin.png";
import xIcon from "@/assets/images/twitter.png";
import waIcon from "@/assets/images/whatsapp.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/20 bg-black py-5 text-white/60">
      <div className="container">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="text-center">
            <span>&copy;</span>
            Made by Shantanu, Inc. All rights reserved
          </div>
          <ul className="flex justify-center gap-3">
            <li>
              <Image src={linkedIcon} alt="icon" className="size-6" />
            </li>
            <li>
              <Image src={instaIcon} alt="icon" className="size-6" />
            </li>
            <li>
              <Image src={xIcon} alt="icon" className="size-6" />
            </li>
            <li>
              <Image src={waIcon} alt="icon" className="size-6" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
