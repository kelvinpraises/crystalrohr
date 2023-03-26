"use client";
import LoginButton from "@/component/button/LoginButton";
import Header from "@/component/Header";
import { usePolybase } from "@/hooks/polybase";
import { Imprima, Inter } from "next/font/google";
import Link from "next/link";
import "../styles/globals.css";

const imprima = Imprima({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-imprima",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter"
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { signIn, signOut, loggedIn } = usePolybase()

  return (
    <html className={`${imprima.variable} ${inter.variable}`}>
      <head />
      <body className=" bg-[#020203] text-[#ededed]">
        <Header>
          <Link href={"/"}>
            <img src="/Crystalrorh.svg" alt="" />
          </Link>

          {loggedIn ?
            <LoginButton onClick={signOut}>
              Logout
            </LoginButton> :
            <LoginButton onClick={signIn}>
              Login
            </LoginButton>}
        </Header>
        <div className=" mt-20 flex overflow-y-hidden">
          <>{children}</>
        </div>
      </body>
    </html>
  );
}
