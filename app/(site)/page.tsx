"use client"
import React from "react"
import Auth from "./components/Auth/Auth"


const Home: React.FC = () => {
  return (
    <Auth email={""} password={""} username={""} company={""} />
  )
}

export default Home