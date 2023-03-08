import React from "react";
import Back from "../../shared/Back";
import Heading from "../../shared/Heading";
import "./About.css";

const About = () => {
  return (
    <>
      <section className="about">
        <Back name="About Us" title="About Us - Who We Are?" />
        <div className="container flex mtop">
          <div className="left row">
            <Heading
              title="Our Agency Story"
              subtitle="Check out our company story and work process"
            />

            <p>
              At SmartSpace Rentals, we are dedicated to providing our clients
              with the best rental experience possible. Our team of experienced
              professionals is committed to helping you find the perfect
              property for your needs. Whether you're looking for a short-term
              rental or a long-term lease, we have a wide range of properties to
              choose from.
            </p>

            <p>
              Contact us today to learn more about our rental properties and how
              we can help you find your perfect home.
            </p>
            <button className="btn2">More About Us</button>
          </div>
          <div className="right row">
            <img src="images/banner8.jpg" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
