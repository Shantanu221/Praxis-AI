import stripe from "@/assets/images/stripe.png";
import Image from "next/image";

export default function LogoTicker() {
  return (
    <section className="">
      <div className="container">
        <h2></h2>
        <div>
          <Image
            src={stripe}
            alt="stripe logo"
            className="bg-neutral-950 grayscale"
          />
        </div>
      </div>
    </section>
  );
}
