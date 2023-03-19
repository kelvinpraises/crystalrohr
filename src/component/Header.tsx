import Link from "next/link";
import LoginButton from "./button/LoginButton";

const Header = () => {
  return (
    <div className=" flex flex-row px-5 py-4 justify-between items-center fixed w-full z-10 top-0">
      <Link href={"/"}>
        <img src="/Crystalrorh.svg" alt="" />
      </Link>

      <LoginButton />
    </div>
  );
};

export default Header;
