import CallToAction from "@/sections/CallToAction";
import FAQs from "@/sections/FAQs";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import LogoTicker from "@/sections/LogoTicker";
import Navbar from "@/sections/Navbar";
import ProductShowcase from "@/sections/ProductShowcase";
import React from "react";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <ProductShowcase />
      <FAQs />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Home;
