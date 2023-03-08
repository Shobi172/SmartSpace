import React from "react";
import Featured from "../../components/user/home/featured/Featured";
import Hero from "../../components/user/home/hero/Hero";
import Recent from "../../components/user/home/recent/Recent";
import Header from "../../components/shared/header/Header";
import Footer from "../../components/shared/footer/Footer";

const Home = () => {
  return (
    <>
      <Header />

      <Hero />
      <Featured />
      <Recent />

      <Footer />
    </>
  );
};

export default Home;
