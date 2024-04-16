import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./Hero/hero.jsx"
import Hprice from "./Hprice"
import Testimonal from "./testimonal/Testimonal"

const Home = () => {
  return (
    <>
      <Hero />
      <AboutCard />
      <HAbout />
      <Testimonal />
      <Hblog />
      <Hprice />
    </>
  )
}

export default Home
