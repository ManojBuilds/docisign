import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export default function MainLayout({children}: {children: React.ReactNode}){
    return (<>
    <Navbar/>
    {children}
    <Footer/>
    <div style={{
          backgroundImage: "url('/noise.png')"
        }} className="pointer-events-none [z-index:-1] absolute inset-0 bg-[size:180px] bg-repeat opacity-[0.035]"></div>
    </>)
}
