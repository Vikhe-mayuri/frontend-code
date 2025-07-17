import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Footer from "./Footer";
function Layout() {
  return (
    <>
      <Header />
      <main>
        <section id="home">
          <Home />{" "}
        </section>
        <section id="about">
          <About />{" "}
        </section>
        <section id="contact">
          <Contact />{" "}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
