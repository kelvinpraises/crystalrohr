"use client";
import "../styles/globals.css";
import { Inter, Imprima } from "next/font/google";
import Header from "@/component/Header";
import NavBar from "@/component/NavBar";
import SearchModal from "@/component/modals/SearchModal";
import { SetStateAction, useState } from "react";

const imprima = Imprima({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-imprima",
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${imprima.variable} ${inter.className}`}>
      <head />
      <body className=" bg-[#020203] text-[#ededed]">
        <Header />
        <div className=" mt-20 flex overflow-y-hidden">
          <>{children}</>
        </div>
      </body>
    </html>
  );
}
